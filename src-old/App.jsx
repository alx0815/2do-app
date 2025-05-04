import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './Login';
import TodoApp from './TodoApp';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Meine ToDo App</h1>
      {session ? <TodoApp session={session} /> : <Login />}
    </div>
  );
}

export default App;
