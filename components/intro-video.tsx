'use client';

import { useEffect, useRef, useState } from 'react';

const poster = '/evoflux-intro-poster.png';

export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let playTimer = 0;
    const playWhenReady = () => {
      window.clearTimeout(playTimer);
      if (motionPreference.matches) {
        video.pause();
        setPlaying(false);
        return;
      }
      playTimer = window.setTimeout(() => {
        void video.play().catch(() => setPlaying(false));
      }, 1800);
    };
    const handleMotionPreference = () => playWhenReady();
    const handlePlaying = () => setPlaying(true);

    video.addEventListener('playing', handlePlaying);
    motionPreference.addEventListener('change', handleMotionPreference);
    playWhenReady();

    return () => {
      window.clearTimeout(playTimer);
      video.removeEventListener('playing', handlePlaying);
      motionPreference.removeEventListener('change', handleMotionPreference);
      video.pause();
    };
  }, []);

  return (
    <div className={`mimo-video-stage${playing ? ' is-playing' : ''}`}>
      <video ref={videoRef} loop muted playsInline preload="auto" poster={poster} aria-label="EvoFlux product introduction">
        <source src="/evoflux-intro.mp4" type="video/mp4" />
      </video>
      <img className="mimo-video-poster" src={poster} alt="EvoFlux desktop workspace overview" />
    </div>
  );
}
