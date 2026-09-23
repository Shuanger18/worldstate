/* Download complete files with a two-request queue. Decoders stay lazy. */
window.WorldStatePreload = class {
  constructor(videos, changed) {
    this.changed = changed;
    this.items = new Map();
    this.running = 0;
    this.order = [];
    this.memory = new Map();
    this.db = new Promise(resolve => {
      try {
        const request = indexedDB.open('worldstate-video-previews-v1', 1);
        request.onupgradeneeded = () => request.result.createObjectStore('videos');
        request.onsuccess = () => resolve(request.result);
        request.onerror = request.onblocked = () => resolve(null);
      } catch { resolve(null); }
    });
    videos.forEach(video => {
      const url = new URL(video.dataset.src, location.href).href;
      if (!this.items.has(url)) this.items.set(url, {url, state: 'queued'});
      video.preloadItem = this.items.get(url);
    });
    this.order = [...this.items.values()];
    document.addEventListener('visibilitychange', () => this.pump());
  }
  async read(item) {
    if (this.memory.has(item.url)) return this.memory.get(item.url);
    const db = await this.db;
    if (!db) return null;
    return new Promise(resolve => {
      try {
        const tx = db.transaction('videos', 'readonly');
        const request = tx.objectStore('videos').get(item.url);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = tx.onabort = () => resolve(null);
      } catch { resolve(null); }
    });
  }
  async save(item, blob) {
    const db = await this.db;
    const stored = db && await new Promise(resolve => {
      try {
        const tx = db.transaction('videos', 'readwrite');
        tx.objectStore('videos').put(blob, item.url);
        tx.oncomplete = () => resolve(true);
        tx.onerror = tx.onabort = () => resolve(false);
      } catch { resolve(false); }
    });
    // Private browsing or exhausted disk quota: retain complete files for this
    // visit. Never report Ready for bytes that are no longer available.
    if (!stored) this.memory.set(item.url, blob);
  }
  prioritize(videos) {
    const first = videos.map(video => video.preloadItem);
    this.order = [...new Set([...first, ...this.order])];
    this.pump();
  }
  retry(videos) {
    videos.forEach(video => {
      const item = video.preloadItem;
      if (item.state === 'error') item.state = 'queued';
    });
    this.prioritize(videos);
  }
  pump() {
    if (document.hidden) return;
    while (this.running < 2) {
      const item = this.order.find(candidate => candidate.state === 'queued');
      if (!item) break;
      item.state = 'loading';
      this.running++;
      this.changed();
      this.download(item).finally(() => {
        this.running--;
        this.changed();
        this.pump();
      });
    }
  }
  async download(item) {
    try {
      let blob = await this.read(item);
      if (!blob) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 120000);
        try {
          const response = await fetch(item.url, {signal: controller.signal, cache: 'force-cache'});
          if (!response.ok) {
            // Finish the failed response before giving its queue slot away.
            await response.arrayBuffer();
            throw new Error(`HTTP ${response.status}`);
          }
          blob = await response.blob();
          if (!blob.size || blob.type.includes('text/html')) throw new Error('Invalid video response');
          await this.save(item, blob);
        } finally { clearTimeout(timeout); }
      }
      item.state = 'ready';
    } catch {
      item.state = 'error';
    }
  }
  async attach(video, allowed) {
    if (video.hasAttribute('src') || video.preloadAttaching || video.preloadItem.state !== 'ready') return;
    video.preloadAttaching = true;
    try {
      const blob = await this.read(video.preloadItem);
      if (!blob) {
        // Storage can be evicted by the browser between download and playback.
        video.preloadItem.state = 'queued';
        this.changed();
        this.pump();
        return;
      }
      if (!allowed()) return;
      video.preload = 'auto';
      video.preloadObjectURL = URL.createObjectURL(blob);
      video.src = video.preloadObjectURL;
      video.load();
    } finally { video.preloadAttaching = false; }
  }
  release(video) {
    video.removeAttribute('src');
    video.preload = 'none';
    video.load();
    if (video.preloadObjectURL) URL.revokeObjectURL(video.preloadObjectURL);
    video.preloadObjectURL = null;
  }
};
