'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Check, Copy, Github } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import type { SiteConfig } from '@/lib/config';
import { getMessages } from '@/lib/i18n/messages';

type ProfileLinkIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface ProfileLink {
  name: string;
  value: string;
  href?: string;
  icon: ProfileLinkIcon;
  external?: boolean;
  copiesOnClick?: boolean;
}

function WechatIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.1 3.5C4.63 3.5 1 6.55 1 10.31c0 2.09 1.14 3.98 3.03 5.27l-.77 2.56 2.92-1.4c.93.25 1.91.38 2.92.38.3 0 .6-.01.89-.04a6.42 6.42 0 0 1-.5-2.46c0-3.66 3.38-6.64 7.53-6.64.18 0 .36.01.54.02C16.35 5.37 13.14 3.5 9.1 3.5Zm-2.76 5.1a1.03 1.03 0 1 1 0-2.06 1.03 1.03 0 0 1 0 2.06Zm5.52 0a1.03 1.03 0 1 1 0-2.06 1.03 1.03 0 0 1 0 2.06Z" />
      <path d="M23 14.62c0-3.09-2.68-5.6-5.98-5.6-3.3 0-5.98 2.51-5.98 5.6s2.68 5.6 5.98 5.6c.78 0 1.53-.14 2.22-.4l2.27 1.08-.61-2.04c1.31-1.03 2.1-2.54 2.1-4.24Zm-7.96-1.03a.86.86 0 1 1 0-1.72.86.86 0 0 1 0 1.72Zm3.97 0a.86.86 0 1 1 0-1.72.86.86 0 0 1 0 1.72Z" />
    </svg>
  );
}

interface ProfileProps {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  locale: string;
}

export default function Profile({ author, social, locale }: ProfileProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const messages = getMessages(locale);

  const profileLinks: ProfileLink[] = [
    ...(social.github ? [{
      name: messages.profile.github,
      value: social.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: social.github,
      icon: Github,
      external: true,
    }] : []),
    ...(social.email ? [{
      name: messages.profile.email,
      value: social.email,
      href: `mailto:${social.email}`,
      icon: EnvelopeIcon,
    }] : []),
    ...(social.phone ? [{
      name: messages.profile.phone,
      value: social.phone,
      href: `tel:${social.phone}`,
      icon: PhoneIcon,
    }] : []),
    ...(social.wechat ? [{
      name: messages.profile.wechat,
      value: social.wechat,
      icon: WechatIcon,
      copiesOnClick: true,
    }] : []),
  ];

  async function copyValue(profileLink: ProfileLink) {
    await navigator.clipboard.writeText(profileLink.value);
    setCopied(profileLink.name);
    window.setTimeout(() => setCopied((current) => current === profileLink.name ? null : current), 1600);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="flex flex-col items-center text-center lg:sticky lg:top-28"
    >
      <div className="mb-8 h-64 w-64 overflow-hidden rounded-2xl shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800">
        <Image
          src={author.avatar}
          alt={locale === 'zh' ? `${author.name}头像` : `Portrait of ${author.name}${author.name_zh ? ` (${author.name_zh})` : ''}`}
          width={256}
          height={256}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold leading-none tracking-[-0.02em] text-primary font-serif">
          {author.name}
        </h1>
        {author.name_zh && (
          <p className="mt-2 text-xl font-medium tracking-[0.08em] text-accent font-serif">
            {author.name_zh}
          </p>
        )}
        <div className="mt-6 space-y-1.5 text-[0.98rem] leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>{author.title}</p>
          {author.degree && <p>{author.degree}</p>}
        </div>
        <p className="mt-4 text-[0.98rem] font-semibold text-accent">
          {author.institution}
        </p>
      </div>

      <div className="mt-7 flex justify-center gap-3" aria-label={messages.profile.linksLabel}>
        {profileLinks.map((profileLink) => {
          const Icon = profileLink.icon;
          const isCopied = copied === profileLink.name;
          const triggerClassName = "flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-background text-neutral-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-neutral-700 dark:text-neutral-400";

          return (
            <div key={profileLink.name} className="group relative">
              {profileLink.copiesOnClick ? (
                <button
                  type="button"
                  onClick={() => copyValue(profileLink)}
                  aria-label={`${messages.profile.copy} ${profileLink.name}: ${profileLink.value}`}
                  className={triggerClassName}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </button>
              ) : (
                <a
                  href={profileLink.href}
                  target={profileLink.external ? '_blank' : undefined}
                  rel={profileLink.external ? 'noopener noreferrer' : undefined}
                  aria-label={`${profileLink.name}: ${profileLink.value}`}
                  className={triggerClassName}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              )}

              <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-1 rounded-lg bg-neutral-900 px-3 py-2 text-left text-xs text-white opacity-0 shadow-xl transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <p className="mb-1 font-semibold">{profileLink.name}</p>
                <div className="flex items-center gap-2">
                  <span className="max-w-64 break-all text-neutral-300">{profileLink.value}</span>
                  <button
                    type="button"
                    onClick={() => copyValue(profileLink)}
                    className="pointer-events-auto inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 font-medium transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`${messages.profile.copy} ${profileLink.name}`}
                  >
                    {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {isCopied ? messages.profile.copied : messages.profile.copy}
                  </button>
                </div>
                <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
              </div>
            </div>
          );
        })}
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? `${copied} ${messages.profile.copied}` : ''}
      </span>
    </motion.div>
  );
}
