import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowDown, FiArrowUpRight, FiCheck, FiChevronRight, FiGithub, FiLock, FiPlay } from 'react-icons/fi';

import { MissionComposer } from '@/components/mission-composer';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'EvoFlux — A place for the work between idea and done' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'EvoFlux — A place for the work between idea and done',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EvoFlux — A place for the work between idea and done',
    description: SITE_DESCRIPTION,
    images: ['/og.png'],
  },
};

const workflowFeatures = [
  {
    number: '01',
    title: 'Say what needs to happen.',
    copy: 'Start with the outcome, the context, and the constraints. EvoFlux turns a rough brief into a plan you can inspect before work begins.',
    tone: 'rose',
  },
  {
    number: '02',
    title: 'Let the right agents move.',
    copy: 'A lead agent routes research, writing, coding, browser work, and review to focused specialists — in parallel when it helps.',
    tone: 'violet',
  },
  {
    number: '03',
    title: 'Keep the proof with the work.',
    copy: 'Files, tests, screenshots, decisions, and failures stay attached to the mission so “done” has something solid behind it.',
    tone: 'mint',
  },
];

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

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="EvoFlux workspace preview">
      <div className="preview-toolbar">
        <span className="preview-brand"><span className="preview-brand-mark">e</span> evoflux</span>
        <span className="preview-status"><i /> mission active</span>
        <span className="preview-dots" aria-hidden="true"><b /><b /><b /></span>
      </div>
      <div className="preview-layout">
        <aside className="preview-sidebar">
          <span className="preview-side-label">WORKSPACE</span>
          <strong>Product launch</strong>
          <div className="preview-side-item active"><span>◈</span> Agent room</div>
          <div className="preview-side-item"><span>◇</span> Evidence</div>
          <div className="preview-side-item"><span>◌</span> Files</div>
          <span className="preview-side-label preview-side-label-spaced">MISSIONS</span>
          <div className="preview-mission"><i className="is-live" /> Research brief</div>
          <div className="preview-mission"><i /> Landing page</div>
        </aside>
        <div className="preview-main">
          <div className="preview-main-head">
            <div><span className="preview-kicker">MISSION / 004</span><h3>The next frontier of intelligence</h3></div>
            <span className="preview-model">EvoFlux / lead</span>
          </div>
          <div className="preview-progress"><span style={{ width: '72%' }} /></div>
          <div className="preview-transcript">
            <div className="preview-message preview-user"><span className="preview-avatar">you</span><p>Turn the research into a clear narrative for the team.</p></div>
            <div className="preview-message"><span className="preview-avatar agent">e</span><div><p>I’m splitting this into three tracks so we can keep the thinking visible.</p><div className="preview-agent-cards"><span><FiCheck /> research</span><span><FiCheck /> synthesis</span><span className="in-progress"><FiPlay /> review</span></div></div></div>
          </div>
          <div className="preview-composer"><span>Ask for the next move…</span><span className="preview-send">↑</span></div>
        </div>
      </div>
    </div>
  );
}

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
            <p className="evo-hero-kicker">For the work between idea and done.</p>
            <h1>Give every hard thing <em>a way forward.</em></h1>
            <p className="evo-hero-lede">EvoFlux is a calm, local-first workspace for turning ambitious briefs into finished work — with agents, tools, and evidence moving together.</p>
            <MissionComposer />
            <div className="evo-hero-links">
              <Link href="#workspace">Explore the workspace <FiArrowUpRight aria-hidden="true" /></Link>
              <Link href="#download">Download for desktop <FiArrowDown aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="evo-hero-visual">
            <ProductPreview />
            <div className="hero-visual-note"><span>02:14</span> evidence attached</div>
          </div>
        </div>
        <div className="evo-hero-foot">
          <span>One place for research, writing, code, and review.</span>
          <span>macOS · Windows · Linux</span>
        </div>
      </section>

      <section className="workflow-section" id="workspace">
        <div className="shell">
          <div className="evo-section-heading">
            <div><p className="evo-section-tag">02 / The flow</p><h2>Whatever you entrust,<br /><em>gets a next move.</em></h2></div>
            <p>Not another chat window. EvoFlux gives open-ended work a shape: a brief, a group of specialists, and a clear trail from first thought to final handoff.</p>
          </div>
          <div className="workflow-grid">
            {workflowFeatures.map((feature) => (
              <article className={`workflow-card ${feature.tone}`} key={feature.number}>
                <span className="workflow-number">{feature.number}</span>
                <div className="workflow-symbol" aria-hidden="true"><span /></div>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
                <span className="workflow-arrow"><FiArrowUpRight aria-hidden="true" /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workspace-section shell">
        <div className="evo-section-heading workspace-heading">
          <div><p className="evo-section-tag">03 / One workspace</p><h2>Results you can<br /><em>stay with.</em></h2></div>
          <p>Move from conversation to artifact without losing the thread. Run, inspect, edit, and review the work in the same place it was made.</p>
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
            <Image src="/showcase/evoflux-light-coding-easd.png" alt="EvoFlux coding workspace with an agent conversation and specification panel" width={1634} height={1057} />
          </figure>
        </div>
      </section>

      <section className="control-section">
        <div className="shell control-grid">
          <div className="control-copy">
            <p className="evo-section-tag">04 / Your boundary</p>
            <h2>The machine<br /><em>is part of the product.</em></h2>
            <p>Project files, memory, sessions, and observability live where your work lives. When a model or browser needs to step outside, the boundary is explicit.</p>
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
            <p className="evo-section-tag">05 / Start here</p>
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
