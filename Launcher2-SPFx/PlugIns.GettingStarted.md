# PlugIns.GettingStarted

This guide explains how to create a Launcher2 plugin that can access SharePoint lists/users and Microsoft cloud services through host-provided context.

## 1. Choose plugin type

- JavaScript SPA plugin (recommended): `src/pluginsJS/<plugin-id>/`
- Modern SPFx plugin package (separate lifecycle): `src/pluginsModern/`

## 2. Create a JS plugin folder

```text
src/pluginsJS/my-plugin/
  index.js
  manifest.json
```

Manifest template:

```json
{
  "id": "my-plugin",
  "title": "My Plugin",
  "version": "1.0.0",
  "runtime": "js",
  "hostMode": "mount",
  "url": "https://tenant.sharepoint.com/sites/central/AppAssets/pluginsJS/my-plugin/index.js",
  "requiredScopes": ["Sites.Read.All"],
  "minimumRoles": ["User"],
  "dependencies": []
}
```

## 3. Implement plugin contract

`index.js` default export must provide:

- `init(ctx)` (optional)
- `mount(container, ctx)`
- `unmount()` (optional)

## 4. Accessing SharePoint and users

In `mount` mode, plugins receive full host context and can use:

- `ctx.spClient` for SharePoint lists/items
- `ctx.graphClient` for users/groups

Optional services are available only when enabled:

- `ctx.entraService`
- `ctx.powerPlatformService`

Always check host capability flags first:

- `ctx.capabilities.entraEnabled`
- `ctx.capabilities.powerPlatformEnabled`

## 5. Register plugin

Add plugin manifest entry to `plugin-registry.json`.

Once assets are uploaded and registry is updated, plugin is discovered on next host load.

## 6. Persisting and sharing settings

Use namespaced keys in shared data:

- Per-plugin: `plugin:<pluginId>:<key>`
- Shared cross-plugin: `shared:<domain>:<key>`

## 7. Testing tools

- Unit tests: `npm run test:unit`
- Smoke tests: `npm run test:smoke`

Add plugin-specific tests under:

- `tests/unit/`
- `tests/smoke/`
