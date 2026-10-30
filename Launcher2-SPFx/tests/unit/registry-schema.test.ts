import fs from 'fs';
import path from 'path';

describe('plugin registry schema', () => {
  it('contains plugin entries with unique ids and valid URLs', () => {
    const registryPath = path.resolve(__dirname, '../../plugin-registry.json');
    const raw = fs.readFileSync(registryPath, 'utf8');
    const plugins = JSON.parse(raw) as Array<{ id: string; url?: string; entryPoint?: string }>;

    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBeGreaterThan(0);

    const ids = plugins.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);

    plugins.forEach((plugin) => {
      expect(plugin.id).toBeTruthy();
      const entry = plugin.url || plugin.entryPoint;
      expect(entry).toBeTruthy();
      expect(/^https?:\/\//i.test(entry as string)).toBe(true);
    });
  });
});
