# PlugInsJS: JavaScript-only (SPA) plugins

## Are the existing plugins SPAs?

No. Plugins in `src/plugins/` are TypeScript classes (`initialize` / `render` / `dispose`). The host renders each one into a `<div>`. They are widgets: no router, no per-plugin dependencies (one shared esbuild config, `react`/`react-dom`/`@fluentui/react` external).

`src/pluginsJS/` adds plain-JavaScript plugins that can be full single page apps with their own 3rd-party libraries. Both kinds load through the same `PluginLoader` and registry, selected by `"runtime": "js"` in the manifest.

## Contract

```js
export default {
  async init(ctx) {},                   // optional
  async mount(container, ctx) {},       // render your SPA into container
  async unmount() {},                   // remove listeners, timers, roots
};
```

`ctx` is the full `ISharedContext` in `mount` mode. In `iframe` mode it is `{ pluginId, currentUser, eventBus }` (eventBus `publish({type,payload})` and `subscribe(type, handler)` only).

## Folder layout

```
src/pluginsJS/
  _shared/launcher-bridge.js   iframe-mode client (connect() -> ctx)
  _template/                   copy to start a new plugin
  <plugin-id>/
    index.js | index.jsx       entry
    manifest.json              registry entry
    index.html                 iframe mode only
    build.json                 only for JSX: { "entry": "index.jsx", "out": "index.js" }
```

Folders starting with `_` are copied but never built.

## Host modes

| `hostMode` | Runs in | Context | Use when |
|---|---|---|---|
| `mount` (default) | Shadow DOM in the launcher page | Full `ISharedContext` | Trusted plugins; need Graph/SP clients |
| `iframe` | Sandboxed iframe | Allowlisted subset over postMessage | Untrusted code, own globals, conflicting libraries |

Mount-mode notes:
- CSS is isolated by Shadow DOM, so put `<style>` inside your container. `document.querySelector` will not see your DOM; query `container`.
- Do not use `location.hash` or `history` for routing; they belong to the launcher page. Use an in-memory router (see `hello-spa`).
- Global side effects (window properties, global CSS) are not isolated. Clean up in `unmount`.
- Import maps are document-global, so use full URLs for libraries.

Iframe-mode notes:
- Serve `index.html` from a different origin than the launcher (for example Azure Static Web Apps or Blob static hosting). SharePoint libraries force `.html` files to download, so iframe mode cannot be hosted there.
- Same-origin frames get a sandbox without `allow-same-origin` (opaque origin; `localStorage` throws, so fall back to memory).
- The bridge checks `event.source` and `event.origin` and rejects any method outside `getContext`, `publish`, `subscribe`, `unsubscribe`. Tokens are never sent.

## 3rd-party libraries

- **CDN ESM, no build:** `import { marked } from 'https://esm.sh/marked@12.0.2';` (see `notes-spa`). Pin versions.
- **Vendored:** put the ESM file in `<plugin>/vendor/` and import it relatively.
- **JSX:** add `build.json`; `npm run build` bundles `index.jsx` to `index.js` with esbuild. `https://` imports stay external (see `react-spa`).

## Create a plugin

1. Copy `src/pluginsJS/_template` to `src/pluginsJS/my-plugin`.
2. Edit `manifest.json` (`id` must match the folder) and `index.js`.
3. Add the manifest to `plugin-registry.json`.
4. `npm run build`; output goes to `dist/pluginsJS/`.
5. Upload `dist/pluginsJS/<id>/` (and `_shared/` for iframe mode) to the asset library and fix `url` in the registry.

## Limits and when to build a separate launcher

This is still one launcher page: plugins share the page's lifecycle, auth session and CSP. If you need per-plugin routing in the URL, independent deployments with their own auth, or no SPFx host, a standalone launcher (shell app with iframes or module federation) is the better fit. The `iframe` mode and bridge here are the part that would carry over.
