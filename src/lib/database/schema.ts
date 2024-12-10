import { SupabaseClient } from '@supabase/supabase-js';

export async function createSchema(supabase: SupabaseClient) {
  const { error } = await supabase.query(`
    -- Create users table
    create table if not exists public.users (
      id uuid references auth.users(id) primary key,
      email text not null unique,
      name text not null,
      role text not null check (role in ('admin', 'user')),
      group text not null,
      benefits jsonb not null default '{"vacation": 0, "sick": 0, "comp": 0}',
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Create schedules table
    create table if not exists public.schedules (
      id uuid default gen_random_uuid() primary key,
      user_id uuid references public.users(id) not null,
      date date not null,
      shift text not null,
      sector text,
      is_recurring boolean default false,
      recurring_pattern jsonb,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Create time_off_requests table
    create table if not exists public.time_off_requests (
      id uuid default gen_random_uuid() primary key,
      user_id uuid references public.users(id) not null,
      start_date date not null,
      end_date date not null,
      type text not null check (type in ('vacation', 'sick', 'comp')),
      status text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
      hours numeric not null check (hours > 0),
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Enable RLS
    alter table public.users enable row level security;
    alter table public.schedules enable row level security;
    alter table public.time_off_requests enable row level security;
  `);

  if (error) throw error;
}