import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { LocaleProvider } from '@/components/ui/LocaleProvider';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { getConfig } from '@/lib/config';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';

const SITE_URL = 'https://zengsx23.github.io';

export type SiteLocale = 'zh' | 'en';

export function buildLocalizedMetadata(locale: SiteLocale): Metadata {
  const config = getConfig(locale);
  const isChinese = locale === 'zh';
  const englishConfig = getConfig('en');
  const displayName = isChinese
    ? config.author.name
    : `${config.author.name} (${config.author.name_zh})`;
  const canonicalPath = isChinese ? '/' : '/en/';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: displayName,
      template: `%s | ${config.site.title}`,
    },
    description: config.site.description,
    keywords: [
      '曾申翔',
      'Shenxiang Zeng',
      isChinese ? '清华大学' : 'Tsinghua University',
      isChinese ? '土木工程' : 'Civil Engineering',
      'PhysMind',
    ],
    authors: [{ name: displayName, url: new URL(canonicalPath, SITE_URL).toString() }],
    creator: displayName,
    publisher: displayName,
    alternates: {
      canonical: canonicalPath,
      languages: {
        'zh-CN': '/',
        'en-US': '/en/',
        'x-default': '/',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: config.site.favicon,
    },
    openGraph: {
      type: 'website',
      locale: isChinese ? 'zh_CN' : 'en_US',
      alternateLocale: isChinese ? ['en_US'] : ['zh_CN'],
      url: canonicalPath,
      title: displayName,
      description: config.site.description,
      siteName: isChinese ? '曾申翔的个人学术主页' : `${englishConfig.author.name}'s Academic Website`,
      images: [{
        url: config.author.avatar,
        alt: isChinese ? '曾申翔头像' : `${englishConfig.author.name} portrait`,
      }],
    },
    twitter: {
      card: 'summary',
      title: displayName,
      description: config.site.description,
      images: [config.author.avatar],
    },
  };
}

export default function SiteRootLayout({
  children,
  locale,
}: {
  children: ReactNode;
  locale: SiteLocale;
}) {
  const config = getConfig(locale);
  const englishConfig = getConfig('en');
  const baseI18n = getRuntimeI18nConfig(config.i18n);
  const routeI18n = {
    ...baseI18n,
    defaultLocale: locale,
    mode: 'fixed' as const,
    fixedLocale: locale,
    persist: false,
  };
  const canonicalPath = locale === 'zh' ? '/' : '/en/';
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: locale === 'zh' ? '曾申翔' : englishConfig.author.name,
    alternateName: locale === 'zh' ? englishConfig.author.name : '曾申翔',
    url: new URL(canonicalPath, SITE_URL).toString(),
    image: new URL(config.author.avatar, SITE_URL).toString(),
    email: config.social.email,
    telephone: config.social.phone,
    jobTitle: [config.author.title, config.author.degree].filter(Boolean).join(', '),
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: locale === 'zh' ? '清华大学' : 'Tsinghua University',
      url: locale === 'zh' ? 'https://www.tsinghua.edu.cn/' : 'https://www.tsinghua.edu.cn/en/',
    },
    sameAs: [config.social.github].filter(Boolean),
  };

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} data-locale={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme-storage');
                const parsed = theme ? JSON.parse(theme) : null;
                const setting = parsed?.state?.theme || 'system';
                const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const effective = setting === 'dark' ? 'dark' : (setting === 'light' ? 'light' : (prefersDark ? 'dark' : 'light'));
                var root = document.documentElement;
                root.classList.add(effective);
                root.setAttribute('data-theme', effective);
              } catch (e) {
                var root = document.documentElement;
                root.classList.add('light');
                root.setAttribute('data-theme', 'light');
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <ThemeProvider>
          <LocaleProvider config={routeI18n}>
            <Navigation
              items={config.navigation}
              siteTitle={config.site.title}
              enableOnePageMode={config.features.enable_one_page_mode}
              i18n={routeI18n}
              locale={locale}
            />
            <main className="min-h-screen pt-16 lg:pt-20">
              {children}
            </main>
            <Footer lastUpdated={config.site.last_updated} locale={locale} />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
