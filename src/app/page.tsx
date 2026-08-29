import HomePageClient, { type HomePageLocaleData } from '@/components/home/HomePageClient';
import { getConfig } from '@/lib/config';
import { getMarkdownContent, getPageConfig, getTomlContent } from '@/lib/content';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import type { BasePageConfig, CardPageConfig, TextPageConfig } from '@/types/page';
import type { NewsItem } from '@/components/home/News';

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

function processSections(sections: SectionConfig[], locale?: string): SectionConfig[] {
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

function loadPageData(locale?: string): HomePageLocaleData {
  const config = getConfig(locale);
  const aboutConfig = getPageConfig<{ sections?: SectionConfig[] }>('about', locale);
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

  if (!config.features.enable_one_page_mode && aboutConfig) {
    pagesToShow.splice(0, pagesToShow.length, {
      type: 'about',
      id: 'about',
      sections: processSections(aboutConfig.sections || [], locale),
    });
  }

  return {
    author: config.author,
    social: config.social,
    features: config.features,
    pagesToShow,
  };
}

export default function Home() {
  const config = getConfig();
  const i18n = getRuntimeI18nConfig(config.i18n);
  const targetLocales = i18n.enabled ? i18n.locales : [i18n.defaultLocale];
  const dataByLocale: Record<string, HomePageLocaleData> = {};

  for (const locale of targetLocales) {
    dataByLocale[locale] = loadPageData(locale);
  }

  return <HomePageClient dataByLocale={dataByLocale} defaultLocale={i18n.defaultLocale} />;
}
