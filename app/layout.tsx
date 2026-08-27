import type { Metadata } from 'next';

import { ReleaseAnnouncement } from '@/components/release-announcement';
import { absoluteUrl, OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'EvoFlux',
  title: {
    default: 'EvoFlux — Local-first AI agent workspace',
    template: '%s | EvoFlux',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'EvoFlux',
    'local-first AI agent',
    'AI agent desktop app',
    'open-source AI agents',
    'multi-agent coding',
    'AI coding workspace',
    'agent specification-driven development',
    'EASD methodology',
    'Evo Conductor',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
  manifest: '/manifest.webmanifest',
  icons: { icon: '/evoflux-app-icon.png', apple: '/evoflux-app-icon.png' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'EvoFlux — Local-first AI agent workspace',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EvoFlux — Local-first AI agent workspace',
    description: SITE_DESCRIPTION,
    images: ['/og.png'],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl('/evoflux-app-icon.png'),
      sameAs: ['https://github.com/evoelsewhere'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: 'EvoFlux',
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#evoflux`,
      name: 'EvoFlux',
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: absoluteUrl('/og.png'),
      downloadUrl: `${SITE_URL}/#download`,
      softwareVersion: '1.0.0',
      releaseNotes: 'https://github.com/evoelsewhere/evoflux/releases/tag/v1.0.0',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Windows, Linux',
      author: { '@id': `${SITE_URL}/#organization` },
      license: 'https://www.apache.org/licenses/LICENSE-2.0',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Local-first AI agent workspace',
        'Work and coding agent teams',
        'Multiple model providers',
        'Sandbox and outbound data controls',
        'Evidence-based EASD verification',
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <ReleaseAnnouncement />
        {children}
      </body>
    </html>
  );
}
