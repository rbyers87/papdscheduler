import { supabase } from '../supabase';

export async function setupDatabase() {
  try {
    // Create tables
    const createUsersTable = await supabase.rpc('setup_users_table');
    if (createUsersTable.error) throw createUsersTable.error;

    // Create admin user
    const { data: adminAuthData, error: adminAuthError } = await supabase.auth.signUp({
      email: 'admin@work.com',
      password: 'test123'
    });

    if (adminAuthError) throw adminAuthError;

    const { error: adminUserError } = await supabase.from('users').insert({
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

    if (adminUserError) throw adminUserError;

    // Create regular user
    const { data: userAuthData, error: userAuthError } = await supabase.auth.signUp({
      email: 'user@work.com',
      password: 'test123'
    });

    if (userAuthError) throw userAuthError;

    const { error: regularUserError } = await supabase.from('users').insert({
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

    if (regularUserError) throw regularUserError;

    console.log('Database setup completed successfully');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
}