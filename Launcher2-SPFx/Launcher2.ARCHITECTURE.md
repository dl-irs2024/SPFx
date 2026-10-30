# Launcher2 SPFx Pluggable Architecture

Date: 2026-10-30

## Goals

- Build the host once, deploy once.
- Add or update plugins without rebuilding the host package.
- Prefer JavaScript SPA plugins that run without TypeScript tooling after host deployment.
- Keep admin/cloud connectors optional and permission-aware.

## High-level model

```text
SharePoint Page
  -> Launcher2 Host Web Part
    -> Shared Context + Core Services
      -> Plugin Loader
        -> JS SPA Plugins (mount or iframe)
        -> Modern SPFx plugin path (separate lifecycle)
```

## Runtime capabilities

The host exposes capability flags to plugins via shared context:

- `capabilities.entraEnabled`
- `capabilities.powerPlatformEnabled`
- `capabilities.debugMode`

Plugins should check capabilities before calling optional connectors.

## Plugin discovery

- Registry-driven discovery from one URL configured in web part properties.
- Registry entries include:
  - `id`, `title`, `version`
  - `url` or `entryPoint`
  - `runtime` (`js` or `ts`)
  - `hostMode` (`mount` or `iframe` for JS plugins)
  - `requiredScopes`, `dependencies`

## Security and context

- Browser user context is primary.
- Optional admin connectors are disabled by default.
- If enabled and scopes are granted, plugins can access Entra/Power Platform/Dataverse via host services.
- Iframe plugins use a narrow message bridge instead of full host context exposure.

## Persistence

- Shared data service supports host/plugin data sharing.
- Plugin settings should use namespaced keys: `plugin:<pluginId>:<settingKey>`.
- Shared settings across plugins should use explicit shared keys: `shared:<domain>:<key>`.

## Deployment boundaries

Host package artifacts:

- SPFx package for app catalog deployment.

Plugin artifacts:

- JS plugin files uploaded to App Assets or static hosting.
- Registry file update to onboard plugin without host rebuild.

## Browser support

- Edge (primary), Chrome, Firefox
- Modern browsers from roughly the last 2-3 years
- ECMAScript target: ES2020+
