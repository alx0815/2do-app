import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './Login';
import TodoApp from './TodoApp';

// Dark Mode initial setzen
function initDarkMode() {
  const saved = localStorage.getItem('darkmode');
  if (saved === 'true') {
    document.body.classList.add('dark');
  }
}

// Dark Mode Umschalten
function toggleDarkMode() {
  const body = document.body;
  const dark = body.classList.toggle('dark');
  localStorage.setItem('darkmode', dark ? 'true' : 'false');
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    initDarkMode(); // Darkmode beim Laden anwenden

    // Session aus Supabase holen
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Auth-Listener setzen
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📝 ALX 2Do App</h1>

      <button onClick={toggleDarkMode} style={{ marginBottom: '1rem' }}>
        🌙 Dark Mode wechseln
      </button>

      {session ? <TodoApp session={session} /> : <Login />}
    </div>
  );
}

export default App;
