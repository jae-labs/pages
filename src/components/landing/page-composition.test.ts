import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const indexPage = readFileSync(resolve(process.cwd(), 'src', 'pages', 'index.astro'), 'utf8');

describe('index page composition contract', () => {
  test('composes the page from landing components including the dedicated footer', () => {
    expect(indexPage).toContain("import Footer from '../components/landing/Footer.astro';");
    expect(indexPage).toContain('<Footer />');
    expect(indexPage).not.toContain('https://github.com/luiz1361');
    expect(indexPage).not.toContain('Pingdom Status');
  });
});
