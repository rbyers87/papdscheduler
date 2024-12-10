import { supabase } from '../supabase';

export async function signIn(email: string, password: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (authError) throw authError;
    
    // First enable bypass RLS for admin check
    await supabase.rpc('admin_check', { user_id: authData.user.id });
    
    // Fetch user data after successful authentication
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();
      
    if (userError) throw userError;
    
    return { session: authData.session, user: userData };
  } catch (error) {
    console.error('Sign in error:', error);
    throw new Error('Invalid email or password');
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}