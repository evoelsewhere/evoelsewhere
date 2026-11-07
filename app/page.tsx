import type { Metadata } from 'next';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCode,
  FiFileText,
  FiFolder,
  FiGitBranch,
  FiGithub,
  FiGlobe,
  FiPackage,
  FiSearch,
  FiTerminal,
} from 'react-icons/fi';

import { AppDemo } from '@/components/app-demo';
import { CopyCommand } from '@/components/copy-command';
import { DownloadButton, DownloadPanel } from '@/components/download-panel';
import { EngineDemo } from '@/components/engine-demo';
import { ApprovalDemo, CustomizeDemo, ModelDemo, SchedulerDemo, SubagentDemo, UsageDemo } from '@/components/feature-demos';
import { Reveal } from '@/components/motion';
import { ProviderMarquee } from '@/components/provider-marquee';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { WebBridgeDemo } from '@/components/webbridge-demo';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_US', title: SITE_TITLE, description: SITE_DESCRIPTION, url: '/', siteName: SITE_NAME, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE.url] },
};

const FEATURES = [
  {
    id: 'subagents',
    title: 'Delegate, then review',
    text: 'Send read-only explore and plan agents ahead, or let one work in its own Git worktree. You apply or discard what it built.',
    demo: <SubagentDemo />,
  },
  {
    id: 'models',
    title: 'Bring any model',
    text: 'Hosted, cloud, routed or on your own GPU. Limits, prices and thinking levels come from models.dev, so new models show up without an update.',
    demo: <ModelDemo />,
  },
  {
    id: 'approvals',
    title: 'Approve what matters',
    text: 'Commands, edits and connector calls stop for you when they should. A sandbox, denied paths and project trust sit in front of every tool.',
    demo: <ApprovalDemo />,
  },
  {
    id: 'customize',
    title: 'Skills, connectors, plugins',
    text: 'Agent Skills, slash commands, MCP connectors with OAuth, hooks and plugin marketplaces. Turn each one on per project or per chat.',
    demo: <CustomizeDemo />,
  },
  {
    id: 'scheduler',
    title: 'Memory and schedules',
    text: 'Ask for a recurring task in plain words and it runs as a new chat on time. What the agent learns about you and your projects stays on disk.',
    demo: <SchedulerDemo />,
  },
  {
    id: 'usage',
    title: 'Know what it costs',
    text: 'Every response records its tokens, cache hits and price. See spend by model, by chat and by day, and compare models on the same work.',
    demo: <UsageDemo />,
  },
];

