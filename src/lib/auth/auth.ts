// src/lib/auth/auth.ts
import { supabase } from '../supabase';

export async function signIn(email: string, password: string) {
  try {
    console.log('Attempting sign-in with email:', email);

    // Perform the sign-in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Auth Data:", authData);
    console.log("Auth Error:", authError);

    // If there was an error during authentication, throw an error
    if (authError) {
      console.error('Authentication error:', authError.message);
      throw new Error('Invalid email or password');
    }

    // Check if user data exists (should be available if the sign-in is successful)
    if (!authData?.user?.id) {
      console.error('No user ID returned from authentication');
      throw new Error('Invalid email or password');
    }

    // Admin check (optional)
    const { error: rpcError } = await supabase.rpc('admin_check', { user_id: authData.user.id });
    if (rpcError) {
      console.error('Admin check error:', rpcError.message);
      throw rpcError;
    }

    // Fetch user data from 'users' table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) {
      console.error('User fetch error:', userError.message);
      throw new Error('User data not found');
    }

    // Return the session and user data
    return { session: authData.session, user: userData };
  } catch (error) {
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
