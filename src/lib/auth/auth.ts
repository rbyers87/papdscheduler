// src/lib/auth/auth.ts
import { supabase } from '../supabase';

export async function signIn(email: string, password: string) {
  try {
    // Attempt to sign in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Check if there was an error during authentication
    if (authError) {
      console.error('Auth error:', authError.message);
      throw new Error('Invalid email or password');
    }

    // Log the full authData for debugging purposes
    console.log('Authenticated User:', authData);

    // Ensure the user ID is available in authData
    if (!authData?.user?.id) {
      console.error('No user ID returned from authentication');
      throw new Error('Invalid email or password');
    }

    // Perform admin check if needed (bypass RLS)
    const { error: rpcError } = await supabase.rpc('admin_check', { user_id: authData.user.id });
    if (rpcError) {
      console.error('Admin check error:', rpcError.message);
      throw rpcError;
    }

    // Fetch user data from the 'users' table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // If there's an error fetching user data, throw it
    if (userError) {
      console.error('User fetch error:', userError.message);
      throw new Error('User data not found');
    }

    // Return session and user data
    return { session: authData.session, user: userData };
  } catch (error) {
    // Catch any errors, log them, and rethrow
    console.error('Sign-in error:', error.message || error);
    throw error;
  }
}

// Add the signOut function
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign-out error:', error.message);
      throw new Error('Error during sign-out');
    }

    console.log('User signed out successfully');
  } catch (error) {
    console.error('Sign-out error:', error.message || error);
    throw error;
  }
}
