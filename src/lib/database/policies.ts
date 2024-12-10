import { SupabaseClient } from '@supabase/supabase-js';

export async function createPolicies(supabase: SupabaseClient) {
  const { error } = await supabase.query(`
    -- Users policies
    drop policy if exists "Users can view their own data" on users;
    drop policy if exists "Admins can view all users" on users;
    
    create policy "Users can view their own data"
      on users for select
      using (auth.uid() = id);
    
    create policy "Admins can view all users"
      on users for select
      using (
        auth.uid() in (
          select id from users where role = 'admin'
        )
      );

    -- Schedules policies
    drop policy if exists "Users can view their own schedules" on schedules;
    drop policy if exists "Admins can manage schedules" on schedules;
    
    create policy "Users can view their own schedules"
      on schedules for select
      using (auth.uid() = user_id);
    
    create policy "Admins can manage schedules"
      on schedules for all
      using (
        auth.uid() in (
          select id from users where role = 'admin'
        )
      );

    -- Time off requests policies
    drop policy if exists "Users can view their own requests" on time_off_requests;
    drop policy if exists "Users can create requests" on time_off_requests;
    drop policy if exists "Admins can manage all requests" on time_off_requests;
    
    create policy "Users can view their own requests"
      on time_off_requests for select
      using (auth.uid() = user_id);
    
    create policy "Users can create requests"
      on time_off_requests for insert
      with check (auth.uid() = user_id);
    
    create policy "Admins can manage all requests"
      on time_off_requests for all
      using (
        auth.uid() in (
          select id from users where role = 'admin'
        )
      );
  `);

  if (error) throw error;
}