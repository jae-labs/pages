import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';
import { benchmarks, deploymentEntries, faqs, features, logos, menuItems, reviews } from './portfolio';

describe('portfolio content', () => {
  test('menu items target sections rendered by the landing page', () => {
    const sectionIds = new Set([
      'features',
      'how-it-works',
      'benchmarks',
      'subagents',
      'sponsor',
      'reviews',
      'deployments',
      'plans',
      'faq'
    ]);

    expect(menuItems).not.toHaveLength(0);
    expect(menuItems.map((item) => item.id)).toEqual([...sectionIds]);
  });

  test('benchmark scores stay within display bounds', () => {
    expect(benchmarks).not.toHaveLength(0);

    for (const benchmark of benchmarks) {
      expect(benchmark.models).not.toHaveLength(0);
      for (const model of benchmark.models) {
        expect(model.val).toBeGreaterThanOrEqual(0);
        expect(model.val).toBeLessThanOrEqual(100);
      }
    }
  });

  test('deployment history has one current entry and stable log identifiers', () => {
    expect(deploymentEntries.filter((entry) => entry.status === 'CURRENT')).toHaveLength(1);
    expect(new Set(deploymentEntries.map((entry) => entry.id)).size).toBe(deploymentEntries.length);

    for (const entry of deploymentEntries) {
      expect(entry.roles.length).toBeGreaterThan(0);
      expect(entry.url).toMatch(/^https:\/\//);
    }
  });

  test('public content groups are populated', () => {
    expect(features.length).toBeGreaterThanOrEqual(3);
    expect(logos.length).toBeGreaterThanOrEqual(3);
    expect(reviews.length).toBeGreaterThanOrEqual(1);
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(faqs.some((faq) => faq.q === 'Does lui.z make mistakes?')).toBe(true);
  });

  test('public company logo assets exist', () => {
    for (const logo of logos) {
      if (!logo.src.startsWith('/company-logos/')) continue;

      expect(existsSync(resolve(process.cwd(), 'public', logo.src.slice(1)))).toBe(true);
    }
  });
});
