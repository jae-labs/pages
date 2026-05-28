# Chromecast Support Implementation Plan

This plan executes the approved design to add native Chromecast support to Luiz's landing page promo video player.

---

## Todo List

- [ ] **Task 1: Define Cast-Capable Custom Element Subclass in `Hero.astro`** <!-- id: 1 -->
- [ ] **Task 2: Update `Hero.astro` Markup** <!-- id: 2 -->
- [ ] **Task 3: Refactor Script Logic & Event Listeners** <!-- id: 3 -->

---

## Task Details

### Task 1: Define Cast-Capable Custom Element Subclass in `Hero.astro`
- **Description:** Dynamically define and register a custom `<cast-video>` element that combines `@videojs/core`'s native Google Cast engine (`GoogleCastMixin`) and `@videojs/html`'s media registration mixin (`MediaAttachMixin`).
- **Steps:**
  1. Add dynamic imports to the `Promise.all` inside `loadVideoPlayer` in `Hero.astro` for:
     - `'@videojs/core/dist/default/dom/media/custom-media-element/index.js'`
     - `'@videojs/core/dist/default/dom/media/video-host.js'`
     - `'@videojs/core/dist/default/dom/media/google-cast/index.js'`
     - `'@videojs/html/ui/cast-button'` (to register the `<media-cast-button>` element)
  2. Implement `GoogleCastVideoHost` subclassing `GoogleCastMixin(HTMLVideoElementHost)`.
  3. Implement `CastVideoElement` subclassing `MediaAttachMixin(CustomMediaElement('video', GoogleCastVideoHost))`.
  4. Register it as `'cast-video'` via `customElements.define` if not already defined.
- **Verification:** Custom element registers cleanly without console or import errors.

### Task 2: Update `Hero.astro` Markup
- **Description:** Replace the native `<video>` tag inside `<video-skin>` with our new custom `<cast-video>` element.
- **Steps:**
  1. Replace `<video slot="media" id="hero-video" ...>` with `<cast-video slot="media" id="hero-video" ...>`.
  2. Leave all child tracks, source URLs, ARIA labels, and tailwind positioning classes identical.
- **Verification:** The player compiles and renders visually in dev server.

### Task 3: Refactor Script Logic & Event Listeners
- **Description:** Refactor the page load / tracking listeners to ensure complete type and check compatibility.
- **Steps:**
  1. Modify the `video instanceof HTMLVideoElement` check inside `initHeroTracking` to standard `video && !video.dataset.bound` checking, since the target is now the `<cast-video>` custom element wrapper.
  2. Run standard quality checks using `npm run check`.
- **Verification:** `npm run check` runs successfully with zero errors.
