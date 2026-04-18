import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const layoutComponent = readFileSync(resolve(process.cwd(), 'src', 'layouts', 'Layout.astro'), 'utf8');

describe('Layout shell contract', () => {
  test('mounts the dedicated cookie banner component in the document shell', () => {
    expect(layoutComponent).toContain("import CookieBanner from '../components/layout/CookieBanner.astro';");
    expect(layoutComponent).toContain('<CookieBanner />');
  });

  test('loads focused layout client modules instead of large imperative inline scripts', () => {
    expect(layoutComponent).toContain("import '../scripts/layout/cookie-consent';");
    expect(layoutComponent).toContain("import '../scripts/layout/calendly';");
    expect(layoutComponent).not.toContain("import posthog from 'posthog-js';");
    expect(layoutComponent).not.toContain('const loadAnalytics = () => {');
    expect(layoutComponent).not.toContain('const initCalendlyButtons = () => {');
  });
});
