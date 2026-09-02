import type { ReactNode } from 'react';
import SiteRootLayout, { buildLocalizedMetadata } from '@/components/layout/SiteRootLayout';
import '../globals.css';

export const metadata = buildLocalizedMetadata('zh');

export default function ChineseRootLayout({ children }: { children: ReactNode }) {
  return <SiteRootLayout locale="zh">{children}</SiteRootLayout>;
}
