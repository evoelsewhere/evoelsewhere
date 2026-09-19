import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowDown, FiArrowUpRight, FiCheck, FiChevronRight, FiGithub, FiLock } from 'react-icons/fi';

import { MissionComposer } from '@/components/mission-composer';
import { MissionLab } from '@/components/mission-lab';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'EvoFlux — Make the work visible' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'EvoFlux — Make the work visible',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EvoFlux — Make the work visible',
    description: SITE_DESCRIPTION,
    images: ['/og.png'],
  },
};

const signalItems = ['briefs', 'specialists', 'browser work', 'coding', 'memory', 'evidence', 'handoffs'];

const workspacePoints = [
  ['Work mode', 'Research, documents, data, scheduling, and browser tasks.'],
  ['Coding mode', 'Repository context, terminal, Git, language servers, and EASD.'],
  ['Agent teams', 'One lead with specialists that have a clear role and boundary.'],
  ['Any model', 'Hosted, routed, subscription, cloud, or local providers.'],
];

const principles = [
  ['Local by default', 'Your project files, sessions, memory, and telemetry stay on your machine unless you choose a connection.'],
  ['Explicit boundaries', 'Filesystem, process, browser, and outbound access are visible controls — not invisible assumptions.'],
  ['Evidence over vibes', 'A result is only ready when its acceptance criteria have the evidence to support it.'],
];

