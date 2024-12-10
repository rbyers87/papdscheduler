import { supabase } from '../supabase';

export async function signIn(email: string, password: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error('Auth error:', authError.message);
      throw new Error('Invalid email or password');
    }

    console.log('Authenticated User:', authData); // Log the full response

    // Check if user data exists
    if (!authData?.user?.id) {
      console.error('No user ID returned from authentication');
      throw new Error('Invalid email or password');
    }

    // Enable bypass RLS for admin check
    const { error: rpcError } = await supabase.rpc('admin_check', { user_id: authData.user.id });
    if (rpcError) {
      console.error('Admin check error:', rpcError.message);
      throw rpcError;
    }

    // Fetch user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) {
      console.error('User fetch error:', userError.message);
      throw new Error('User data not found');
    }

    return { session: authData.session, user: userData };
  } catch (error) {
    console.error('Sign-in error:', error.message || error);
    throw error;
  }
}
