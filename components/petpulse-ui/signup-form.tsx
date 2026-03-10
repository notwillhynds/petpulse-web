'use client';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '../ui/popover';

const supabase = createClient();

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const isEmailValid = email.length > 0 && emailPattern.test(email);
  const isPasswordValid = password.length > 6 && confirmPassword === password;
  const canSubmit = isEmailValid && isPasswordValid;

  const handleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (data.user?.identities?.length === 0) {
        setError('User already exists');
        return;
      }
      setSubmitted(true);
      setVerifying(true);
    } catch (error) {
      console.error('Signup: ', error);
      setError((error as Error).message);
    } finally {
      setSubmitted(false);
    }
  };

  const handleOtpVerify = async () => {
    setSubmitted(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
      if (error) {
        setError(error.message);
        return;
      }
    } catch (error) {
      console.error('Signup: ', error);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 py-1.5 text-sm font-medium transition-colors">
          Sign up
        </button>
      </DialogTrigger>
      <DialogContent className="bg-background/95">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
        </DialogHeader>
        {!verifying ? (
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-bold">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                'bg-input-bg-alpha border-input-border-alpha focus-visible:border-tint my-2 mb-4 rounded-md border p-1',
                isEmailValid && 'border-green-600 focus-visible:border-green-600'
              )}
            />
            <label htmlFor="password" className="text-sm font-bold">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                'bg-input-bg-alpha border-input-border-alpha focus-visible:border-tint my-2 mb-4 rounded-md border p-1',
                isPasswordValid && 'border-green-600 focus-visible:border-green-600'
              )}
            />
            <label htmlFor="confirmPassword" className="text-sm font-bold">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && canSubmit && handleSignup()}
              className={cn(
                'bg-input-bg-alpha border-input-border-alpha focus-visible:border-tint my-2 mb-4 rounded-md border p-1',
                isPasswordValid && 'border-green-600 focus-visible:border-green-600'
              )}
            />
            {error && <div className="mb-2 text-xs text-red-500">{error}</div>}
            <button
              className="bg-brand-black mt-2 flex cursor-pointer items-center justify-center rounded-md p-2 text-white hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!canSubmit}
              onClick={handleSignup}
            >
              {submitted ? <Loader className="h-4 w-4 animate-spin" /> : 'Sign up'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <label htmlFor="token" className="text-sm font-bold">
              Enter the token you received via email
            </label>
            <input
              id="token"
              type="text"
              placeholder="Enter your token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="my-4 rounded-md border p-1"
            />
            <div className="mt-2 text-xs text-red-500">{error}</div>
            <button
              className="bg-brand-black flex cursor-pointer items-center justify-center rounded-md p-2 text-white hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={token.length === 0}
              onClick={handleOtpVerify}
            >
              {submitted ? <Loader className="h-4 w-4 animate-spin" /> : 'Verify'}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
