# WorldState — anonymous supplementary website

Static supplementary website. Publish the contents of this directory as a static site over HTTPS. Keep all relative paths intact. No build step, API key, server-side application, or analytics is required.

Comparison previews have been uniformly encoded at 640px width using H.264 CRF25 (medium preset). These are compressed viewing copies; frame counts, frame rates, trajectories and durations are unchanged. The first four rows play at 1x, 2x, 2x and 1x. Local evaluation results are not recomputed from these previews.

The six-column comparison contains 14 scenes. Missing Infinite-World outputs remain placeholders. Videos are silent and loop by row. Native download and seek controls are hidden; this is not DRM.

Serve byte-range requests for MP4 files and use static-asset caching. Do not redirect asset URLs to a login page or a source-repository file browser. The root index.html is the page entry point.

Source provenance, local filesystem paths, experiment logs, historical backups, and repository history are excluded from this package. Paper and code links remain placeholders.


## Playback performance update

Up to two autoplay rows nearest the viewport center load and play. Click two visible comparison rows, or focus them and press Enter/Space, to select both. A third selection replaces the older manual selection. Vertical scrolling resumes automatic row selection. Inactive rows release buffers after 1.2 seconds. Comparison videos retain their original preview files, playback rates and synchronized loop boundary; buffering resumes after a short refill rather than seeking on every stall. Gallery videos pause offscreen, and all videos pause when the tab is hidden.


## September 23: playback indicators and smaller previews

The selected comparison row has an accent outline. Its button shows Playing only after playback starts, Buffering while waiting, or an explicit retry prompt on media failure. Select Play this row to switch scenes; the status button stays visible during horizontal scrolling. All 70 comparison previews were re-encoded from their original sources using identical H.264 CRF25 medium settings, preserving 640px width, frame counts, frame rates, durations and row playback speeds.


## Larger playback indicators and two-row playback

Up to two visible rows play simultaneously, with independent synchronization within each row. Status buttons use 25px symbols, 16px bold labels and a solid accent fill during playback. A 3px outline highlights each selected row. Loading rows explicitly show Buffering. Manual selections remain until vertical scrolling; hidden tabs pause both rows and inactive rows release resources.


## Queued preloading and ready states

All 70 comparison previews preload in the background, with at most two downloads in flight. Selected rows have priority for the next free slots. Buttons distinguish Queued, Loading (completed files / row total), Ready · Play, Playing, and Load failed · Retry. Ready means every file in the row has been completely downloaded. The overview counter reports ready files across the page.

Complete files are cached in IndexedDB; private browsing or quota failures fall back to in-session blobs. Only two selected rows receive video sources and decoders; their object URLs are revoked after leaving, without discarding the download cache. Reloads reuse cached files when storage is available. Hidden tabs stop starting new downloads. Serve over HTTP(S); direct file URLs do not support this fetch-based preload workflow.
