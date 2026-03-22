## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase project (create one at [supabase.com](https://supabase.com))

### Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings at:
https://supabase.com/dashboard/project/_/settings/api

3. Run the database migration to create the profiles table:

In your Supabase project dashboard, go to the SQL Editor and run the migration file located at:
`supabase/migrations/001_create_profiles_table.sql`

Or if you have Supabase CLI installed:

```bash
supabase db push
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## User Settings Features

The application includes a comprehensive user settings page (`/user/settings`) with the following features:

- **Display Name**: Users can update their display name stored in the profiles table
- **Password Change**: Users can change their password securely
- **Email Change**: Users can change their email with OTP verification via Supabase
  - Sends a verification code to the new email
  - Validates the code before updating the email

All changes are protected with proper authentication and row-level security policies.

