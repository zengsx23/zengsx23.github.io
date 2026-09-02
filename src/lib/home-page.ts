import type { NewsItem } from '@/components/home/News';
import type { HomePageLocaleData } from '@/components/home/HomePageClient';
import { getConfig } from '@/lib/config';
import { getMarkdownContent, getPageConfig, getTomlContent } from '@/lib/content';
import type { BasePageConfig, CardPageConfig, TextPageConfig } from '@/types/page';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'list';
  title?: string;
  source?: string;
  content?: string;
  items?: NewsItem[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

function processSections(sections: SectionConfig[], locale: string): SectionConfig[] {
  return sections.map((section) => {
    if (section.type === 'markdown') {
      return {
        ...section,
        content: section.source ? getMarkdownContent(section.source, locale) : '',
      };
    }

    const newsData = section.source
      ? getTomlContent<{ news: NewsItem[] }>(section.source, locale)
      : null;

    return {
      ...section,
      items: newsData?.news || [],
    };
  });
}

export function loadHomePageData(locale: string): HomePageLocaleData {
  const config = getConfig(locale);
  const pagesToShow: PageData[] = config.navigation
    .filter((item) => item.type === 'page')
    .map((item) => {
      const rawConfig = getPageConfig(item.target, locale);
      if (!rawConfig) return null;

      const pageConfig = rawConfig as BasePageConfig;

      if (pageConfig.type === 'about') {
        return {
          type: 'about',
          id: item.target,
          sections: processSections(
            (rawConfig as { sections?: SectionConfig[] }).sections || [],
            locale,
          ),
        } as PageData;
      }

      if (pageConfig.type === 'text') {
        const textConfig = pageConfig as TextPageConfig;
        return {
          type: 'text',
          id: item.target,
          config: textConfig,
          content: getMarkdownContent(textConfig.source, locale),
        } as PageData;
      }

      if (pageConfig.type === 'card') {
        return {
          type: 'card',
          id: item.target,
          config: pageConfig as CardPageConfig,
        } as PageData;
      }

      return null;
    })
    .filter((page): page is PageData => page !== null);

  return {
    author: config.author,
    social: config.social,
    features: config.features,
    pagesToShow,
  };
}
