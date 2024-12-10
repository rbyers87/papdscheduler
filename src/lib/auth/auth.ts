import { supabase } from '../supabase';

export async function signIn(email: string, password: string) {
  try {
    // Step 1: Sign in the user with email and password
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Handle authentication error
    if (authError) {
      console.error('Auth error:', authError.message);
      throw new Error('Invalid email or password');
    }

    console.log('Authenticated User ID:', authData.user.id);

    // Step 2: Enable bypass RLS for admin check
    const { error: rpcError } = await supabase.rpc('admin_check', { user_id: authData.user.id });

    // Log RPC errors explicitly
    if (rpcError) {
      console.error('Admin check RPC error:', rpcError.message);
      throw rpcError; // Rethrow to propagate the error
    } else {
      console.log('Admin check successful for user ID:', authData.user.id);
    }

    // Step 3: Fetch user data after successful authentication
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // Log and handle user data fetching error
    if (userError) {
      console.error('User fetch error:', userError.message);
      throw new Error('User data not found');
    }

    // Return session and user data if successful
    return { session: authData.session, user: userData };
    
  } catch (error) {
    // Step 4: Explicit error logging for the whole sign-in process
    console.error('Sign-in error:', error.message || error);
    throw error; // Re-throw the error for further handling
  }
}
