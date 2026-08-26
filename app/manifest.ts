import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EvoFlux — evoelsewhere',
    short_name: 'EvoFlux',
    description: 'A local-first desktop workspace for AI agent teams.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f7f3',
    theme_color: '#f8f7f3',
    icons: [
      {
        src: '/evoflux-app-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
