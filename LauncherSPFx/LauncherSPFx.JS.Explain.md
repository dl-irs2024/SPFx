# LauncherSPFx guide

Explains every file in `LauncherSPFx/`, how to build the launcher, and how to add and test a `pluginsJS` SPA plugin.

## 1. What this project is

An SPFx web part (`LauncherHost`) that reads a plugin registry (JSON), loads each plugin as an ES module, and mounts it on the page. All plugins get one `ISharedContext` (auth, Graph, SharePoint, event bus, logger).

Two plugin kinds:

| Kind | Folder | Language | Shape |
|---|---|---|---|
| Widget plugin | `src/plugins/` | TypeScript | class implementing `IPlugin` |
| SPA plugin | `src/pluginsJS/` | JavaScript / JSX | `export default { init?, mount, unmount }` |

## 2. Root files

| File | Purpose |
|---|---|
| `package.json` | Dependencies and scripts. `build` = `heft build` then `build:plugins` (`node esbuild.config.js`). |
| `tsconfig.json` | TS options: ES2020, `react-jsx`, `rootDir: src`, `outDir: dist`, path aliases `@services/*`, `@components/*`, `@types/*`, `@context/*`. |
| `heft.json` | Heft (SPFx toolchain) config; copies `*.manifest.json` from `src/webparts` to `temp/webparts` before compile. |
| `esbuild.config.js` | Bundles `src/plugins/*/index.ts` to `dist/plugins/<id>/<id>.js` (ESM, splitting, react/react-dom/fluentui external). Also copies `src/pluginsJS` to `dist/pluginsJS` and bundles any plugin that has `build.json`. |
| `plugin-registry.json` | Registry listing plugins: id, title, version, `url`, scopes, roles, dependencies, and for JS plugins `runtime`/`hostMode`. Upload to the asset library; the web part's `registryUrl` points to it. |
| `.gitignore` | Git ignore rules. |
| `README.md` | Project overview and quick start. |
| `ARCHITECTURE_OVERVIEW.md` | Full architecture: layers, context, event bus, security model. |
| `SPFx.Launcher.Plan.md` | Build and deployment plan (local, Codespaces, Docker, CI). |
| `GITHUB_CODESPACES_SETUP.md` | Steps to push to GitHub and build in Codespaces. |
| `IMPLEMENTATION_STATUS.md` | Progress tracker across phases. |
| `PHASE2_COMPLETION.md`, `PHASE3_COMPLETION.md`, `PHASE4_COMPLETION.md` | Per-phase completion summaries. |
| `SFPx.Help.Chat.md` | Saved development chat log. |

## 3. `src/` tree

### `src/types/` (interfaces only, no runtime code)
| File | Purpose |
|---|---|
| `index.ts` | Re-exports the types below. |
| `IPlugin.ts` | `IPlugin` lifecycle (`initialize`, `render`, `dispose`), `IPluginManifest` (includes `runtime`, `hostMode`, `iframeHeight`), `ILoadedPlugin`. |
| `ISharedContext.ts` | `ISharedContext` plus `IGraphClient`, `IPowerPlatformService`, `IEntraService`, `ILogger`, `INotificationService`, `IProxyMiddleware`. |
| `IAuthService.ts` | `IUser`, `IAuthService` (tokens, account switch, scopes). |
| `IEventBus.ts` | `FrameworkEvent`, `IEventBus` (publish/subscribe/history). |
| `IDataService.ts` | `ISharedDataService` (shared state across plugins). |
| `ISPClient.ts` | `ISPClient` (SharePoint REST wrapper). |

### `src/services/` (implementations)
| File | Purpose |
|---|---|
| `pluginLoader.ts` | Fetches the registry, sorts by dependencies, checks scopes, imports each module. Branches on `runtime: "js"`. |
| `jsPluginAdapter.ts` | Wraps a JS plugin as `IPlugin`; mounts in Shadow DOM or a sandboxed iframe. |
| `iframeBridge.ts` | Host side of postMessage for iframe plugins (origin check, allowlisted methods, no tokens). |
| `authService.ts` | MSAL token handling and account switching. |
| `graphClientService.ts` | Microsoft Graph user/group queries. |
| `entraService.ts` | Entra groups, directory search, manager chain (read-only). |
| `spClientService.ts` | SharePoint REST via `spHttpClient`. |
| `powerPlatformService.ts` | Dataverse and Canvas Apps access (read-only). |
| `sharedDataService.ts` | Multi-level shared data storage and sync. |
| `eventBus.ts` | Pub/sub between plugins. |
| `notificationService.ts` | Toasts, dialogs, file download. |
| `proxyMiddleware.ts` | Handles 407 proxy authentication errors. |
| `logger.ts` | Consistent logging. |

### `src/context/`
| File | Purpose |
|---|---|
| `SharedContext.tsx` | React provider and `useSharedContext()` hook that build and expose `ISharedContext`. |

### `src/components/`
| File | Purpose |
|---|---|
| `PluginHost.tsx` | Mounts one plugin in a container with an error boundary; calls `initialize`, `render`, `dispose`; publishes `plugin:mounted` / `plugin:unmounted`. |

### `src/webparts/LauncherHost/`
| File | Purpose |
|---|---|
| `LauncherHostWebPart.tsx` | The SPFx web part: loads the registry via `PluginLoader` and renders a `PluginHost` per plugin. Properties: `title`, `registryUrl`, `enableDebugMode`. |
| `LauncherHostWebPart.manifest.json` | SPFx component manifest (id, version, toolbox entry). |
| `LauncherHost.module.scss` | Web part styles. |
| `loc/en-us.js` | Localized strings. |

