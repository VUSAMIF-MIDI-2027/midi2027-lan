import type { ReactNode } from 'react'
import { useLang } from '../i18n/LanguageContext'

type ContactCard = {
  title: string
  body: string
  href: string
  linkLabel: string
  icon: ReactNode
  featured?: boolean
  brand?: 'instagram' | 'facebook' | 'x' | 'tiktok' | 'discord'
}

const iconProps = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} as const

export default function ContactPage() {
  const tr = useLang()

  const cards: ContactCard[] = [
    {
      title: tr.contactGeneralTitle,
      body: tr.contactGeneralBody,
      href: 'mailto:lan@midi.lt',
      linkLabel: 'lan@midi.lt',
      icon: (
        <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      ),
    },
    {
      title: tr.contactMarketingTitle,
      body: tr.contactMarketingBody,
      href: 'mailto:lan.marketingas@midi.lt',
      linkLabel: 'lan.marketingas@midi.lt',
      featured: true,
      icon: (
        <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 14V9l13-5v15L4 14Z" />
          <path d="M8 15v4H5v-5" />
          <path d="M19 8v7" />
        </svg>
      ),
    },
    {
      title: 'Instagram',
      body: tr.contactInstagramBody,
      href: 'https://www.instagram.com/midi.lt/',
      linkLabel: '@midi.lt',
      brand: 'instagram',
      icon: (
        <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      title: 'Facebook',
      body: tr.contactFacebookBody,
      href: 'https://www.facebook.com/midi.lt',
      linkLabel: 'MIDI',
      brand: 'facebook',
      icon: (
        <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3" />
        </svg>
      ),
    },
    {
      title: 'X',
      body: tr.contactXBody,
      href: 'https://x.com/MIDI_LAN',
      linkLabel: '@MIDI_LAN',
      brand: 'x',
      icon: (
        <svg {...iconProps} fill="currentColor">
          <path d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.2h-6.7l-5.2-6.8-6 6.8H1.7l7.7-8.8-8.2-10.6h6.8l4.7 6.2 5.5-6.2Zm-1.1 17.5h1.8L7.1 4.1H5.1l12 15.7Z" />
        </svg>
      ),
    },
    {
      title: 'TikTok',
      body: tr.contactTikTokBody,
      href: 'https://www.tiktok.com/@midi.lt',
      linkLabel: '@midi.lt',
      brand: 'tiktok',
      icon: (
        <svg {...iconProps} fill="currentColor">
          <path d="M14 3v10.2a4.6 4.6 0 1 1-4-4.6v3a1.8 1.8 0 1 0 1.2 1.6V3H14Zm0 0c.4 2.2 1.7 3.5 4 3.8v2.9c-1.7-.1-3-.6-4-1.5V3Z" />
        </svg>
      ),
    },
    {
      title: 'Discord',
      body: tr.contactDiscordBody,
      href: 'https://discord.gg/hXGMH8nXjH',
      linkLabel: tr.discordCta,
      brand: 'discord',
      icon: (
        <svg {...iconProps} fill="currentColor">
          <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3c-.2.4-.4.9-.6 1.2a18.3 18.3 0 0 0-5.5 0A12.6 12.6 0 0 0 8.7 3a19.7 19.7 0 0 0-4.9 1.4C.7 9 .2 13.5.6 18a19.9 19.9 0 0 0 6 3c.5-.6.9-1.3 1.2-2a12.7 12.7 0 0 1-1.9-.9l.4-.3a13.9 13.9 0 0 0 11.5 0l.4.3c-.6.4-1.2.7-1.9.9.4.7.8 1.4 1.2 2a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.5-13.7ZM8.4 15.3c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm7.2 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="contact-page">
      <div className="contact-page-wrap">
        <header className="contact-page-hero">
          <span>{tr.contactPageEyebrow}</span>
          <h1>{tr.contactPageHeading}</h1>
          <p>{tr.contactPageAbout}</p>
        </header>

        {[
          { className: 'contact-directory contact-directory--email', group: cards.filter(card => card.href.startsWith('mailto:')) },
          { className: 'contact-directory', group: cards.filter(card => !card.href.startsWith('mailto:')) },
        ].map(({ className, group }) => (
          <div key={className} className={className}>
            {group.map((card) => {
              const external = card.href.startsWith('http')
              return (
                <a
                  className={[
                    'contact-directory-card',
                    card.featured ? 'contact-directory-card--featured' : '',
                    card.brand ? `contact-directory-card--${card.brand}` : '',
                  ].filter(Boolean).join(' ')}
                  href={card.href}
                  key={card.title}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                >
                  <span className="contact-directory-icon">{card.icon}</span>
                  <span className="contact-directory-copy">
                    <strong>{card.title}</strong>
                    <span>{card.body}</span>
                  </span>
                  <span className="contact-directory-link">
                    {card.linkLabel}
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
