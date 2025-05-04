import { useState } from 'react';
import { supabase } from './supabaseClient';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => supabase.auth.signInWithPassword({ email, password });
  const signUp = () => supabase.auth.signUp({ email, password });

  return (
    <div>
      <input placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={signIn}>Einloggen</button>
      <button onClick={signUp}>Registrieren</button>
    </div>
  );
}

export default Login;
