'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaApple, FaLinux, FaWindows } from 'react-icons/fa';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';

type Platform = 'mac' | 'windows' | 'linux' | null;

type ReleaseAsset = { name: string; browser_download_url: string; size: number };
type GithubRelease = { tag_name: string; html_url: string; draft?: boolean; prerelease?: boolean; assets: ReleaseAsset[] };

const REPO = 'evoelsewhere/evo-harness';
const releasesUrl = `https://github.com/${REPO}/releases`;
const releasesApi = `https://api.github.com/repos/${REPO}/releases?per_page=20`;
/** Releases before 4.0 are the earlier product and are not offered here. */
const FIRST_MAJOR = 4;
const trustedDownloadPrefix = `${releasesUrl}/download/`;

function isGithubRelease(value: unknown): value is GithubRelease {
  if (!value || typeof value !== 'object') return false;
  const release = value as Partial<GithubRelease>;
  return (
    typeof release.tag_name === 'string' &&
    typeof release.html_url === 'string' &&
    release.html_url.startsWith(`${releasesUrl}/tag/`) &&
    Array.isArray(release.assets) &&
    release.assets.every((asset) => asset && typeof asset.name === 'string' && typeof asset.browser_download_url === 'string' && typeof asset.size === 'number')
  );
}

function findAsset(assets: ReleaseAsset[], pattern: RegExp) {
  return assets.find((asset) => pattern.test(asset.name) && asset.browser_download_url.startsWith(trustedDownloadPrefix));
}

function size(bytes?: number) {
  return bytes ? ` · ${Math.round(bytes / 1024 / 1024)} MB` : '';
}

function detectPlatform(): Platform {
  const value = `${navigator.platform} ${navigator.userAgent}`.toLowerCase();
  if (value.includes('mac')) return 'mac';
  if (value.includes('win')) return 'windows';
  if (value.includes('linux')) return 'linux';
  return null;
}

/** The latest release's installers, straight from GitHub Releases. */
function useLatestRelease() {
  const [release, setRelease] = useState<GithubRelease | null>(null);
  const [platform, setPlatform] = useState<Platform>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => setPlatform(detectPlatform()), 0);
    const controller = new AbortController();
    fetch(releasesApi, { headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((value: unknown) => {
        if (!Array.isArray(value)) return;
        const latest = value.find(
          (item): item is GithubRelease =>
            isGithubRelease(item) && !item.draft && !item.prerelease && Number(/^v?(\d+)/.exec(item.tag_name)?.[1] ?? 0) >= FIRST_MAJOR,
        );
        if (latest) setRelease(latest);
      })
      .catch(() => undefined);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  const assets = useMemo(() => {
    const list = release?.assets ?? [];
    return {
      macArm: findAsset(list, /(aarch64|arm64).*\.dmg$/i),
      macIntel: findAsset(list, /(x64|x86_64|intel).*\.dmg$/i),
      windows: findAsset(list, /(x64|x86_64|amd64).*(setup\.exe|\.msi)$/i),
      linux: findAsset(list, /(amd64|x86_64).*\.deb$/i),
    };
  }, [release]);

  return { release, platform, assets };
}

function AssetLink({ asset, label }: { asset?: ReleaseAsset; label: string }) {
  if (!asset) return <a className="dl-link" href={releasesUrl}>{label} <FiArrowUpRight /></a>;
  return <a className="dl-link" href={asset.browser_download_url}>{label}{size(asset.size)} <FiArrowDown /></a>;
}

/** The hero's main button: the installer for this computer when there is one. */
export function DownloadButton() {
  const { platform, assets } = useLatestRelease();
  const asset = platform === 'mac' ? assets.macArm : platform === 'windows' ? assets.windows : platform === 'linux' ? assets.linux : undefined;
  const name = platform === 'mac' ? 'macOS' : platform === 'windows' ? 'Windows' : platform === 'linux' ? 'Linux' : null;
  return (
    <a className="btn btn-primary btn-lg" href={asset?.browser_download_url ?? '#download'}>
      <FiArrowDown /> {name ? `Download for ${name}` : 'Download'}
    </a>
  );
}

export function DownloadPanel() {
  const { release, platform, assets } = useLatestRelease();
  const cards = [
    { id: 'mac', icon: <FaApple />, name: 'macOS', kind: 'DMG', links: [<AssetLink key="a" asset={assets.macArm} label="Apple silicon" />, <AssetLink key="i" asset={assets.macIntel} label="Intel" />] },
    { id: 'windows', icon: <FaWindows />, name: 'Windows', kind: 'Installer', links: [<AssetLink key="w" asset={assets.windows} label="Windows x64" />] },
    { id: 'linux', icon: <FaLinux />, name: 'Linux', kind: 'DEB', links: [<AssetLink key="l" asset={assets.linux} label="Ubuntu / Debian x64" />] },
  ];
  return (
    <div className="dl">
      <div className="dl-head">
        <span className="eyebrow">{release ? `Evo Harness ${release.tag_name}` : 'GitHub Releases'}</span>
        <a href={release?.html_url ?? releasesUrl}>Release notes <FiArrowUpRight /></a>
      </div>
      <div className="dl-grid">
        {cards.map((card) => (
          <article key={card.id} className={`dl-card ${platform === card.id ? 'is-mine' : ''}`}>
            <div className="dl-card-title">
              <span className="dl-icon" aria-hidden="true">{card.icon}</span>
              <div><strong>{card.name}</strong><small>{card.kind}{platform === card.id ? ' · this computer' : ''}</small></div>
            </div>
            <div className="dl-links">{card.links}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
