import { supabase } from '../supabase';
import { createSchema } from './schema';
import { createPolicies } from './policies';
import { seedInitialData } from './seedData';

export async function setupDatabase() {
  try {
    // Check if database is already initialized
    const { error: checkError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (!checkError) {
      console.log('Database already initialized');
      return true;
    }

    // Initialize database
    await createSchema(supabase);
    await createPolicies(supabase);
    await seedInitialData(supabase);

    console.log('Database setup completed successfully');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
}