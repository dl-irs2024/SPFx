import React, { useState } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';

let root = null;

function App({ user }) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setItems([...items, text.trim()]);
    setText('');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <h3>React SPA</h3>
      <p>Signed in as {user.displayName}</p>
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
      <h4>Todo</h4>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New item" />
      <button onClick={add}>Add</button>
      <ul>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default {
  async mount(container, ctx) {
    root = createRoot(container);
    root.render(<App user={ctx.currentUser} />);
  },

  async unmount() {
    root?.unmount();
    root = null;
  },
};
