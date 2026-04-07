import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eywlrsdubekffgfpyuyl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d2xyc2R1YmVrZmZnZnB5dXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNjM3NDIsImV4cCI6MjA5MDYzOTc0Mn0.VZI6uBX09ZRLGkebDd-WI64iR7yeBldXE0b8lorofNI';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Supabase features will be disabled.');
    return null;
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
}

// For backward compatibility
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
