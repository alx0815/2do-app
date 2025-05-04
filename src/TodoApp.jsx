import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function TodoApp({ session }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all'); // "all", "open", "done"
  const user = session.user;

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { data } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('inserted_at', { ascending: false });

    setTodos(data || []);
  }

  async function addTodo() {
    if (!text.trim()) return;

    const { data } = await supabase
      .from('todos')
      .insert([{ text: text.trim(), user_id: user.id, done: false }])
      .select();

    setTodos([data[0], ...todos]);
    setText('');
  }

  async function deleteTodo(id) {
    await supabase.from('todos').delete().eq('id', id);
    setTodos(todos.filter(todo => todo.id !== id));
  }

  async function toggleDone(id, currentValue) {
    const { data } = await supabase
      .from('todos')
      .update({ done: !currentValue })
      .eq('id', id)
      .select();

    setTodos(todos.map(todo => (todo.id === id ? data[0] : todo)));
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'done') return todo.done;
    if (filter === 'open') return !todo.done;
    return true;
  });

  return (
    <div>
      <p>Eingeloggt als: {user.email}</p>
      <button onClick={logout}>Abmelden</button>

      <div style={{ marginTop: '1rem' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Neue Aufgabe..."
        />
        <button onClick={addTodo}>Hinzufügen</button>
      </div>

      {/* Filter-Buttons */}
      <div style={{ margin: '1rem 0' }}>
        <button
          onClick={() => setFilter('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
        >
          Alle
        </button>
        <button
          onClick={() => setFilter('open')}
          style={{ fontWeight: filter === 'open' ? 'bold' : 'normal' }}
        >
          Offen
        </button>
        <button
          onClick={() => setFilter('done')}
          style={{ fontWeight: filter === 'done' ? 'bold' : 'normal' }}
        >
          Erledigt
        </button>
      </div>

      {/* Aufgabenliste */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                marginRight: '1rem',
              }}
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(todo.id, todo.done)}
              />
              {todo.done && (
                <span style={{ fontSize: '0.9rem' }}>erledigt</span>
              )}
            </label>

            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
