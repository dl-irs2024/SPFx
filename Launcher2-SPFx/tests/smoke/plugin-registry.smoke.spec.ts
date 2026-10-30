import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('registry file is loadable and plugin metadata is present', async () => {
  const registryPath = path.resolve(__dirname, '../../plugin-registry.json');
  const raw = fs.readFileSync(registryPath, 'utf8');
  const plugins = JSON.parse(raw) as Array<{ id: string; title: string; runtime?: string }>;

  expect(Array.isArray(plugins)).toBeTruthy();
  expect(plugins.length).toBeGreaterThan(0);

  for (const plugin of plugins) {
    expect(plugin.id).toBeTruthy();
    expect(plugin.title).toBeTruthy();
    if (plugin.runtime) {
      expect(['js', 'ts']).toContain(plugin.runtime);
    }
  }
});