### `src/plugins/` (TypeScript widget plugins)
| Path | Purpose |
|---|---|
| `site-picker/index.ts`, `manifest.json` | Search and select SharePoint sites; publishes site events. |
| `data-viewer/index.ts`, `manifest.json` | Tabs for SharePoint lists, Dataverse, and events; listens for `site:loaded`. |

### `src/pluginsJS/` (JavaScript SPA plugins)
| Path | Purpose |
|---|---|
| `_template/` | Starter: `index.js`, `index.html` (iframe only), `manifest.json`. |
| `_shared/launcher-bridge.js` | Iframe-side client; `connect()` returns a `ctx` with `currentUser` and `eventBus`. |
| `hello-spa/` | Plain JS SPA, in-memory router, mount mode. |
| `notes-spa/` | Notes CRUD with `marked` from a CDN, iframe mode. |
| `react-spa/` | JSX + React from esm.sh, built via `build.json`. |

### `src/` docs
`PlugInsJS.Explain.md` (how SPA plugins work) and `PlugInsJS.Plan.md` (implementation plan).

## 4. Build the launcher

Prerequisites: Node 22+, npm 10+.

1. `cd LauncherSPFx`
2. `npm install`
3. `npm run build`
   - `heft build` compiles the web part to `dist/launcher` (the `.sppkg`).
   - `node esbuild.config.js` writes `dist/plugins/**` and `dist/pluginsJS/**`.
4. Deploy:
   - Upload the `.sppkg` to the tenant App Catalog and add the web part to a page.
   - Upload `dist/plugins/` and `dist/pluginsJS/` to the asset library (for example `AppAssets`).
   - Set each `url` in `plugin-registry.json` to the uploaded location, upload the registry, and put its URL in the web part's `registryUrl` property.
5. Watch mode: `npm run dev` (web part) and `npm run dev:plugins` (TS plugins only).

### Review of the build (gaps found)

Read these before the first real build:
- `package.json` `build:plugins` was calling the esbuild CLI directly, which skipped `esbuild.config.js` and `pluginsJS`. It now runs `node esbuild.config.js`. `dev:plugins` still uses the CLI and does not watch `pluginsJS`.
- The SPFx scaffolding is incomplete: no `config/config.json`, `config/package-solution.json`, `config/serve.json`, or `sharepoint/` folder, so `heft build` cannot produce a `.sppkg` yet. Generate these with the SPFx Yeoman generator in a scratch folder and copy them in.
- `@microsoft/sp-property-pane` is imported by the web part but is not in `package.json`.
- `LauncherHostWebPart.tsx` imports `../context/...`, `../components/...` and `../services/...`; from `src/webparts/LauncherHost/` these should be `../../...`.
- `plugin-registry.json` is an array, but `loadPluginsFromRegistry` expects `{ version, lastUpdated, plugins: [...] }`.
- `PluginHost.tsx` calls `plugin.render(container)` while `IPluginLifecycle.render` requires a second `context` argument.
- `esbuild.config.js` uses `fs.cpSync` (Node 16.7+), fine on Node 22.

## 5. Add a `pluginsJS` SPA plugin and test it

### Add
1. Copy `src/pluginsJS/_template` to `src/pluginsJS/my-spa`.
2. In `manifest.json` set `id` to `my-spa` (match the folder), `title`, `url`, and `hostMode` (`mount` or `iframe`).
3. Write the SPA in `index.js`:
   - `mount(container, ctx)` renders into `container`; query inside `container`, not `document`.
   - `unmount()` removes listeners, timers and roots.
   - Use full URLs for libraries (`https://esm.sh/lib@1.2.3`) or files in `my-spa/vendor/`.
   - Use an in-memory router, not `location.hash`.
4. JSX: rename to `index.jsx`, add `build.json` with `{ "entry": "index.jsx", "out": "index.js" }`.
5. Iframe mode only: keep `index.html`; host it on a different origin than the launcher (SharePoint libraries download `.html`).
6. Append the manifest to `plugin-registry.json`.

### Test locally
1. `npm run build:plugins`; check that `dist/pluginsJS/my-spa/index.js` exists.
2. Serve with CORS: `npx http-server dist -p 8080 --cors`.
3. In a local copy of the registry, set `url` to `http://localhost:8080/pluginsJS/my-spa/index.js` (for iframe mode use `index.html`). Serve that registry too, for example from `dist/`.
4. Run the web part in the SPFx workbench (`npm run serve`) and set `registryUrl` to `http://localhost:8080/plugin-registry.json`.
5. Check:
   - the plugin renders and the console shows `JS plugin loaded: my-spa (mount)`;
   - navigating inside the SPA does not change the page URL;
   - removing the web part leaves no stray listeners (`unmount` ran);
   - iframe mode: messages from another origin are ignored, and a call to a method outside the allowlist returns an error;
   - `site-picker` and `data-viewer` still load.

Troubleshooting:
- "must default-export { mount }": the entry is not a module with a default export.
- CORS error on the import: serve with `--cors`, or from the same origin.
- Blank iframe: the framing page blocks it (CSP `frame-src`) or the iframe URL is not `https`/`localhost`.
