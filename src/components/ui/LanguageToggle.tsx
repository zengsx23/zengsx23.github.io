import { LanguageIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import type { I18nRuntimeConfig } from '@/types/i18n';

interface LanguageToggleProps {
  i18n: I18nRuntimeConfig;
  currentLocale: string;
  deploymentVersion: string;
}

function localeHref(locale: string): string {
  return locale === 'en' ? '/' : `/${locale}/`;
}

export default function LanguageToggle({ i18n, currentLocale, deploymentVersion }: LanguageToggleProps) {
  if (!i18n.enabled || !i18n.switcher || i18n.locales.length <= 1) {
    return null;
  }

  const resolvedLocale = i18n.locales.includes(currentLocale) ? currentLocale : i18n.defaultLocale;
  const targetLocale = i18n.locales.find((locale) => locale !== resolvedLocale);

  if (!targetLocale) {
    return null;
  }

  const targetLabel = i18n.labels[targetLocale] || targetLocale;
  const targetHref = `${localeHref(targetLocale)}?v=${encodeURIComponent(deploymentVersion)}`;
  const accessibleLabel = resolvedLocale === 'zh' ? `切换至${targetLabel}` : `Switch to ${targetLabel}`;

  return (
    <a
      href={targetHref}
      hrefLang={targetLocale === 'zh' ? 'zh-CN' : targetLocale}
      lang={targetLocale === 'zh' ? 'zh-CN' : targetLocale}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      className={cn(
        'flex h-10 items-center justify-center gap-1.5 rounded-lg px-3',
        'border border-neutral-200 bg-background hover:bg-neutral-50',
        'dark:border-[rgba(148,163,184,0.24)] dark:bg-neutral-800 dark:hover:bg-neutral-700',
        'transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        'text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-white'
      )}
    >
      <LanguageIcon className="h-4 w-4" aria-hidden="true" />
      <span className="text-xs font-medium">{targetLabel}</span>
    </a>
  );
}
