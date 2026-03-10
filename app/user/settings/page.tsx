import { createClient } from '@/lib/supabase/server';

export default async function UserSettings() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  return <div>User</div>;
}
