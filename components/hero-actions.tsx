'use client';

import { useEffect, useState } from 'react';
import { FaApple, FaGithub, FaLinux, FaWindows } from 'react-icons/fa';
import { FiArrowDown, FiArrowUpRight, FiMonitor } from 'react-icons/fi';

type Platform = 'mac' | 'windows' | 'linux' | null;

const platformDetails = {
  mac: { label: 'macOS', icon: FaApple },
  windows: { label: 'Windows', icon: FaWindows },
  linux: { label: 'Linux', icon: FaLinux },
};

export function HeroActions() {
  const [platform, setPlatform] = useState<Platform>(null);

  useEffect(() => {
    const value = `${navigator.platform} ${navigator.userAgent}`.toLowerCase();
    if (value.includes('mac')) setPlatform('mac');
    else if (value.includes('win')) setPlatform('windows');
    else if (value.includes('linux')) setPlatform('linux');
  }, []);

  const details = platform ? platformDetails[platform] : null;
  const PlatformIcon = details?.icon ?? FiMonitor;

  return (
    <div className="hero-actions" role="group" aria-label="Get EvoFlux">
      <a className="hero-platform-action" href="#download" aria-label={details ? `Download EvoFlux for ${details.label}` : 'Choose a platform to download EvoFlux'}>
        <span className={`hero-os-icon ${platform ?? 'generic'}`} aria-hidden="true"><PlatformIcon /></span>
        <span className="hero-action-copy" aria-live="polite">
          <small>{details ? 'Download for' : 'Download EvoFlux'}</small>
          <strong>{details?.label ?? 'Choose your platform'}</strong>
        </span>
        <span className="hero-action-arrow" aria-hidden="true"><FiArrowDown /></span>
      </a>
      <a className="hero-source-action" href="https://github.com/evoelsewhere/evoflux" aria-label="Explore EvoFlux source code on GitHub">
        <FaGithub aria-hidden="true" />
        <span className="hero-source-label">Source code</span>
        <FiArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}
