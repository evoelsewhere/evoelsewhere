import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/evo-agent-specification-driven-development'),
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/privacy'),
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}
