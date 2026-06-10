import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const layoutComponent = readFileSync(resolve(process.cwd(), 'src', 'layouts', 'Layout.astro'), 'utf8');

describe('Layout shell contract', () => {
  test('keeps the cookie banner markup and consent copy in the document shell', () => {
    expect(layoutComponent).toContain('<div id="cookie-banner" class="hidden fixed bottom-4 left-4 right-4 z-[950]">');
    expect(layoutComponent).toContain('Google Analytics & PostHog');
    expect(layoutComponent).toContain('id="cookie-decline"');
    expect(layoutComponent).toContain('id="cookie-accept"');
  });

  test('loads focused layout client modules instead of large imperative inline scripts', () => {
    expect(layoutComponent).toContain("import '../scripts/layout/cookie-consent';");
    expect(layoutComponent).toContain("import '../scripts/layout/calendly';");
    expect(layoutComponent).not.toContain("import posthog from 'posthog-js';");
    expect(layoutComponent).not.toContain('const loadAnalytics = () => {');
    expect(layoutComponent).not.toContain('const initCalendlyButtons = () => {');
  });
});
