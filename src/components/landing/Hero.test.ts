import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const heroComponent = readFileSync(
  resolve(process.cwd(), 'src', 'components', 'landing', 'Hero.astro'),
  'utf8',
);

describe('Hero video sources', () => {
  test('uses an HLS-only source and play-triggered loading', () => {
    expect(heroComponent).toContain("import heroVideoPoster from '../../assets/hero-video-poster.png';");
    expect(heroComponent).toContain('<source src={heroVideoHlsUrl} type="application/x-mpegurl" />');
    expect(heroComponent).toContain('load="play"');
    expect(heroComponent).toContain('poster={optimizedPoster.src}');
    expect(heroComponent).toContain('<media-poster');
    expect(heroComponent).toContain('class="vds-poster"');
    expect(heroComponent).not.toContain('heroVideoFallbackUrl');
    expect(heroComponent).not.toContain('PUBLIC_VIDEO_FALLBACK_URL');
    expect(heroComponent).not.toContain('PUBLIC_VIDEO_URL');
    expect(heroComponent).not.toContain('src={heroVideoSources}');
  });

  test('keeps the poster preview clickable while hiding the built-in pre-play button', () => {
    expect(heroComponent).not.toMatch(
      /\.vds-video-layout \.vds-load-container\s*\{[^}]*display:\s*none !important;/,
    );
    expect(heroComponent).toContain("[data-media-player][data-load='play']:not([data-started]) .vds-video-layout .vds-load-container {");
    expect(heroComponent).toContain('pointer-events: auto !important;');
    expect(heroComponent).toContain("[data-media-player][data-load='play']:not([data-started]) .vds-video-layout .vds-load-container .vds-play-button {");
    expect(heroComponent).toContain('inset: 0;');
    expect(heroComponent).toContain('opacity: 0 !important;');
  });

  test('loads the focused hero client module instead of keeping inline player logic', () => {
    expect(heroComponent).toContain("import '../../scripts/landing/hero-player';");
    expect(heroComponent).toContain("import 'vidstack/player';");
    expect(heroComponent).not.toContain("import Hls from 'hls.js';");
    expect(heroComponent).not.toContain('posthog.capture(');
    expect(heroComponent).not.toContain("player.addEventListener('provider-change'");
  });
});
