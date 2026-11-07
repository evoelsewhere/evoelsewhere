import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Evo Harness',
    short_name: 'Evo Harness',
    description: 'An open-source, local-first desktop workspace for AI agents.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#fafafa',
    icons: [
      {
        src: '/evo-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
