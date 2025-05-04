import { createClient } from '@supabase/supabase-js';

// Ersetze durch deine echten Supabase-Daten:
const supabaseUrl = 'https://eejowqitubokpdahuujx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlam93cWl0dWJva3BkYWh1dWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNTY5NzcsImV4cCI6MjA2MTkzMjk3N30.fam39y6V80uRPHNbjrigebrwsibeTshQ2HBqRsofICU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);