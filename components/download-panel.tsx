'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaApple, FaLinux, FaWindows } from 'react-icons/fa';

type Platform = 'mac' | 'windows' | 'linux' | null;
type ReleaseStatus = 'loading' | 'ready' | 'fallback';

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type GithubRelease = {
  tag_name: string;
  html_url: string;
  assets: ReleaseAsset[];
};

const releasesUrl = 'https://github.com/evoelsewhere/evoflux/releases';
const latestReleaseApi = 'https://api.github.com/repos/evoelsewhere/evoflux/releases/latest';
const trustedDownloadPrefix = 'https://github.com/evoelsewhere/evoflux/releases/download/';

const fallbackRelease: GithubRelease = {
  tag_name: 'v0.0.8',
  html_url: `${releasesUrl}/tag/v0.0.8`,
  assets: [
    { name: 'EvoFlux_0.0.8_aarch64.dmg', browser_download_url: `${releasesUrl}/download/v0.0.8/EvoFlux_0.0.8_aarch64.dmg`, size: 260318641 },
    { name: 'EvoFlux_0.0.8_x64.dmg', browser_download_url: `${releasesUrl}/download/v0.0.8/EvoFlux_0.0.8_x64.dmg`, size: 234778884 },
    { name: 'EvoFlux_0.0.8_x64-setup.exe', browser_download_url: `${releasesUrl}/download/v0.0.8/EvoFlux_0.0.8_x64-setup.exe`, size: 113261767 },
    { name: 'EvoFlux_0.0.8_amd64.deb', browser_download_url: `${releasesUrl}/download/v0.0.8/EvoFlux_0.0.8_amd64.deb`, size: 229649012 },
  ],
};

function isGithubRelease(value: unknown): value is GithubRelease {
  if (!value || typeof value !== 'object') return false;
  const release = value as Partial<GithubRelease>;
  return (
    typeof release.tag_name === 'string' &&
    release.tag_name.length > 0 &&
    typeof release.html_url === 'string' &&
    release.html_url.startsWith(`${releasesUrl}/tag/`) &&
    Array.isArray(release.assets) &&
    release.assets.every((asset) => (
      asset &&
      typeof asset.name === 'string' &&
      typeof asset.browser_download_url === 'string' &&
      typeof asset.size === 'number'
    ))
  );
}

function findAsset(assets: ReleaseAsset[], pattern: RegExp) {
  return assets.find((asset) => (
    pattern.test(asset.name) &&
    asset.browser_download_url.startsWith(trustedDownloadPrefix)
  ));
}

function fileSize(bytes?: number) {
  if (!bytes) return '';
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}

function downloadText(label: string, asset?: ReleaseAsset) {
  const size = fileSize(asset?.size);
  return `${label}${size ? ` · ${size}` : ''} ↓`;
}

function DownloadLink({ asset, children }: { asset?: ReleaseAsset; children: string }) {
  if (!asset) return <a href={releasesUrl}>{children} ↗</a>;
  return <a href={asset.browser_download_url}>{downloadText(children, asset)}</a>;
}

export function DownloadPanel() {
  const [detected, setDetected] = useState<Platform>(null);
  const [release, setRelease] = useState<GithubRelease>(fallbackRelease);
  const [status, setStatus] = useState<ReleaseStatus>('loading');

  useEffect(() => {
    const value = `${navigator.platform} ${navigator.userAgent}`.toLowerCase();
    if (value.includes('mac')) setDetected('mac');
    else if (value.includes('win')) setDetected('windows');
    else if (value.includes('linux')) setDetected('linux');

    const controller = new AbortController();
    fetch(latestReleaseApi, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
        return response.json() as Promise<unknown>;
      })
      .then((value) => {
        if (!isGithubRelease(value)) throw new Error('Invalid GitHub release response');
        setRelease(value);
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setStatus('fallback');
      });

    return () => controller.abort();
  }, []);

  const downloads = useMemo(() => ({
    macArm: findAsset(release.assets, /(?:aarch64|arm64|apple[-_ ]?silicon).*\.dmg$|\.dmg.*(?:aarch64|arm64|apple[-_ ]?silicon)/i),
    macIntel: findAsset(release.assets, /(?:x64|x86_64|intel).*\.dmg$|\.dmg.*(?:x64|x86_64|intel)/i),
    windows: findAsset(release.assets, /(?:x64|x86_64|amd64).*(?:setup\.)?(?:exe|msi)$/i),
    linux: findAsset(release.assets, /(?:x64|x86_64|amd64).*\.deb$|\.deb.*(?:x64|x86_64|amd64)/i),
  }), [release]);

  const platformName = detected === 'mac' ? 'macOS' : detected === 'windows' ? 'Windows' : detected === 'linux' ? 'Linux' : null;
  const releasePage = release.html_url.startsWith(`${releasesUrl}/tag/`) ? release.html_url : releasesUrl;

  return (
    <div className="download-panel">
      <div className="download-panel-head">
        <div>
          <p className="section-tag">EvoFlux {release.tag_name}</p>
          <h3>Choose your platform.</h3>
        </div>
        <div className="release-meta" aria-live="polite">
          <p>{platformName ? `Recommended for ${platformName}` : 'Desktop packages · direct from GitHub Releases'}</p>
          <span className={`release-status ${status}`}>
            {status === 'loading' ? 'Checking latest release…' : status === 'ready' ? 'Latest stable release' : `Showing ${fallbackRelease.tag_name} · refresh unavailable`}
          </span>
        </div>
      </div>

      <div className="platform-grid">
        <article className={detected === 'mac' ? 'platform-card recommended' : 'platform-card'}>
          <div className="platform-card-title"><span className="platform-symbol platform-apple" aria-hidden="true"><FaApple /></span><div><strong>macOS</strong><small>DMG installer</small></div></div>
          <div className="platform-actions">
            <DownloadLink asset={downloads.macArm}>Apple silicon</DownloadLink>
            <DownloadLink asset={downloads.macIntel}>Intel</DownloadLink>
          </div>
        </article>
        <article className={detected === 'windows' ? 'platform-card recommended' : 'platform-card'}>
          <div className="platform-card-title"><span className="platform-symbol platform-windows" aria-hidden="true"><FaWindows /></span><div><strong>Windows</strong><small>x64 · EXE setup</small></div></div>
          <div className="platform-actions"><DownloadLink asset={downloads.windows}>Download installer</DownloadLink></div>
        </article>
        <article className={detected === 'linux' ? 'platform-card recommended' : 'platform-card'}>
          <div className="platform-card-title"><span className="platform-symbol platform-linux" aria-hidden="true"><FaLinux /></span><div><strong>Linux</strong><small>x64 · DEB package</small></div></div>
          <div className="platform-actions"><DownloadLink asset={downloads.linux}>Download package</DownloadLink></div>
        </article>
      </div>

      <div className="download-foot"><span>Apache-2.0 licensed · release data from GitHub</span><a href={releasePage}>Checksums and release notes ↗</a></div>
    </div>
  );
}
