# Modern Web Part Plugins (Separate Path)

This folder is reserved for Modern SPFx web part plugin packages that are managed separately from JavaScript SPA plugins in `src/pluginsJS`.

## Why separate folders?

- `src/pluginsJS` is for JS SPA plugins that can be uploaded and discovered without rebuilding the Launcher2 host.
- `src/pluginsModern` is for SPFx-based plugin packages that have their own SPFx packaging lifecycle.

## Recommended structure

```text
src/pluginsModern/
  my-modern-plugin/
    README.md
    src/
    package.json
```

## Integration model

1. Build/deploy each modern plugin package independently.
2. Register the plugin endpoint/entry page in `plugin-registry.json`.
3. Keep host rebuilds independent from plugin package updates.
