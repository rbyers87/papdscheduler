import { create } from 'zustand';
import { signIn, signOut } from '../lib/auth/auth';
import { getCurrentUser } from '../lib/auth/session';
import type { User } from '../types';

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
      await signIn(email, password);
      const user = await getCurrentUser();
      if (!user) throw new Error('User not found');
      set({ user, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await signOut();
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
getCurrentUser().then(user => {
  useAuthStore.setState({ user, loading: false });
});