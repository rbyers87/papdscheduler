import { supabase } from '../supabase';
import type { User } from '../../types';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error || !userData) return null;
    return userData;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}