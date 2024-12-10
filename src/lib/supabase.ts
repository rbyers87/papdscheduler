import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://vnpufgdvimfjpkpfqgfb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZucHVmZ2R2aW1manBrcGZxZ2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2NTMyMDMsImV4cCI6MjA0OTIyOTIwM30.b4hoBSKb8uf67MaxVZD-_TDsLKOrYYIqnEI4pOAX1jw';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}
console.log('Auth Data:', authData);
console.log('Auth Error:', authError);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);