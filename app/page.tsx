import type { Metadata } from 'next';
import Link from 'next/link';

import { DownloadPanel } from '@/components/download-panel';
import { HeroActions } from '@/components/hero-actions';
import { ProductTour } from '@/components/product-tour';
import { ProviderMarquee } from '@/components/provider-marquee';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'EvoFlux — Local-first AI agent workspace' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'EvoFlux — Your agent team, on your machine',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EvoFlux — Your agent team, on your machine',
    description: SITE_DESCRIPTION,
    images: ['/og.png'],
  },
};

const coreFeatures = [
  ['01', 'Delegate outcomes', 'A lead decomposes complex work and activates focused specialists only when they are useful.'],
  ['02', 'Keep the job together', 'Conversation, files, terminal, browser, memory, Git, and previews share one execution context.'],
  ['03', 'Choose every model', 'Mix providers, reasoning levels, skills, and tools independently for every agent role.'],
  ['04', 'Verify before Done', 'Acceptance criteria stay linked to tests, reviews, artifacts, failures, and rework.'],
];

const methodSteps = [
  ['Outcome', 'Describe the result and constraints.'],
  ['Specification', 'Approve criteria before execution.'],
  ['Missions', 'Dispatch isolated specialist contracts.'],
  ['Evidence', 'Attach proof to every criterion.'],
  ['Convergence', 'Accept, reject, or rework with reason.'],
];

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader />

      <section className="hero hero-split shell">
        <div className="hero-copy-column">
          <div className="eyebrow"><i /> open-source · local-first · desktop</div>
          <h1>Your agent team.<br /><em>On your machine.</em></h1>
          <p className="hero-copy">Start with an outcome. Approve the specification. EvoFlux coordinates specialists to implement, test, review, and converge on evidence—while you stay in control.</p>
          <HeroActions />
          <p className="platforms">Work + Coding agents&nbsp;&nbsp; / &nbsp;&nbsp;Any model&nbsp;&nbsp; / &nbsp;&nbsp;Your machine</p>
        </div>
        <div className="hero-visual-column">
          <figure className="hero-system-visual">
            <img src="/generated/hero-agent-flow-seamless.png" alt="Excalidraw workflow from a request through a lead, plan, parallel specialists, evidence, and result" width="1568" height="1003" />
          </figure>
        </div>
      </section>

      <section className="signal-bar shell" aria-label="Supported model providers">
        <ProviderMarquee />
      </section>

      <section className="feature-intro shell">
        <div className="section-heading compact-heading">
          <div><p className="section-tag">01 / What the harness changes</p><h2>More than a chat.<br />A system for delivery.</h2></div>
          <p>The model is replaceable. Context, action, policy, verification, and state are the product. EvoFlux keeps those layers visible instead of hiding them behind a single prompt box.</p>
        </div>
        <div className="core-feature-grid">
          {coreFeatures.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="tour-section shell" id="features">
        <div className="section-heading compact-heading">
          <div><p className="section-tag">02 / Main features</p><h2>See the feature.<br />Then see it working.</h2></div>
          <p>Select a capability to explore it. The tour keeps one real product capture in focus, so screenshots support the story instead of taking over the page.</p>
        </div>
        <ProductTour />
      </section>

      <section className="local-first-section">
        <div className="shell local-first-grid">
          <div className="local-first-copy">
            <p className="section-tag">03 / Local by architecture</p>
            <h2>Your machine is not an afterthought.</h2>
            <p>Project files, indexes, sessions, memory, permissions, and execution live locally. When a task needs a model, tool, or browser, the request crosses an explicit boundary you can inspect and control.</p>
            <ul>
              <li><strong>Scoped access</strong><span>Filesystem, process, shell, and denied-path controls.</span></li>
              <li><strong>Outbound protection</strong><span>Mask or block sensitive data before it leaves the machine.</span></li>
              <li><strong>Provider choice</strong><span>Use hosted, subscription, routed, cloud, or local models.</span></li>
            </ul>
          </div>
          <figure className="excalidraw-figure">
            <img src="/generated/local-first-excalidraw-site-bg.png" alt="Excalidraw diagram showing local files, memory, and runtime connected to models, tools, and browser through a permissions boundary" />
            <figcaption>Architecture sketch · the control boundary stays explicit</figcaption>
          </figure>
        </div>
      </section>

      <section className="method-preview shell" id="methodology">
        <div className="section-heading compact-heading">
          <div><p className="section-tag">04 / Evo Agent Specs</p><h2>Done is a verdict,<br />not a vibe.</h2></div>
          <div className="heading-action"><p>EASD keeps every result connected to its original intent and the evidence that proves it.</p><Link href="/evo-agent-specification-driven-development">Read the methodology →</Link></div>
        </div>
        <div className="method-card">
          <figure><img src="/generated/easd-excalidraw-site-bg.png" alt="Excalidraw diagram of Outcome, Spec, parallel Missions, Evidence, Verified, and a rework loop" /></figure>
          <ol>
            {methodSteps.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="conductor-section shell">
        <div className="conductor-band">
          <div>
            <p className="section-tag">05 / Scale with governance</p>
            <h2>Personal execution.<br />Organizational control.</h2>
            <p>EvoFlux is the workspace. Evo Conductor is the control plane for teams that need approved resources, role policies, realtime delivery, and effectiveness data.</p>
            <Link className="text-link" href="/enterprise">See how teams govern EvoFlux →</Link>
          </div>
          <div className="conductor-points">
            <article><span>Catalog</span><strong>Agents, skills, MCP</strong><p>Publish versioned capabilities once and distribute them safely.</p></article>
            <article><span>Policy</span><strong>Role, team, member</strong><p>Control which resources and secrets each person can use.</p></article>
            <article><span>Evidence</span><strong>Usage and effectiveness</strong><p>Connect shared resources to requests, outcomes, and feedback.</p></article>
          </div>
        </div>
      </section>

      <section className="download-section shell" id="download">
        <div className="section-heading compact-heading">
          <div><p className="section-tag">06 / Download</p><h2>Install once.<br />Then update in place.</h2></div>
          <p>The desktop package includes the native sidecar. Connect a provider, open Work or a repository, and configure the team behind your next outcome.</p>
        </div>
        <DownloadPanel />
      </section>

      <section className="trust-strip shell">
        <div><p className="section-tag">Privacy is a product boundary</p><h2>Know what stays local—and what you choose to connect.</h2></div>
        <Link href="/privacy" className="button secondary">Read the Privacy Policy →</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
