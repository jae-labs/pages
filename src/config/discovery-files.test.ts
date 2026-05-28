import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const readPublicFile = (filename: string) =>
  readFileSync(resolve(process.cwd(), 'public', filename), 'utf8');

describe('public discovery files', () => {
  test('robots.txt allows search and AI crawlers to reach public content', () => {
    const robots = readPublicFile('robots.txt');

    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('User-agent: OAI-SearchBot');
    expect(robots).toContain('User-agent: GPTBot');
    expect(robots).toContain('User-agent: ChatGPT-User');
    expect(robots).toContain('User-agent: Google-Extended');
    expect(robots).toContain('Sitemap: https://justanother.engineer/sitemap-index.xml');
  });

  test('llms.txt publishes a concise machine-readable portfolio map', () => {
    const llms = readPublicFile('llms.txt');

    expect(llms.startsWith('# lui.z')).toBe(true);
    expect(llms).toContain('> Cyberpunk-styled personal portfolio for Luiz F. C. Martins');
    expect(llms).toContain('[Homepage](https://justanother.engineer/)');
    expect(llms).toContain('[Sitemap](https://justanother.engineer/sitemap-index.xml)');
    expect(llms).toContain('[GitHub](https://github.com/luiz1361)');
    expect(llms).toContain('[LinkedIn](https://www.linkedin.com/in/luiz1361/)');
  });
});
