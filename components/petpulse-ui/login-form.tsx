'use client';
import { createClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const supabase = createClient();

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [open, setOpen] = useState(false);

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const isEmailValid = email.length > 0 && emailPattern.test(email);

  const canSubmit = isEmailValid;

  const isMobile = window.innerWidth < 768;

  const handleSignIn = async () => {
    setSubmitted(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setSubmitted(false);
      return;
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) setIsAuthenticated(true);
    });
  }, []);

  if (isMobile) {
    return (
      <Drawer direction="top" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div className="border-border text-foreground hover:bg-accent hover:text-accent-foreground rounded-full border px-4 py-1.5 text-sm font-medium transition-colors">
            Login
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Login</DrawerTitle>
          </DrawerHeader>
          <div className="mx-8 mb-8 flex flex-col">
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
              onKeyDown={(e) => e.key === 'Enter' && canSubmit && handleSignIn()}
              className={cn(
                'bg-input-bg-alpha border-input-border-alpha focus-visible:border-tint my-2 mb-4 rounded-md border p-1'
              )}
            />
            {error && (
              <div className="mb-2 flex flex-row gap-2 text-xs text-red-500">
                <Info className="h-4 w-4" />
                {error}
              </div>
            )}

            <button
              className="bg-brand-black mt-2 flex cursor-pointer items-center justify-center rounded-md p-2 text-white hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!canSubmit}
              onClick={handleSignIn}
            >
              {submitted ? <Loader className="h-4 w-4 animate-spin" /> : 'Login'}
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border-border text-foreground hover:bg-accent hover:text-accent-foreground rounded-full border px-4 py-1.5 text-sm font-medium transition-colors">
          Login
        </button>
      </DialogTrigger>
      <DialogContent className="bg-background/95">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
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
            onKeyDown={(e) => e.key === 'Enter' && canSubmit && handleSignIn()}
            className={cn(
              'bg-input-bg-alpha border-input-border-alpha focus-visible:border-tint my-2 mb-4 rounded-md border p-1'
            )}
          />
          {error && (
            <div className="mb-2 flex flex-row gap-2 text-xs text-red-500">
              <Info className="h-4 w-4" />
              {error}
            </div>
          )}

          <button
            className="bg-brand-black mt-2 flex cursor-pointer items-center justify-center rounded-md p-2 text-white hover:opacity-80 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canSubmit}
            onClick={handleSignIn}
          >
            {submitted ? <Loader className="h-4 w-4 animate-spin" /> : 'Login'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
