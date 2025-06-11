import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env file and ensure you have set:',
    !supabaseUrl ? '\n- REACT_APP_SUPABASE_URL' : '',
    !supabaseAnonKey ? '\n- REACT_APP_SUPABASE_ANON_KEY' : ''
  );
}

// Create a single supabase client for interacting with your database
const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', // Fallback to prevent crashes
  supabaseAnonKey || 'placeholder-key' // Fallback to prevent crashes
);

// Add a custom property to check if the client is properly configured
supabase.isConfigured = !!(supabaseUrl && supabaseAnonKey);

// Wrap the original functions to add configuration checks
const originalFrom = supabase.from.bind(supabase);
supabase.from = (table) => {
  if (!supabase.isConfigured) {
    console.error('Supabase client is not properly configured. Database operations will fail.');
  }
  return originalFrom(table);
};

export default supabase;
