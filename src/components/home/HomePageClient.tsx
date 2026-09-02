'use client';

import About from '@/components/home/About';
import News, { type NewsItem } from '@/components/home/News';
import Profile from '@/components/home/Profile';
import CardPage from '@/components/pages/CardPage';
import TextPage from '@/components/pages/TextPage';
import type { SiteConfig } from '@/lib/config';
import type { CardPageConfig, TextPageConfig } from '@/types/page';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'list';
  title?: string;
  content?: string;
  items?: NewsItem[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  pagesToShow: PageData[];
}

interface HomePageClientProps {
  data: HomePageLocaleData;
  locale: string;
}

export default function HomePageClient({ data, locale }: HomePageClientProps) {
  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-background px-5 py-12 sm:px-8 lg:px-8 lg:py-14">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-3 lg:gap-12">
        <aside className="lg:col-span-1">
          <Profile author={data.author} social={data.social} locale={locale} />
        </aside>

        <div className="space-y-14 lg:col-span-2">
          {data.pagesToShow.map((page) => (
            <section key={page.id} id={page.id} className="scroll-mt-28 space-y-8">
              {page.type === 'about' && page.sections.map((section) => {
                if (section.type === 'markdown') {
                  return <About key={section.id} content={section.content || ''} title={section.title} />;
                }

                return <News key={section.id} items={section.items || []} title={section.title} />;
              })}
              {page.type === 'text' && (
                <TextPage config={page.config} content={page.content} embedded />
              )}
              {page.type === 'card' && <CardPage config={page.config} embedded locale={locale} />}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