export default function Home() {
  return (
    <main className="evo-home">
      <SiteHeader />

      <section className="evo-hero shell">
        <div className="evo-hero-meta">
          <span><i /> Local-first agent workspace</span>
          <span>01 / INTRO</span>
        </div>
        <div className="evo-hero-content">
          <div className="evo-hero-copy">
            <p className="evo-hero-kicker">A local-first system for work that won’t stay small.</p>
            <h1>Make the work <em>visible.</em><br />Then make it move.</h1>
            <p className="evo-hero-lede">EvoFlux turns a messy brief into a living mission — with the right agents, tools, and proof appearing exactly when the work needs them.</p>
            <MissionComposer />
            <div className="evo-hero-links">
              <Link href="#workspace">Explore the workspace <FiArrowUpRight aria-hidden="true" /></Link>
              <Link href="#download">Download for desktop <FiArrowDown aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="evo-hero-visual">
            <div className="hero-video-frame" aria-label="Timelapse of EvoFlux Work mode">
              <div className="hero-video-topline"><span>LIVE CAPTURE / 06×</span><span>WORK MODE</span></div>
              <video autoPlay loop muted playsInline preload="metadata" poster="/showcase/evoflux-light-work.png">
                <source src="/evoflux-timelapse.mp4" type="video/mp4" />
              </video>
              <div className="hero-video-caption"><span>Brief → next move.</span><span>evoflux / work mode</span></div>
            </div>
            <div className="hero-visual-note"><span>LIVE</span> evidence attached</div>
          </div>
        </div>
        <div className="evo-hero-foot">
          <span>One place for research, writing, code, and review.</span>
          <span>macOS · Windows · Linux</span>
        </div>
      </section>

      <section className="mission-lab-section" id="workspace">
        <div className="shell">
          <div className="evo-section-heading mission-lab-heading">
            <div><p className="evo-section-tag">02 / Mission control</p><h2>Don’t watch the work.<br /><em>See it think.</em></h2></div>
            <p>Every mission has a visible state. Move through the system to see how EvoFlux turns intent into routes, routes into artifacts, and artifacts into evidence.</p>
          </div>
          <MissionLab />
        </div>
      </section>

      <section className="signal-marquee" aria-label="EvoFlux capabilities">
        <div className="signal-track">
          {[0, 1].map((copy) => <div className="signal-group" aria-hidden={copy === 1} key={copy}>{signalItems.map((item) => <span key={`${copy}-${item}`}><i /> {item}</span>)}</div>)}
        </div>
      </section>

      <section className="workspace-section shell">
        <div className="evo-section-heading workspace-heading">
          <div><p className="evo-section-tag">04 / One workspace</p><h2>Results you can<br /><em>stay with.</em></h2></div>
          <p>Move from conversation to artifact without losing the thread. Run, inspect, edit, and review the work in the same place it was made — then leave with a handoff everyone can trust.</p>
        </div>
        <div className="workspace-panel">
          <div className="workspace-panel-copy">
            <span className="workspace-panel-index">EVOFLUX / 2.0</span>
            <h3>The context stays connected.</h3>
            <p>Every mission gets a durable home for its files, tools, decisions, and output. Open the result, ask for a change, or hand it off when it is ready.</p>
            <ul>
              {workspacePoints.map(([label, copy]) => <li key={label}><FiCheck aria-hidden="true" /><span><strong>{label}</strong>{copy}</span></li>)}
            </ul>
            <Link className="text-link" href="/evo-agent-specification-driven-development">See how EASD keeps work honest <FiArrowUpRight aria-hidden="true" /></Link>
          </div>
          <figure className="workspace-image">
            <div className="workspace-image-caption"><span>LIVE PREVIEW</span><span>coding / easd</span></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/showcase/evoflux-light-coding-easd.png" alt="EvoFlux coding workspace with an agent conversation and specification panel" />
          </figure>
        </div>
      </section>

      <section className="control-section">
        <div className="shell control-grid">
          <div className="control-copy">
            <p className="evo-section-tag">05 / Your boundary</p>
            <h2>The machine<br /><em>is part of the product.</em></h2>
            <p>Project files, memory, sessions, and observability live where your work lives. When a model or browser needs to step outside, the boundary is explicit — and yours to change.</p>
            <div className="control-principles">
              {principles.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{copy}</p></div></article>)}
            </div>
          </div>
          <div className="control-visual" aria-label="Diagram showing the local EvoFlux workspace and its explicit connection boundary">
            <div className="control-orbit orbit-one" />
            <div className="control-orbit orbit-two" />
            <div className="control-core"><span className="control-core-mark">e</span><strong>Your machine</strong><small>files · memory · sessions</small></div>
            <span className="control-node node-models">models</span>
            <span className="control-node node-tools">tools</span>
            <span className="control-node node-browser">browser</span>
            <div className="control-boundary"><span>permission boundary</span></div>
          </div>
        </div>
      </section>

      <section className="download-section evo-download shell" id="download">
        <div className="download-card">
          <div className="download-card-copy">
            <p className="evo-section-tag">06 / Start here</p>
            <h2>Make room for<br /><em>the next move.</em></h2>
            <p>Download the desktop workspace, connect a model provider, and bring a real brief with you.</p>
            <div className="download-card-actions">
              <a className="evo-button dark" href="#platforms"><FiArrowDown aria-hidden="true" /> Get EvoFlux</a>
              <a className="evo-button light" href="https://github.com/evoelsewhere/evoflux"><FiGithub aria-hidden="true" /> View source <FiArrowUpRight aria-hidden="true" /></a>
            </div>
            <span className="download-card-meta"><FiLock aria-hidden="true" /> Open-source · local-first · Apache-2.0</span>
          </div>
          <div className="download-card-art" id="platforms">
            <div className="art-window">
              <div className="art-window-top"><span /><span /><span /><b>evoflux / ready</b></div>
              <div className="art-window-body"><strong>Bring a real brief.</strong><span>Leave with something useful.</span><i>↗</i></div>
            </div>
          </div>
        </div>
      </section>

      <section className="evo-closing shell">
        <div><p className="evo-section-tag">evoelsewhere</p><h2>Build elsewhere.<br /><em>Own the outcome.</em></h2></div>
        <Link className="closing-link" href="/privacy">Read our privacy principles <FiChevronRight aria-hidden="true" /></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
