# SPFx.GettingStarted

This guide builds and packages the Launcher2 SPFx host app.

## 1. Prerequisites

- Windows, macOS, or Linux build machine
- Node.js 22.x
- npm 10.x
- SharePoint tenant app catalog access

Recommended checks:

```powershell
node -v
npm -v
```

## 2. Install dependencies

From the Launcher2 root:

```powershell
cd Launcher2-SPFx
npm install
```

## 3. Build host and plugins

```powershell
npm run build
```

What this does:

- Runs Heft/SPFx host build
- Runs `esbuild.config.js` for plugin bundles

## 4. Package host for deployment

Use your existing SPFx packaging command in your build environment (for example CI/Codespaces) and publish the generated `.sppkg` to the tenant app catalog.

## 5. Configure host web part

When adding the web part to a page, set only these required properties:

- `title`
- `registryUrl`

Optional flags (default off):

- `enableEntraService`
- `enablePowerPlatformService`
- `enableDebugMode`

## 6. Deploy plugin assets

- Upload plugin JS/HTML assets to App Assets or trusted static hosting.
- Update `plugin-registry.json` with the plugin entry URLs.
- No host rebuild is required for new plugin onboarding.

## 7. Version/dependency notes

- Keep Node/npm versions aligned with this file for deterministic builds.
- Keep SPFx and `@microsoft/*` package versions pinned together.
- Test registry and plugin URLs with `npm run test:unit` and `npm run test:smoke`.

## 8. Build on another system and deploy to cloud

This project is designed for remote build systems:

1. Clone source on build host.
2. `npm ci` or `npm install`
3. `npm run build`
4. Publish host package to app catalog.
5. Upload plugin assets and registry.

No tenant-side recompilation is required.
