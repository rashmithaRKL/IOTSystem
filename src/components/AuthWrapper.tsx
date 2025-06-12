'use client';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = ['/login'].includes(pathname);

  return (
    <>
      {!isPublicRoute && <Navigation />}
      {children}
    </>
  );
}
