'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader, Mail, Lock, User as UserIcon, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog';

interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  created_at?: string;
}

interface UserSettingsClientProps {
  user: User;
  initialProfile: Profile | null;
}

export default function UserSettingsClient({ user, initialProfile }: UserSettingsClientProps) {
  const supabase = createClient();
  const [firstName, setFirstName] = useState(initialProfile?.first_name || '');
  const [lastName, setLastName] = useState(initialProfile?.last_name || '');
  const [nameLoading, setNameLoading] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailChangeRequested, setEmailChangeRequested] = useState(false);

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const handleUpdateName = async () => {
    setNameLoading(true);
    setNameError('');
    setNameSuccess(false);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, first_name: firstName, last_name: lastName }, { onConflict: 'id' });

      if (error) {
        setNameError(error.message);
      } else {
        setNameSuccess(true);
        setTimeout(() => setNameSuccess(false), 3000);
      }
    } catch (error) {
      setNameError((error as Error).message);
      console.error(error);
    } finally {
      setNameLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      setPasswordLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setPasswordError(error.message);
      } else {
        setPasswordSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordSuccess(false), 3000);
      }
    } catch (error) {
      setPasswordError((error as Error).message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleRequestEmailChange = async () => {
    setEmailLoading(true);
    setEmailError('');
    setEmailSuccess(false);

    if (!emailPattern.test(newEmail)) {
      setEmailError('Invalid email address');
      setEmailLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser(
        { email: newEmail },
        { emailRedirectTo: `${window.location.origin}/user/settings` }
      );

      if (error) {
        setEmailError(error.message);
      } else {
        setEmailChangeRequested(true);
        setEmailSuccess(true);
      }
    } catch (error) {
      setEmailError((error as Error).message);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">User Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              {initialProfile?.first_name && initialProfile?.last_name ? (
                <CardTitle>
                  Display Name: {''}
                  {initialProfile.first_name} {initialProfile.last_name}
                </CardTitle>
              ) : (
                <CardTitle>Display Name</CardTitle>
              )}
            </div>
            <CardDescription>Update your display name</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                First Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={cn(
                  'border-input bg-background ring-offset-background focus-visible:ring-ring mb-2 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  nameSuccess && 'border-green-600'
                )}
              />
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Last Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={cn(
                  'border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  nameSuccess && 'border-green-600'
                )}
              />
            </div>
            {nameError && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                {nameError}
              </div>
            )}
            {nameSuccess && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="h-4 w-4" />
                Name updated successfully!
              </div>
            )}
            {initialProfile?.first_name && initialProfile?.last_name ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    {nameLoading ? <Loader className="h-4 w-4 animate-spin" /> : 'Update Name'}
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogFooter>
                    <div className="mt-4 flex w-full items-center gap-2">
                      <Button
                        variant="destructive"
                        onClick={handleUpdateName}
                        disabled={nameLoading || !firstName || !lastName}
                      >
                        {nameLoading ? <Loader className="h-4 w-4 animate-spin" /> : 'Update Name'}
                      </Button>
                      <DialogClose asChild>
                        <Button variant="outline">
                          {nameLoading ? <Loader className="h-4 w-4 animate-spin" /> : 'Cancel'}
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Button onClick={handleUpdateName} disabled={nameLoading || !firstName || !lastName}>
                {nameLoading ? <Loader className="h-4 w-4 animate-spin" /> : 'Update Name'}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <CardTitle>Password</CardTitle>
            </div>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="mb-2 block text-sm font-medium">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={cn(
                  'border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  newPassword &&
                    confirmPassword &&
                    newPassword === confirmPassword &&
                    'border-green-600'
                )}
              />
            </div>
            {passwordError && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="h-4 w-4" />
                Password updated successfully!
              </div>
            )}
            <Button
              onClick={handleUpdatePassword}
              disabled={passwordLoading || !newPassword || !confirmPassword}
            >
              {passwordLoading ? <Loader className="h-4 w-4 animate-spin" /> : 'Update Password'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <CardTitle>Email Address</CardTitle>
            </div>
            <CardDescription>
              Current email: <span className="font-medium">{user.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!emailChangeRequested ? (
              <>
                <div>
                  <label htmlFor="newEmail" className="mb-2 block text-sm font-medium">
                    New Email Address
                  </label>
                  <input
                    id="newEmail"
                    type="email"
                    placeholder="Enter new email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className={cn(
                      'border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                      newEmail && emailPattern.test(newEmail) && 'border-green-600'
                    )}
                  />
                </div>
                {emailError && (
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {emailError}
                  </div>
                )}
                <Button
                  onClick={handleRequestEmailChange}
                  disabled={emailLoading || !newEmail || !emailPattern.test(newEmail)}
                >
                  {emailLoading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    'Request Email Change'
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
                  <div className="mb-2 flex items-center gap-2 font-semibold">
                    <Check className="h-4 w-4" />
                    Verification emails sent!
                  </div>
                  <p className="mb-2">
                    Supabase has sent confirmation emails to both your current email (
                    <strong>{user.email}</strong>) and your new email (<strong>{newEmail}</strong>
                    ).
                  </p>
                  <p className="mb-2">
                    Please check both inboxes and click the confirmation links to complete the email
                    change.
                  </p>
                  <p className="text-xs opacity-80">
                    Note: You may need to check your spam/junk folders if you don't see the emails.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmailChangeRequested(false);
                    setNewEmail('');
                    setEmailError('');
                    setEmailSuccess(false);
                  }}
                >
                  Request Different Email
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
