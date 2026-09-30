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
      url: absoluteUrl('/privacy'),
      lastModified: new Date('2026-08-26'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}
