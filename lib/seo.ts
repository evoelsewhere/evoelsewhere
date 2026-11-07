export const SITE_URL = 'https://evoelsewhere.asia';

export const SITE_NAME = 'Evo Harness';

export const SITE_TITLE = 'Evo Harness — your agents, on your machine';

export const SITE_DESCRIPTION =
  'Evo Harness is an open-source, local-first desktop workspace for AI agents: every chat runs its own engine beside your files, terminal, browser and git, with any model.';

export const OG_IMAGE = {
  url: '/og.png',
  width: 3200,
  height: 1600,
  alt: 'Evo Harness: a chat that added a retry to web_fetch, next to the edited file with its git changes',
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}
