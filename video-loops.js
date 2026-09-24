/* At most two active groups; play once and hold each video's final frame. */
window.WorldStateVideoLoops = {
  mount() {
    const videos = [...document.querySelectorAll('video.gif-video')];
    if (!videos.length) return;
    const groups = new Map();
    videos.forEach(video => {
      const target = video.closest('.comparison-cells') || video;
      if (!groups.has(target)) groups.set(target, {
        videos: [], visible: false, playing: false, starting: false,
        blocked: false, finished: false, epoch: 0, releaseTimer: null
      });
      groups.get(target).videos.push(video);
      const rate = 1;
      video.defaultPlaybackRate = video.playbackRate = rate;
      video.controls = false;
      video.muted = video.defaultMuted = true;
      video.initialPoster = video.getAttribute('poster') || '';
      // The row controller starts all members together, without looping.
      video.autoplay = false;
      video.loop = false;
      video.addEventListener('dragstart', event => event.preventDefault());
    });
    let selected = new Set();
    let loader;
    const active = group => selected.has(group) && group.visible && !document.hidden;
    const status = group => {
      if (!group.button) return;
      const enabled = active(group);
      const loaded = group.videos.filter(video => video.preloadItem?.state === 'ready').length;
      const complete = loaded === group.videos.length;
      const failed = group.videos.some(video => video.preloadItem?.state === 'error' || (enabled && video.error));
      const loading = group.videos.some(video => video.preloadItem?.state === 'loading');
      const playing = enabled && group.playing && group.videos.every(video => !video.paused && !video.seeking && video.readyState >= 3);
      const label = failed ? 'Load failed · Retry' : group.finished ? 'Finished · Replay' : !complete ? `${loading || enabled ? 'Loading' : 'Queued'} ${loaded}/${group.videos.length}` : !enabled ? 'Ready · Play' : group.blocked ? 'Click to play' : playing ? 'Playing' : 'Buffering…';
      const icon = failed ? '!' : group.finished ? '↻' : playing ? '●' : !complete ? '◌' : !enabled ? '✓' : group.blocked ? '▶' : '◌';
      if (group.label.textContent !== label) group.label.textContent = label;
      if (group.icon.textContent !== icon) group.icon.textContent = icon;
      group.button.setAttribute('aria-pressed', String(enabled));
      group.row.classList.toggle('is-active', enabled);
      group.row.classList.toggle('is-playing', playing);
      group.row.classList.toggle('is-ready', complete && !failed);
      group.row.classList.toggle('is-finished', group.finished);
      group.row.dataset.loadState = failed ? 'error' : complete ? 'ready' : loading ? 'loading' : 'queued';
    };
    const stop = group => {
      group.epoch++;
      group.playing = group.starting = false;
      group.videos.forEach(video => video.pause());
      status(group);
    };
    const align = (group, time) => group.videos.forEach(video => {
      if (video.readyState && Math.abs(video.currentTime - time) > 0.015) {
        video.currentTime = time;
      }
    });
    const finish = group => {
      if (group.finished) return;
      group.finished = true;
      stop(group);
      group.videos.forEach(video => {
        const rememberFrame = () => {
          if (!group.finished || !video.videoWidth || video.readyState < 2) return;
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          try {
            canvas.getContext('2d').drawImage(video, 0, 0);
            video.poster = canvas.toDataURL('image/jpeg', 0.94);
            video.finalFrameSaved = true;
          } catch { /* Keep the paused decoder frame if a snapshot is unavailable. */ }
        };
        if (Number.isFinite(video.duration) && video.currentTime !== video.duration) {
          video.addEventListener('seeked', rememberFrame, {once: true});
          video.currentTime = video.duration;
        } else rememberFrame();
      });
    };
    const start = async group => {
      if (group.finished) return;
      group.starting = true;
      const epoch = ++group.epoch;
      const results = await Promise.allSettled(group.videos.map(video => {
        video.playbackRate = video.defaultPlaybackRate;
        return video.play();
      }));
      if (epoch !== group.epoch) return;
      group.starting = false;
      if (!active(group) || results.some(result => result.status === 'rejected')) {
        group.blocked = results.some(result => result.status === 'rejected' && result.reason?.name === 'NotAllowedError');
        stop(group);
        return;
      }
      group.playing = true;
      status(group);
    };
    const tick = group => {
      if (!active(group)) return;
      status(group);
      if (group.finished) return;
      const members = group.videos;
      if (!members.every(video => video.preloadItem.state === 'ready')) return;
      members.forEach(video => loader.attach(video, () => active(group)));
      const duration = Math.min(...members.map(video => video.duration || Infinity));
      if (members.some(video => video.ended || video.currentTime >= duration - 0.025)) {
        finish(group);
        return;
      }
      const ready = members.every(video => {
        if (video.readyState < 3 || video.seeking) return false;
        if (group.playing || group.starting) return true;
        // Refill before resuming; a single decoded frame is not a useful buffer
        // for five parallel streams, especially at double speed.
        const runway = Math.min(0.8 * video.defaultPlaybackRate, video.duration - video.currentTime);
        for (let i = 0; i < video.buffered.length; i++) {
          if (video.buffered.start(i) <= video.currentTime + 0.05 &&
              video.buffered.end(i) >= video.currentTime + runway - 0.05) return true;
        }
        return false;
      });
      if (!ready) {
        if (group.playing || group.starting) {
          stop(group);
        }
        return;
      }
      if (group.playing) {
        const times = members.map(video => video.currentTime);
        if (members.some(video => video.paused)) {
          stop(group);
          align(group, Math.min(...times));
          return;
        }
        const leaderTime = times[0];
        members.forEach((video, index) => {
          const baseRate = video.defaultPlaybackRate;
          const drift = times[index] - leaderTime;
          // Small drift is corrected gradually; do not stop an entire row
          // for a few display frames of decoder timing variation.
          const correction = Math.abs(drift) < 0.025 ? 0 : Math.max(-0.04, Math.min(0.04, drift * 0.25));
          const rate = baseRate * (1 - correction);
          if (Math.abs(video.playbackRate - rate) > 0.001) video.playbackRate = rate;
        });
        // Only a large discontinuity needs a synchronized restart.
        if (Math.max(...times) - Math.min(...times) > 0.6) {
          stop(group);
          align(group, Math.min(...times));
        }
      } else if (!group.starting && !group.blocked) {
        const times = members.map(video => video.currentTime);
        if (Math.max(...times) - Math.min(...times) > 0.12) {
          align(group, Math.min(...times));
          return;
        }
        start(group);
      }
    };
    groups.forEach(group => group.videos.forEach(video => {
      video.addEventListener('ended', () => finish(group));
      video.addEventListener('waiting', () => {
        if (group.playing || group.starting) {
          stop(group);
        }
      });
      video.addEventListener('play', () => {
        if (!active(group) || group.finished) video.pause();
      });
    }));
    const show = (group, enabled) => {
      clearTimeout(group.releaseTimer);
      if (!enabled) {
        stop(group);
        // Release decoders and buffers after leaving a row, while keeping a
        // short grace period for small scroll adjustments.
        group.releaseTimer = setTimeout(() => {
          if (active(group)) return;
          group.videos.forEach(video => {
            if (!video.hasAttribute('src')) return;
            if (group.finished && !video.finalFrameSaved) return;
            loader.release(video);
          });
        }, 1200);
        return;
      }
      tick(group);
      status(group);
    };
    // Prefer the two most recently selected visible rows, then fill remaining
    // slots by distance to the viewport center. Vertical scrolling resets pins.
    let pinned = [];
    let scrollY = window.scrollY;
    const choose = () => {
      const candidates = [];
      if (!document.hidden) groups.forEach((group, target) => {
        const rect = target.getBoundingClientRect();
        group.visible = rect.bottom > 0 && rect.top < innerHeight && rect.height > 0;
        if (!group.visible) return;
        const d = Math.abs((rect.top + rect.bottom) / 2 - innerHeight / 2);
        candidates.push({group, distance: d});
      });
      candidates.sort((a, b) => a.distance - b.distance);
      const eligible = new Set(candidates.map(item => item.group));
      const preferred = [...pinned.filter(group => eligible.has(group)), ...candidates.map(item => item.group)];
      const next = new Set([...new Set(preferred)].slice(0, 2));
      const previous = selected;
      selected = next;
      previous.forEach(group => { if (!next.has(group)) show(group, false); });
      next.forEach(group => { if (!previous.has(group)) show(group, true); });
      loader.prioritize([...new Set([...next, ...candidates.map(item => item.group)])].flatMap(group => group.videos));
    };
    let frame = 0;
    const schedule = () => {
      if (window.scrollY !== scrollY) { pinned = []; scrollY = window.scrollY; }
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; choose(); });
    };
    groups.forEach((group, target) => {
      if (target.classList.contains('comparison-cells')) {
        group.row = target.closest('.comparison-row');
        group.button = document.createElement('button');
        group.button.type = 'button';
        group.button.className = 'row-playback-status';
        group.icon = document.createElement('span');
        group.icon.className = 'playback-status-icon';
        group.icon.setAttribute('aria-hidden', 'true');
        group.icon.textContent = '▶';
        group.label = document.createElement('span');
        group.label.textContent = 'Play this row';
        group.button.append(group.icon, group.label);
        group.button.setAttribute('aria-pressed', 'false');
        const toolbar = document.createElement('div');
        toolbar.className = 'row-playback-toolbar';
        const duration = document.createElement('span');
        duration.className = 'row-video-duration';
        duration.textContent = `${Number(target.dataset.duration).toFixed(2)} s`;
        duration.setAttribute('aria-label', `Video duration: ${Number(target.dataset.duration).toFixed(2)} seconds`);
        toolbar.append(group.button, duration);
        group.row.prepend(toolbar);
        target.tabIndex = 0;
        target.setAttribute('role', 'group');
        target.setAttribute('aria-label', 'Model comparison. Click or press Enter to play this row.');
        const select = () => {
          pinned = [group, ...pinned.filter(item => item !== group)].slice(0, 2);
          if (group.finished) {
            group.finished = false;
            stop(group);
            group.videos.forEach(video => {
              video.poster = video.initialPoster;
              video.finalFrameSaved = false;
            });
            align(group, 0);
          }
          group.blocked = false;
          group.videos.forEach(video => { if (video.error) video.load(); });
          loader.retry(group.videos);
          choose(); tick(group);
        };
        group.button.addEventListener('click', select);
        target.addEventListener('click', select);
        target.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); }
        });
      }
    });
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule, {passive: true});
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(schedule, {threshold: 0});
      groups.forEach((group, target) => observer.observe(target));
      // User-started gallery videos must not keep decoding after scrolling away.
      const manualObserver = new IntersectionObserver(entries => {
        entries.forEach(({target, isIntersecting}) => { if (!isIntersecting) target.pause(); });
      });
      document.querySelectorAll('video:not(.gif-video)').forEach(video => manualObserver.observe(video));
    }
    const progress = document.createElement('p');
    progress.className = 'preload-progress';
    document.querySelector('.comparison-scroll')?.before(progress);
    loader = new window.WorldStatePreload(videos, () => {
      const items = [...loader.items.values()];
      const ready = items.filter(item => item.state === 'ready').length;
      const failed = items.filter(item => item.state === 'error').length;
      progress.textContent = `${ready} / ${items.length} videos ready${failed ? ` · ${failed} need retry` : ''} · Select up to two rows to play`;
      groups.forEach(status);
      selected.forEach(tick);
    });
    choose();
    setInterval(() => selected.forEach(tick), 150);
    document.addEventListener('visibilitychange', () => {
      choose();
      if (document.hidden) document.querySelectorAll('video').forEach(video => video.pause());
    });
    const retry = () => groups.forEach(group => {
      group.blocked = false;
      tick(group);
    });
    document.addEventListener('pointerdown', retry, {passive: true});
    document.addEventListener('keydown', retry);
  }
};
