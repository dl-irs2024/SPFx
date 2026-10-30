# SPAs.GettingStarted

This guide is specific to SPA plugins in Launcher2.

## 1. SPA modes

Launcher2 supports two SPA host modes:

- `mount`: runs in host page Shadow DOM with full context
- `iframe`: sandboxed page with limited bridge context

Use `mount` for trusted plugins needing SharePoint/Graph clients.
Use `iframe` for stronger isolation or conflicting third-party libraries.

## 2. Standalone development mode

A SPA can be developed and tested outside Launcher2 first.

Recommended workflow:

1. Build/test SPA as standalone web app.
2. Add Launcher2 adapter entry (`index.js`) implementing plugin contract.
3. In host-integrated mode, use provided `ctx` object.

## 3. Browser assumptions

- Edge is primary
- Chrome and Firefox supported
- Target modern engines from the last 2-3 years
- Use modern ECMAScript (`ES2020+`)

## 4. Example plugin skeleton

```js
export default {
  async init(ctx) {
    ctx.logger?.info?.('SPA init');
  },

  async mount(container, ctx) {
    container.innerHTML = '<div id="app"></div>';
    const root = container.querySelector('#app');
    if (root) {
      root.textContent = `Hello ${ctx.currentUser.displayName}`;
    }
  },

  async unmount() {
    // remove listeners/timers
  },
};
```

## 5. Host-integrated access

In `mount` mode you can call:

- SharePoint Lists via `ctx.spClient`
- Users via `ctx.graphClient`
- Optional admin connectors when enabled

In `iframe` mode, use bridge-safe APIs only.

## 6. No host rebuild for SPA updates

To update SPA plugin:

1. Upload updated SPA assets.
2. Keep same URL or update URL in registry.
3. Reload page.

No Launcher2 host rebuild/deploy is required.

## 7. Recommended testing

- Unit-level logic tests in `tests/unit`
- Smoke tests for registry/discovery in `tests/smoke`
- Optional browser E2E tests for SPA routes and API calls
