import type { Metadata, Viewport } from 'next';

import { absoluteUrl, OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/seo';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: SITE_TITLE, template: '%s | Evo Harness' },
  description: SITE_DESCRIPTION,
  keywords: [
    'Evo Harness',
    'local-first AI agent',
    'AI agent desktop app',
    'open-source AI agents',
    'AI coding workspace',
    'subagents',
    'MCP connectors',
    'Agent Skills',
    'models.dev',
    'WebBridge',
  ],
  authors: [{ name: 'evoelsewhere', url: SITE_URL }],
  creator: 'evoelsewhere',
  publisher: 'evoelsewhere',
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
  manifest: '/manifest.webmanifest',
  icons: { icon: '/evo.svg', apple: '/evo-icon.png' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { type: 'website', locale: 'en_US', title: SITE_TITLE, description: SITE_DESCRIPTION, url: SITE_URL, siteName: SITE_NAME, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE.url] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'evoelsewhere',
      url: SITE_URL,
      logo: absoluteUrl('/evo-icon.png'),
      sameAs: ['https://github.com/evoelsewhere'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#evo-harness`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: absoluteUrl(OG_IMAGE.url),
      downloadUrl: 'https://github.com/evoelsewhere/evo-harness/releases',
      softwareVersion: '4.0.0',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Windows, Linux',
      author: { '@id': `${SITE_URL}/#organization` },
      license: 'https://www.apache.org/licenses/LICENSE-2.0',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'One engine process per chat',
        'Any model, with model data from models.dev',
        'Subagents and Git worktrees',
        'Files, terminal, browser and git beside the chat',
        'Agent Skills, MCP connectors, hooks and plugins',
        'Permission prompts, sandbox and project trust',
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/geist-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
        {children}
      </body>
    </html>
  );
}
