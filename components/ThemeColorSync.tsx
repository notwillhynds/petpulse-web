'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }

    meta.content = resolvedTheme === 'dark' ? '#091a2a' : '#ffffff';
  }, [resolvedTheme]);

  return null;
}
