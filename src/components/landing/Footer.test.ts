import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const footerComponent = readFileSync(
  resolve(process.cwd(), 'src', 'components', 'landing', 'Footer.astro'),
  'utf8',
);

describe('Footer component contract', () => {
  test('preserves the disclaimer and public profile links', () => {
    expect(footerComponent).toContain('The views, content, jokes, and questionable benchmarks here are entirely my own');
    expect(footerComponent).toContain('https://github.com/luiz1361');
    expect(footerComponent).toContain('https://www.linkedin.com/in/luiz1361/');
    expect(footerComponent).toContain('https://buymeacoffee.com/luiz1361');
    expect(footerComponent).toContain('https://stats.pingdom.com/ieq3v42yov76/4989186');
  });

  test('keeps the icon imports inside the dedicated footer component', () => {
    expect(footerComponent).toContain("import GitHubIcon from '../icons/GitHubIcon.astro';");
    expect(footerComponent).toContain("import LinkedInIcon from '../icons/LinkedInIcon.astro';");
    expect(footerComponent).toContain("import SlackIcon from '../icons/SlackIcon.astro';");
    expect(footerComponent).toContain("import PingdomIcon from '../icons/PingdomIcon.astro';");
    expect(footerComponent).toContain("import { Coffee } from '@lucide/astro';");
  });
});
