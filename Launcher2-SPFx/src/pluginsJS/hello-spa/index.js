// SPA with an in-memory router (location.hash would collide with the launcher page).
let cleanup = [];

const views = {
  home: (ctx) => `<h3>Home</h3><p>Welcome, ${esc(ctx.currentUser.displayName)}.</p>`,
  user: (ctx) => `
    <h3>Profile</h3>
    <ul>
      <li>Name: ${esc(ctx.currentUser.displayName)}</li>
      <li>UPN: ${esc(ctx.currentUser.upn)}</li>
    </ul>`,
  about: () => `<h3>About</h3><p>A single page app in plain JavaScript, no build step.</p>`,
};

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export default {
  async mount(container, ctx) {
    container.innerHTML = `
      <style>
        :host { font-family: Segoe UI, sans-serif; }
        nav button { margin-right: 6px; padding: 4px 10px; cursor: pointer; }
        nav button.active { font-weight: 700; }
        main { margin-top: 12px; }
      </style>
      <nav>
        <button data-route="home">Home</button>
        <button data-route="user">Profile</button>
        <button data-route="about">About</button>
      </nav>
      <main></main>`;

    const main = container.querySelector('main');
    const navigate = (route) => {
      main.innerHTML = views[route](ctx);
      container.querySelectorAll('nav button').forEach((b) =>
        b.classList.toggle('active', b.dataset.route === route)
      );
      ctx.eventBus.publish({ type: 'hello-spa:navigated', sourcePluginId: 'hello-spa', payload: { route } });
    };

    const onClick = (e) => {
      const route = e.target.dataset?.route;
      if (route) navigate(route);
    };
    container.addEventListener('click', onClick);
    cleanup.push(() => container.removeEventListener('click', onClick));

    navigate('home');
  },

  async unmount() {
    cleanup.forEach((fn) => fn());
    cleanup = [];
  },
};
