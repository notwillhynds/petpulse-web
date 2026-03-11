'use client';

import { useRef } from 'react';

export default function About() {
  const loginTriggerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full flex-row items-center justify-center px-6 py-16 sm:px-16"></main>
    </div>
  );
}
