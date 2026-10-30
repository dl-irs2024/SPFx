// Copy this folder, rename it, and update manifest.json. Plain JS, no build step.
// ctx in mount mode is the full ISharedContext; in iframe mode it is { pluginId, currentUser, eventBus }.
let cleanup = [];

export default {
  async init(ctx) {
    // optional: one-time setup, called before mount
  },

  async mount(container, ctx) {
    container.innerHTML = `
      <style>:host{font-family:Segoe UI,sans-serif} h2{margin:0 0 8px}</style>
      <h2>My plugin</h2>
      <p>Hello, <span id="who"></span></p>`;
    container.querySelector('#who').textContent = ctx.currentUser.displayName;
  },

  async unmount() {
    cleanup.forEach((fn) => fn());
    cleanup = [];
  },
};
