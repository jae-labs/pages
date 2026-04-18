import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const cookieBannerComponent = readFileSync(
  resolve(process.cwd(), 'src', 'components', 'layout', 'CookieBanner.astro'),
  'utf8',
);

describe('CookieBanner component contract', () => {
  test('preserves the cookie banner markup and consent copy', () => {
    expect(cookieBannerComponent).toContain('<div id="cookie-banner" class="hidden fixed bottom-4 left-4 right-4 z-[950]">');
    expect(cookieBannerComponent).toContain('Google Analytics');
    expect(cookieBannerComponent).toContain('PostHog');
    expect(cookieBannerComponent).toContain('id="cookie-decline"');
    expect(cookieBannerComponent).toContain('id="cookie-accept"');
  });

  test('keeps the banner-local button styling with the component', () => {
    expect(cookieBannerComponent).toContain('.cookie-btn {');
    expect(cookieBannerComponent).toContain('.cookie-btn-primary {');
    expect(cookieBannerComponent).toContain('.cookie-btn-secondary {');
  });
});
