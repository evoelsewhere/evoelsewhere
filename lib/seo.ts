export const SITE_URL = 'https://evoelsewhere.asia';

export const SITE_NAME = 'evoelsewhere';

export const SITE_DESCRIPTION = 'EvoFlux is an open-source, local-first desktop workspace for AI agent teams. Coordinate specialized agents, control tools and models, and verify delivery with evidence.';

export const OG_IMAGE = {
  url: '/og.png',
  width: 1929,
  height: 1173,
  alt: 'EvoFlux desktop workspace with coding agents, tools, and an EASD workflow',
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}
