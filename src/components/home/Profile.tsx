'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Check, Copy, Github } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import type { SiteConfig } from '@/lib/config';

type ProfileLinkIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface ProfileLink {
  name: string;
  value: string;
  href: string;
  icon: ProfileLinkIcon;
  external?: boolean;
}

interface ProfileProps {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
}

export default function Profile({ author, social }: ProfileProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const profileLinks: ProfileLink[] = [
    ...(social.github ? [{
      name: 'GitHub',
      value: social.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: social.github,
      icon: Github,
      external: true,
    }] : []),
    ...(social.email ? [{
      name: 'Email',
      value: social.email,
      href: `mailto:${social.email}`,
      icon: EnvelopeIcon,
    }] : []),
    ...(social.phone ? [{
      name: 'Phone',
      value: social.phone,
      href: `tel:${social.phone}`,
      icon: PhoneIcon,
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
      className="lg:sticky lg:top-28"
    >
      <div className="mx-auto mb-8 h-64 w-64 overflow-hidden rounded-2xl shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800 lg:mx-0">
        <Image
          src={author.avatar}
          alt={`Portrait of ${author.name}${author.name_zh ? ` (${author.name_zh})` : ''}`}
          width={256}
          height={256}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <div className="text-center lg:text-left">
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

      <div className="mt-7 flex justify-center gap-3 lg:justify-start" aria-label="Profile links">
        {profileLinks.map((profileLink) => {
          const Icon = profileLink.icon;
          const isCopied = copied === profileLink.name;

          return (
            <div key={profileLink.name} className="group relative">
              <a
                href={profileLink.href}
                target={profileLink.external ? '_blank' : undefined}
                rel={profileLink.external ? 'noopener noreferrer' : undefined}
                aria-label={`${profileLink.name}: ${profileLink.value}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-background text-neutral-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-neutral-700 dark:text-neutral-400"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>

              <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-1 rounded-lg bg-neutral-900 px-3 py-2 text-left text-xs text-white opacity-0 shadow-xl transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <p className="mb-1 font-semibold">{profileLink.name}</p>
                <div className="flex items-center gap-2">
                  <span className="max-w-64 break-all text-neutral-300">{profileLink.value}</span>
                  <button
                    type="button"
                    onClick={() => copyValue(profileLink)}
                    className="pointer-events-auto inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 font-medium transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Copy ${profileLink.name}`}
                  >
                    {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {isCopied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
              </div>
            </div>
          );
        })}
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? `${copied} copied` : ''}
      </span>
    </motion.div>
  );
}
