// Client for iframe-mode plugins: exposes a ctx-shaped object over postMessage.
const PLUGIN_TAG = 'launcher-plugin';
const HOST_TAG = 'launcher-host';

export async function connect() {
  const pending = new Map();
  const handlers = new Map();
  let nextId = 1;
  const hostOrigin = document.referrer ? new URL(document.referrer).origin : '*';

  window.addEventListener('message', (e) => {
    if (e.source !== window.parent) return;
    const d = e.data;
    if (!d || d.source !== HOST_TAG) return;

    if (d.event) {
      (handlers.get(d.event.type) || []).forEach((h) => h(d.event));
      return;
    }
    const p = pending.get(d.id);
    if (!p) return;
    pending.delete(d.id);
    d.error ? p.reject(new Error(d.error)) : p.resolve(d.result);
  });

  const call = (method, ...args) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      window.parent.postMessage({ source: PLUGIN_TAG, id, method, args }, hostOrigin);
    });

  const info = await call('getContext');

  return {
    pluginId: info.pluginId,
    currentUser: info.user,
    eventBus: {
      publish: ({ type, payload }) => void call('publish', type, payload),
      subscribe(type, handler) {
        const list = handlers.get(type) || [];
        list.push(handler);
        handlers.set(type, list);
        if (list.length === 1) call('subscribe', type);
        return () => {
          const rest = (handlers.get(type) || []).filter((h) => h !== handler);
          handlers.set(type, rest);
          if (rest.length === 0) call('unsubscribe', type);
        };
      },
    },
  };
}
