import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const readPublicFile = (filename: string) =>
  readFileSync(resolve(process.cwd(), 'public', filename), 'utf8');
const readSourceFile = (filename: string) =>
  readFileSync(resolve(process.cwd(), 'src', filename), 'utf8');

const extractCspDirective = (headers: string, directive: string) => {
  const cspLine = headers
    .split('\n')
    .find((line) => line.trimStart().startsWith('Content-Security-Policy:'));

  expect(cspLine).toBeDefined();

  return cspLine!
    .replace(/^.*Content-Security-Policy:\s*/, '')
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${directive} `));
};

describe('public discovery files', () => {
  test('robots.txt allows search and AI crawlers to reach public content', () => {
    const robots = readPublicFile('robots.txt');

    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('User-agent: OAI-SearchBot');
    expect(robots).toContain('User-agent: GPTBot');
    expect(robots).toContain('User-agent: ChatGPT-User');
    expect(robots).toContain('User-agent: Google-Extended');
    expect(robots).toContain('Sitemap: https://justanother.engineer/sitemap.xml');
  });

  test('llms.txt publishes a concise machine-readable portfolio map', () => {
    const llms = readPublicFile('llms.txt');

    expect(llms.startsWith('# lui.z')).toBe(true);
    expect(llms).toContain('> Cyberpunk-styled personal portfolio for Luiz F. C. Martins');
    expect(llms).toContain('[Homepage](https://justanother.engineer/)');
    expect(llms).toContain('[Sitemap](https://justanother.engineer/sitemap.xml)');
    expect(llms).toContain('[GitHub](https://github.com/luiz1361)');
    expect(llms).toContain('[LinkedIn](https://www.linkedin.com/in/luiz1361/)');
  });

  test('headers allow the default hero HLS origin under connect-src and media-src with blob:', () => {
    const hero = readSourceFile('components/landing/Hero.astro');
    const headers = readPublicFile('_headers');
    const heroVideoUrlMatch = hero.match(/const defaultHeroVideoHlsUrl = '([^']+)'/);

    expect(heroVideoUrlMatch).not.toBeNull();

    const heroVideoOrigin = new URL(heroVideoUrlMatch![1]).origin;
    
    // Check connect-src allows fetching the playlist/segments
    const connectSrc = extractCspDirective(headers, 'connect-src');
    expect(connectSrc).toBeDefined();
    expect(connectSrc).toContain(heroVideoOrigin);

    // Check media-src allows playing the media and blob: URLs created by MSE/hls.js
    const mediaSrc = extractCspDirective(headers, 'media-src');
    expect(mediaSrc).toBeDefined();
    expect(mediaSrc).toContain(heroVideoOrigin);
    expect(mediaSrc).toContain('blob:');
  });

  test('headers allow Google Analytics domains under img-src', () => {
    const headers = readPublicFile('_headers');
    const imgSrc = extractCspDirective(headers, 'img-src');

    expect(imgSrc).toBeDefined();
    expect(imgSrc).toContain('https://*.googletagmanager.com');
    expect(imgSrc).toContain('https://*.google-analytics.com');
  });

  test('headers allow GA4 collection endpoints under connect-src', () => {
    const headers = readPublicFile('_headers');
    const connectSrc = extractCspDirective(headers, 'connect-src');

    expect(connectSrc).toBeDefined();
    expect(connectSrc).toContain('https://*.google-analytics.com');
    expect(connectSrc).toContain('https://*.analytics.google.com');
    expect(connectSrc).toContain('https://*.googletagmanager.com');
  });

  test('headers allow Google tag script sources under script-src', () => {
    const headers = readPublicFile('_headers');
    const scriptSrc = extractCspDirective(headers, 'script-src');

    expect(scriptSrc).toBeDefined();
    expect(scriptSrc).toContain('https://*.googletagmanager.com');
  });

});
