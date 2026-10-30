# PlugInsJS plan

Goal: JavaScript-only SPA plugins in `src/pluginsJS/`, sister to `src/plugins/`.

Decisions
- Host modes: `mount` (Shadow DOM) and `iframe` (sandbox + postMessage bridge), chosen by manifest `hostMode`.
- Libraries: CDN ESM or vendored by default (no build); JSX plugins use optional per-plugin esbuild via `build.json`.
- Languages: plain JS and JSX; no TypeScript in `pluginsJS`.
- Mode handling lives in `JsPluginAdapter` (no separate host component); `PluginHost.tsx` is unchanged.

Implemented
1. `types/IPlugin.ts`, `services/pluginLoader.ts`: `runtime`, `hostMode`, `iframeHeight`; `entryPoint`/`url` unified.
2. `services/jsPluginAdapter.ts`, `services/iframeBridge.ts`, `pluginsJS/_shared/launcher-bridge.js`.
3. `esbuild.config.js`: copies `pluginsJS` to `dist/pluginsJS`, bundles plugins with `build.json`.
4. `plugin-registry.json`: `hello-spa`, `react-spa`, `notes-spa`.
5. Samples and `_template`; docs in `PlugInsJS.Explain.md`.

Verification (todo)
- `npm run build` produces `dist/pluginsJS/*`.
- Load each sample in the workbench; confirm unmount removes listeners.
- Iframe bridge rejects bad origins and non-allowlisted methods.
- Existing `site-picker` and `data-viewer` still load.

Known pre-existing issues (not changed)
- `plugin-registry.json` is an array but `loadPluginsFromRegistry` expects `{ plugins: [...] }`.
- `PluginHost.tsx` calls `plugin.render(container)` while `IPluginLifecycle.render` requires a context argument.