const TOOLS = [
  [<FiFolder key="i" />, 'Files with a code editor'],
  [<FiTerminal key="i" />, 'Your shells'],
  [<FiGlobe key="i" />, 'A browser the agent can drive'],
  [<FiGitBranch key="i" />, 'Git changes and worktrees'],
  [<FiCode key="i" />, 'Language servers for 21 languages'],
  [<FiFileText key="i" />, 'Word, PowerPoint and Excel'],
  [<FiSearch key="i" />, 'Web search and fetch'],
  [<FiPackage key="i" />, 'MCP connectors'],
] as const;

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="shell hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="spark" /> Open source · local-first · v4</p>
          <h1 className="hero-title">
            <span className="line">Your agents.</span>
            <span className="line line-2">Your machine.</span>
          </h1>
          <p className="hero-lede">
            Evo Harness is a desktop workspace where every chat runs its own engine, right beside your files, terminal, browser and git. Bring any model. Approve what matters.
          </p>
          <div className="hero-actions">
            <DownloadButton />
            <a className="btn btn-ghost btn-lg" href="https://github.com/evoelsewhere/evo-harness"><FiGithub /> Star on GitHub</a>
          </div>
          <p className="hero-platforms">Windows · macOS · Linux · Apache-2.0</p>
        </div>
        <div className="shell-wide hero-demo">
          <AppDemo />
        </div>
      </section>

      <section className="band">
        <p className="band-label">Works with any provider on models.dev</p>
        <ProviderMarquee />
      </section>

      <section className="section" id="engine">
        <div className="shell">
          <Reveal className="section-head">
            <p className="eyebrow">01 / The engine</p>
            <h2>One chat. <span className="soft">One engine.</span></h2>
            <p>Each chat gets its own <code>evo-engine</code> process on your machine. The window only relays the conversation, so chats run side by side, a crash stays in its own chat, and sessions are saved as they run.</p>
          </Reveal>
          <Reveal delay={80}><EngineDemo /></Reveal>
          <div className="trio">
            <Reveal className="trio-item" delay={0}><strong>Side by side</strong><p>Start a long refactor, then ask something else. Every chat streams on its own.</p></Reveal>
            <Reveal className="trio-item" delay={80}><strong>Crash-isolated</strong><p>A failing tool or plugin takes down one engine, never the window or your other chats.</p></Reveal>
            <Reveal className="trio-item" delay={160}><strong>Durable</strong><p>Each chat&apos;s transcript is its own file. Close the app mid-run and pick up where it stopped.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="shell">
          <Reveal className="section-head center">
            <p className="eyebrow">02 / The workspace</p>
            <h2>Everything an agent needs.<br /><span className="soft">Right beside the chat.</span></h2>
          </Reveal>
          <div className="bento">
            {FEATURES.map((feature, index) => (
              <Reveal key={feature.id} as="article" className="bento-card" delay={(index % 2) * 90}>
                <div className="bento-copy">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
                <div className="bento-stage">{feature.demo}</div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="tools-strip" aria-label="Built-in tools">
          <div className="tools-track">
            {[...TOOLS, ...TOOLS].map(([icon, label], i) => (
              <span key={i} className="tool-chip" aria-hidden={i >= TOOLS.length}>{icon} {label}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="webbridge">
        <div className="shell">
          <Reveal className="section-head">
            <p className="eyebrow">03 / Companion</p>
            <h2>Your browser.<br /><span className="soft">Still yours.</span></h2>
            <p>WebBridge pairs Chrome or Edge with Evo Harness. Share the tab you are already signed in to, pick what matters, and it reaches your chat through a paired, policy-checked relay. Release the tab whenever you want.</p>
            <a className="text-link" href="https://github.com/evoelsewhere/evo-webbridge">Explore WebBridge <FiArrowUpRight /></a>
          </Reveal>
          <Reveal delay={100}><WebBridgeDemo /></Reveal>
        </div>
      </section>

      <section className="section" id="download">
        <div className="shell">
          <Reveal className="section-head center">
            <p className="eyebrow">04 / Get started</p>
            <h2>Bring a real task.</h2>
            <p>Install the app, connect a provider in Settings, open a folder and ask for something you actually need done.</p>
          </Reveal>
          <Reveal><DownloadPanel /></Reveal>
          <div className="dev">
            <Reveal className="dev-card">
              <h3>Build from source</h3>
              <p>Rust and Bun build the engine and the desktop app; the dev command stages the engine and opens the window.</p>
              <CopyCommand lines={['git clone https://github.com/evoelsewhere/evo-harness', 'cd evo-harness/apps/desktop && bun install', 'bun run dev:app']} />
            </Reveal>
            <Reveal className="dev-card" delay={90}>
              <h3>Read how it is built</h3>
              <p>The architecture document, decision records and one design document per feature live in the repository.</p>
              <div className="dev-links">
                <a href="https://github.com/evoelsewhere/evo-harness/blob/main/docs/architecture/README.md"><FiBookOpen /> Architecture</a>
                <a href="https://github.com/evoelsewhere/evo-harness/blob/main/docs/features/README.md"><FiFileText /> Feature designs</a>
                <a href="https://github.com/evoelsewhere/evo-harness/blob/main/AGENTS.md"><FiCode /> Contributor guide</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="finale">
        <div className="finale-glow" aria-hidden="true" />
        <Reveal className="shell finale-copy">
          <h2>Open source. Local-first.<br /><span className="soft">Yours to change.</span></h2>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="https://github.com/evoelsewhere/evo-harness"><FiGithub /> View on GitHub</a>
            <a className="btn btn-ghost btn-lg" href="#download">Download</a>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
