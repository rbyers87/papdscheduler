import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type User = Database['public']['Tables']['users']['Row'];

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) throw userError;
      set({ user: userData, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await supabase.auth.signOut();
      set({ user: null, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error })
}));

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data: userData, error }) => {
        if (!error && userData) {
          useAuthStore.setState({ user: userData, loading: false });
        } else {
          useAuthStore.setState({ loading: false, error: error?.message });
        }
      });
  } else {
    useAuthStore.setState({ loading: false });
  }
});

// Setup auth listener
supabase.auth.onAuthStateChange(async (event, session) => {
  if (session?.user) {
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (!error && userData) {
      useAuthStore.setState({ user: userData, loading: false });
    } else {
      useAuthStore.setState({ loading: false, error: error?.message });
    }
  } else {
    useAuthStore.setState({ user: null, loading: false });
  }
});