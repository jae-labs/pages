# Implementation Plan: Video.js v10 Beta Integration

This plan outlines the sequential steps to implement the Video.js v10 Beta looping background video player in the Hero component of `justanother.engineer`.

## Task List

### Task 1: Update package.json Dependencies
- **Description:** Add the pre-release `@videojs/core` and `@videojs/html` packages to dependencies.
- **Action:** Update `package.json` to include:
  ```json
  "@videojs/core": "10.0.0-beta.24",
  "@videojs/html": "10.0.0-beta.24"
  ```
- **Verification:** Run `npm install` and verify the package-lock.json updates successfully.

### Task 2: Update Hero.astro Markup
- **Description:** Replace the native `<video>` tag with Video.js v10 background custom elements: `<background-video-player>`, `<background-video-skin>`, and `<background-video>`.
- **Action:** Modify `src/components/landing/Hero.astro`.
- **Verification:** Confirm that all tags are nested correctly and attributes like `src` and `class` are preserved.

### Task 3: Implement Custom Styling (Glitch Yellow Theme)
- **Description:** Add CSS classes and custom CSS variables to theme the background-video-player to match the site's neon Glitch Yellow (`#f3eb2c`) branding.
- **Action:** Add styles in the `<style>` block of `Hero.astro` for `background-video-player` with subtle glows and borders.
- **Verification:** Verify visually or via build step that the styles compile cleanly.

### Task 4: Integrate Client Script and Analytics Tracking
- **Description:** Import `@videojs/html/background` modules and configure PostHog tracking by binding to the play event of the underlying video element inside `<background-video>`'s shadow root.
- **Action:** Update the `<script>` tag inside `src/components/landing/Hero.astro`.
- **Verification:** Run build and check that posthog tracking is properly referenced.

### Task 5: Execute Quality Check Gate
- **Description:** Run all repository verification scripts to guarantee everything compiles, linting passes, and types are solid.
- **Action:** Run `npm run check`.
- **Verification:** Confirm that ESLint, typecheck, tests, and build all complete with zero errors.
