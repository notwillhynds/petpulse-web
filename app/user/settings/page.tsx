import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import UserSettingsClient from '@/components/user-settings-client';

export default async function UserSettings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <UserSettingsClient
      user={user}
      initialProfile={profile}
    />
  );
}
