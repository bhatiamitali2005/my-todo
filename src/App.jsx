import React, { useState, useEffect } from "react";

const LOCAL_KEY = "my-todo-list-v1";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // load from localStorage once
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      setTodos(saved);
    } catch {
      setTodos([]);
    }
  }, []);

  // save on change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [{ id: Date.now(), text: trimmed, done: false }, ...prev]);
    setText("");
  }

  function toggle(id) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="container">
      <h1>Simple Todo</h1>

      <form onSubmit={addTodo} className="input-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>

      <div className="stats">
        <span>Total: {todos.length}</span>
        <span>Done: {todos.filter(t => t.done).length}</span>
      </div>

      <ul className="todo-list">
        {todos.map(t => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggle(t.id)}
              />
              <span className="todo-text">{t.text}</span>
            </label>
            <button className="del" onClick={() => remove(t.id)}>✕</button>
          </li>
        ))}
        {todos.length === 0 && <p className="empty">No tasks yet — add one!</p>}
      </ul>
    </div>
  );
}
