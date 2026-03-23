# PetPulse Web - Database & Email Setup Guide

## Database Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully provisioned

### 2. Apply Database Migration

The application uses a `profiles` table to store user information. To create this table:

#### Option A: Using Supabase Dashboard (Recommended for first-time setup)

1. Navigate to your Supabase project dashboard
2. Go to **SQL Editor** from the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/001_create_profiles_table.sql`
5. Paste it into the SQL editor
6. Click **Run** or press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)

#### Option B: Using Supabase CLI

If you have the Supabase CLI installed locally:

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Push the migration
supabase db push
```

### 3. Verify Database Setup

After running the migration, verify that:

1. The `profiles` table exists in your database
2. Row Level Security (RLS) is enabled on the `profiles` table
3. The following policies are created:
   - Users can view their own profile
   - Users can insert their own profile
   - Users can update their own profile
4. The trigger `on_auth_user_created` is active

You can check these in the Supabase dashboard under:

- **Database** → **Tables** (to see the profiles table)
- **Authentication** → **Policies** (to see RLS policies)

## Email Configuration for Email Change Verification

For email change verification to work properly, you need to configure email settings in Supabase. Supabase sends confirmation emails with secure links to both your current and new email addresses.

### 1. Configure Email Templates

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Email Templates**
3. Ensure the **Change Email** template is enabled and configured
4. The default template should work, but you can customize it if needed

### 2. Email Provider Setup (Production)

For production use, it's recommended to set up a custom SMTP provider:

1. Navigate to **Project Settings** → **Auth**
2. Scroll to **SMTP Settings**
3. Configure your SMTP provider (e.g., SendGrid, AWS SES, Mailgun)
4. Test the configuration

**Note**: Supabase's built-in email service has rate limits. For production, always use a custom SMTP provider.

### 3. Configure Email Rate Limiting

To prevent abuse:

1. Go to **Authentication** → **Rate Limits**
2. Configure appropriate rate limits for:
   - Email sign-ups
   - Email changes
   - OTP requests

## Environment Variables

Create a `.env.local` file in the project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

Find these values in your Supabase dashboard:
**Project Settings** → **API** → **Project URL** and **Project API keys**

## Testing the Setup

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Create a test account or login with an existing account

3. Navigate to `/user/settings`

4. Test each feature:
   - **Name Update**: Enter a name and click "Update Name"
   - **Password Change**: Enter a new password (min 6 characters) and confirm it
   - **Email Change**:
     - Enter a new email address
     - Click "Request Email Change"
     - Check **both** your current and new email inboxes
     - Click the confirmation links in both emails to complete the change
     - The change is only completed after both emails are confirmed

## Troubleshooting

### Email confirmation not received

1. Check your spam/junk folder for both your current and new email addresses
2. Verify email templates are enabled in Supabase dashboard
3. Check Supabase logs: **Logs** → **Auth Logs**
4. Ensure the email provider is configured correctly
5. Make sure both confirmation emails are clicked (current AND new email)

### Database errors

1. Verify the migration was applied successfully
2. Check RLS policies are active
3. Ensure the user is authenticated before accessing settings
4. Check Supabase logs: **Logs** → **Database Logs**

### Build errors

1. Ensure `.env.local` has the correct Supabase credentials
2. Run `npm install` to ensure all dependencies are installed
3. Check that the Supabase project is active and accessible

## Security Notes

- The profiles table uses Row Level Security (RLS) to ensure users can only access their own data
- Email changes require OTP verification to prevent unauthorized changes
- Passwords are handled securely by Supabase Auth
- All sensitive operations are authenticated via Supabase session tokens
