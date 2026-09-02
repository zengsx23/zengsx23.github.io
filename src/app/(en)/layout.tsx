import type { ReactNode } from 'react';
import SiteRootLayout, { buildLocalizedMetadata } from '@/components/layout/SiteRootLayout';
import '../globals.css';

export const metadata = buildLocalizedMetadata('en');

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <SiteRootLayout locale="en">{children}</SiteRootLayout>;
}
