'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Check, Copy, Github } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import type { SiteConfig } from '@/lib/config';

type ContactIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface ContactLink {
  name: string;
  value: string;
  href: string;
  icon: ContactIcon;
  external?: boolean;
}

interface ProfileProps {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
}

export default function Profile({ author, social }: ProfileProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const contacts: ContactLink[] = [
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
    ...(social.github ? [{
      name: 'GitHub',
      value: social.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: social.github,
      icon: Github,
      external: true,
    }] : []),
  ];

  async function copyValue(contact: ContactLink) {
    await navigator.clipboard.writeText(contact.value);
    setCopied(contact.name);
    window.setTimeout(() => setCopied((current) => current === contact.name ? null : current), 1600);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="lg:sticky lg:top-28"
    >
      <div className="mx-auto mb-7 h-64 w-64 overflow-hidden rounded-2xl shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800 lg:mx-0">
        <Image
          src={author.avatar}
          alt={`Portrait of ${author.name}`}
          width={256}
          height={256}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <div className="text-center lg:text-left">
        <h1 className="mb-3 text-2xl font-bold leading-tight text-primary font-serif">
          {author.name}
        </h1>
        <p className="mb-1 text-[0.98rem] font-medium leading-relaxed text-accent">
          {author.title}
        </p>
        <p className="text-[0.95rem] text-neutral-600">{author.institution}</p>
      </div>

      <div className="mt-6 flex justify-center gap-2 lg:justify-start" aria-label="Contact links">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          const isCopied = copied === contact.name;

          return (
            <div key={contact.name} className="group relative">
              <a
                href={contact.href}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noopener noreferrer' : undefined}
                aria-label={`${contact.name}: ${contact.value}`}
                className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>

              <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-1 rounded-lg bg-neutral-900 px-3 py-2 text-left text-xs text-white opacity-0 shadow-xl transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <p className="mb-1 font-semibold">{contact.name}</p>
                <div className="flex items-center gap-2">
                  <span className="max-w-64 break-all text-neutral-300">{contact.value}</span>
                  <button
                    type="button"
                    onClick={() => copyValue(contact)}
                    className="pointer-events-auto inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 font-medium transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Copy ${contact.name}`}
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
