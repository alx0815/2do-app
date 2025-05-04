import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function TodoApp({ session }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const user = session.data.user;

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
    if (!text) return;

    const { data } = await supabase
      .from('todos')
      .insert([{ text, user_id: user.id }])
      .select();

    setTodos([data[0], ...todos]);
    setText('');
  }

  async function deleteTodo(id) {
    await supabase.from('todos').delete().eq('id', id);
    setTodos(todos.filter(todo => todo.id !== id));
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <div>
      <p>Eingeloggt als: {user.email}</p>
      <button onClick={logout}>Abmelden</button>

      <div style={{ marginTop: '1rem' }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Neue Aufgabe..." />
        <button onClick={addTodo}>Hinzufügen</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
