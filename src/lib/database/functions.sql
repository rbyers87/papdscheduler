-- Create admin check function
create or replace function admin_check(user_id uuid)
returns void
security definer
set search_path = public
language plpgsql
as $$
begin
  -- This function does nothing but exists to bypass RLS for the initial admin check
end;
$$;