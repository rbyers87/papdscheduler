import { supabase } from '../lib/supabase';

export async function initializeTestData() {
  try {
    // Create admin user
    const { data: adminAuthData, error: adminAuthError } = await supabase.auth.signUp({
      email: 'admin@work.com',
      password: 'test123'
    });

    if (adminAuthError) throw adminAuthError;

    await supabase.from('users').insert({
      id: adminAuthData.user!.id,
      email: 'admin@work.com',
      name: 'Admin User',
      role: 'admin',
      group: 'Management',
      benefits: {
        vacation: 80,
        sick: 40,
        comp: 20
      }
    });

    // Create regular user
    const { data: userAuthData, error: userAuthError } = await supabase.auth.signUp({
      email: 'user@work.com',
      password: 'test123'
    });

    if (userAuthError) throw userAuthError;

    await supabase.from('users').insert({
      id: userAuthData.user!.id,
      email: 'user@work.com',
      name: 'Regular User',
      role: 'user',
      group: 'Day Shift',
      benefits: {
        vacation: 40,
        sick: 20,
        comp: 10
      }
    });

    console.log('Test data initialized successfully');
  } catch (error) {
    console.error('Error initializing test data:', error);
  }
}