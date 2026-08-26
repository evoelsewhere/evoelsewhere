import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'EASD Methodology — Evo Elsewhere',
  robots: { index: false, follow: true },
};

export default function EasdRedirect() {
  permanentRedirect('/evo-agent-specification-driven-development');
}
