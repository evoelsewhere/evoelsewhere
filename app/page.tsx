import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowDown, FiArrowUpRight, FiCheck, FiEye, FiGlobe, FiLock, FiMousePointer, FiShield, FiZap } from 'react-icons/fi';

import { DownloadPanel } from '@/components/download-panel';
import { IntroVideo } from '@/components/intro-video';
import { RotatingPhrase } from '@/components/rotating-phrase';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'EvoFlux — Local-first desktop, real control' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_US', title: 'EvoFlux — Local-first desktop, real control', description: SITE_DESCRIPTION, url: '/', siteName: SITE_NAME, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: 'EvoFlux — Local-first desktop, real control', description: SITE_DESCRIPTION, images: ['/og.png'] },
};

function AppControlDiagram() {
  return <div className="mimo-control-demo"><div className="mimo-demo-toolbar"><span>●</span><span>●</span><span>●</span><b>COMPUTER APP CONTROL</b><small>LIVE</small></div><div className="mimo-demo-content"><div className="mimo-tree"><label>ACCESSIBILITY TREE</label><strong>Chrome window</strong><span>↳ Address bar</span><span>↳ Research Overview</span><span>↳ Side Chat</span><span>↳ Release control</span></div><div className="mimo-app-window"><div className="mimo-app-title">Research Overview</div><div className="mimo-app-lines"><i /><i /><i /><i /></div><div className="mimo-approve"><FiCheck /> Action approved</div></div></div></div>;
}

function WebBridgeDiagram() {
  return <div className="webbridge-flow-panel" aria-label="WebBridge context handoff">
    <div className="webbridge-flow-heading"><span>ONE EXPLICIT HANDOFF</span><span className="webbridge-live"><i /> SESSION PAIRED</span></div>
    <div className="webbridge-flow">
      <div className="webbridge-endpoint"><FiGlobe /><small>01 / SOURCE</small><strong>Your browser</strong><span>Current tab<br />existing sign-in</span></div>
      <div className="webbridge-link"><span>Selected context</span><i><b /></i></div>
      <div className="webbridge-relay"><div className="webbridge-lock"><FiLock /></div><small>POLICY-CHECKED RELAY</small><strong>WebBridge</strong><ul><li>Pairing</li><li>Scope</li><li>Redaction</li></ul></div>
      <div className="webbridge-link webbridge-link-return"><span>Approved result</span><i><b /></i></div>
      <div className="webbridge-endpoint webbridge-endpoint-app"><FiZap /><small>02 / WORKSPACE</small><strong>EvoFlux</strong><span>Agent context<br />visible to you</span></div>
    </div>
    <div className="webbridge-flow-foot"><span>01 Pair</span><span>02 Choose context</span><span>03 Work together</span><span>04 Release control</span></div>
  </div>;
}

export default function Home() {
  return <main className="mimo-page">
    <SiteHeader />
    <section className="mimo-hero shell" data-reveal="hero"><p className="mimo-overline"><span /> EVOFLUX DESKTOP</p><h1 aria-label="Work without the handoff">Work without<br /><em><RotatingPhrase /></em></h1><p className="mimo-hero-copy">A local-first desktop workspace that can research, build, control apps, and work in your real browser — while you stay in charge.</p><div className="mimo-hero-actions"><a href="#download" className="mimo-black-button"><FiArrowDown /> Get EvoFlux</a><a href="#control" className="mimo-outline-button">See what it can do <FiArrowUpRight /></a></div><div className="mimo-platforms"><span>macOS</span><span>Windows</span><span>Linux</span><i /> <span>Open-source · local-first</span></div><div className="mimo-hero-preview"><IntroVideo /></div></section>
    <section className="mimo-statement" data-reveal="statement"><div className="shell"><p className="mimo-overline">02 / THE DESKTOP WORKSPACE</p><h2>More than a chat.<br /><em>A system that can act.</em></h2><p>Models are replaceable. The workspace is the product: context, tools, memory, permissions, and visible progress in one place.</p></div></section>
    <section className="mimo-feature shell" id="control" data-reveal="computer-control"><div className="mimo-feature-copy"><p className="mimo-overline">03 / COMPUTER APP CONTROL</p><h2>Operate the app.<br /><em>Not just the tab.</em></h2><p>Give an agent a bounded view of one desktop window. EvoFlux reads the accessibility tree, shows a live preview, and asks for approval when an action matters.</p><div className="mimo-feature-points"><span><FiEye /> Observe the window</span><span><FiMousePointer /> Approve the action</span><span><FiShield /> Take control back</span></div><a className="mimo-text-link" href="#download">Download the desktop runtime <FiArrowUpRight /></a></div><AppControlDiagram /></section>
    <section className="mimo-feature mimo-feature-webbridge shell" id="webbridge" data-reveal="webbridge"><div className="mimo-feature-copy"><p className="mimo-overline">04 / WEBBRIDGE</p><h2>Your browser.<br /><em>Still yours.</em></h2><p>Pair Chrome or Edge and bring the current tab into the workspace. Page context, screenshots, and selections move through an explicit, reversible bridge.</p><div className="mimo-feature-points"><span><FiLock /> Pairing and policy</span><span><FiZap /> Context on demand</span><span><FiCheck /> Release anytime</span></div><a className="mimo-text-link" href="https://github.com/evoelsewhere/evo-webbridge">Explore WebBridge <FiArrowUpRight /></a></div><WebBridgeDiagram /></section>
    <section className="mimo-product-section" id="workspace" data-reveal="workspace"><div className="shell"><p className="mimo-overline">05 / ONE LOCAL RUNTIME</p><h2>Everything stays<br /><em>in the room.</em></h2><div className="mimo-product-frame"><div className="mimo-frame-copy"><span>WORK MODE / ACTUAL UI</span><h3>Start with an outcome.<br />Keep the context.</h3><p>Work, Coding, providers, memory, browser, files, scheduler, and plugins share one local runtime.</p><div className="mimo-runtime-tags"><span>Work</span><span>Coding</span><span>Memory</span><span>Browser</span><span>Plugins</span></div></div><img src="/showcase/evoflux-light-work.png" alt="EvoFlux Work mode showing an outcome-first prompt, workspace navigation, and usage overview" loading="lazy" /></div></div></section>
    <section className="mimo-boundary shell" data-reveal="boundary"><p className="mimo-overline">06 / LOCAL BOUNDARY</p><h2>See what leaves.<br /><em>Decide what stays.</em></h2><div className="mimo-boundary-grid"><div><strong>Local by default</strong><p>Files, sessions, memory, and app state stay on your machine.</p></div><div><strong>Permission-scoped</strong><p>Filesystem, process, browser, and outbound access remain explicit.</p></div><div><strong>Inspectable throughout</strong><p>History, approvals, failures, and handoffs stay visible.</p></div></div></section>
    <section className="mimo-download shell" id="download" data-reveal="download"><div className="mimo-download-head"><div><p className="mimo-overline">07 / DOWNLOAD</p><h2>Make room for<br /><em>the next move.</em></h2><p>Install EvoFlux, connect a provider, and bring a real task. WebBridge is optional; Computer App Control is built into the desktop runtime.</p></div><div className="mimo-download-badges"><span>Desktop runtime</span><span>WebBridge optional</span><span>Apache-2.0</span></div></div><DownloadPanel /></section>
    <section className="mimo-footer-cta shell" data-reveal="footer"><h2>Make the work visible.<br /><em>Keep control.</em></h2><Link className="mimo-text-link" href="/privacy">Read privacy boundaries <FiArrowUpRight /></Link></section>
    <SiteFooter />
  </main>;
}
