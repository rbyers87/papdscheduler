# Scheduler App

## Setup Instructions

1. Create a new Supabase project at https://supabase.com

2. Copy your project URL and anon key from the project settings

3. Update `src/lib/supabase.ts` with your project credentials

4. Run the SQL commands from `src/lib/database/schema.sql` in the Supabase SQL editor to set up the database schema

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Login with the following credentials:
   - Admin: admin@work.com / test123
   - Regular User: user@work.com / test123

## Features

- User authentication with work email
- Role-based access control (admin/user)
- Schedule management
- Time off requests
- Benefit tracking (vacation/sick/comp time)
- Group-based scheduling
- Sector assignments