import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rachael's World Cup 2026",
    short_name: 'WC 2026',
    description: 'Family bracket challenge for FIFA World Cup 2026.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1020',
    theme_color: '#0B1020',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
