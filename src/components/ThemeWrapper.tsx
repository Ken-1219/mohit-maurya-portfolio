'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ThemeWrapper = ({ children, className = '' }: ThemeWrapperProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={className} suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return (
    <div className={className} data-theme={resolvedTheme}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
