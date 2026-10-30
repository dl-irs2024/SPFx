// Notes CRUD SPA using a 3rd-party library (marked) loaded from a CDN as ESM.
import { marked } from 'https://esm.sh/marked@12.0.2';

const KEY = 'notes-spa:notes';
let cleanup = [];

// localStorage throws inside opaque-origin sandboxed iframes
const store = {
  load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return memory; }
  },
  save(notes) {
    memory = notes;
    try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch { /* memory only */ }
  },
};
let memory = [];

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export default {
  async mount(container) {
    container.innerHTML = `
      <style>
        :host { font-family: Segoe UI, sans-serif; display: block; }
        .row { display: flex; gap: 16px; }
        .col { flex: 1; min-width: 0; }
        textarea, input { width: 100%; box-sizing: border-box; margin-bottom: 6px; }
        textarea { height: 120px; }
        li { cursor: pointer; margin: 4px 0; }
        li.sel { font-weight: 700; }
        .preview { border: 1px solid #ccc; padding: 8px; min-height: 120px; }
      </style>
      <div class="row">
        <div class="col">
          <button id="new">New note</button>
          <ul id="list"></ul>
        </div>
        <div class="col">
          <input id="title" placeholder="Title" />
          <textarea id="body" placeholder="Markdown..."></textarea>
          <button id="save">Save</button> <button id="del">Delete</button>
          <div class="preview" id="preview"></div>
        </div>
      </div>`;

    const $ = (s) => container.querySelector(s);
    let notes = store.load();
    let selected = notes[0]?.id ?? null;

    const current = () => notes.find((n) => n.id === selected);
    const renderList = () => {
      $('#list').innerHTML = notes
        .map((n) => `<li data-id="${n.id}" class="${n.id === selected ? 'sel' : ''}">${esc(n.title || 'Untitled')}</li>`)
        .join('');
    };
    const renderEditor = () => {
      const n = current();
      $('#title').value = n?.title ?? '';
      $('#body').value = n?.body ?? '';
      renderPreview();
    };
    const renderPreview = () => {
      // marked does not sanitize; escape raw HTML so note content cannot inject markup
      $('#preview').innerHTML = marked.parse(esc($('#body').value));
    };

    const onClick = (e) => {
      const t = e.target;
      if (t.id === 'new') {
        const n = { id: String(Date.now()), title: '', body: '' };
        notes.unshift(n);
        selected = n.id;
        store.save(notes);
      } else if (t.id === 'save' && current()) {
        current().title = $('#title').value;
        current().body = $('#body').value;
        store.save(notes);
      } else if (t.id === 'del' && current()) {
        notes = notes.filter((n) => n.id !== selected);
        selected = notes[0]?.id ?? null;
        store.save(notes);
      } else if (t.dataset?.id) {
        selected = t.dataset.id;
      } else {
        return;
      }
      renderList();
      renderEditor();
    };
    container.addEventListener('click', onClick);
    $('#body').addEventListener('input', renderPreview);
    cleanup.push(() => container.removeEventListener('click', onClick));

    renderList();
    renderEditor();
  },

  async unmount() {
    cleanup.forEach((fn) => fn());
    cleanup = [];
  },
};
