-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create users table
create table public.users (
  id uuid references auth.users(id) primary key,
  email text not null unique,
  name text not null,
  role text not null check (role in ('admin', 'user')),
  group text not null,
  benefits jsonb not null default '{"vacation": 0, "sick": 0, "comp": 0}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create schedules table
create table public.schedules (
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
create table public.time_off_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) not null,
  start_date date not null,
  end_date date not null,
  type text not null check (type in ('vacation', 'sick', 'comp')),
  status text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
  hours numeric not null check (hours > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
-- Users table policies
create policy "Users can view their own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Admins can view all users"
  on public.users for select
  using (
    exists (
      select 1 from public.users where id = auth.uid() and role = 'admin'
    )
  );

-- Schedules table policies
create policy "Users can view their own schedules"
  on public.schedules for select
  using (auth.uid() = user_id);

create policy "Admins can view all schedules"
  on public.schedules for select
  using (
    exists (
      select 1 from public.users where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can manage schedules"
  on public.schedules for all
  using (
    exists (
      select 1 from public.users where id = auth.uid() and role = 'admin'
    )
  );

-- Time off requests policies
create policy "Users can view their own requests"
  on public.time_off_requests for select
  using (auth.uid() = user_id);

create policy "Users can create requests"
  on public.time_off_requests for insert
  with check (auth.uid() = user_id);

create policy "Admins can manage all requests"
  on public.time_off_requests for all
  using (
    exists (
      select 1 from public.users where id = auth.uid() and role = 'admin'
    )
  );