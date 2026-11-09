import type { Metadata } from 'next';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCode,
  FiCommand,
  FiEdit3,
  FiEyeOff,
  FiFileText,
  FiFolder,
  FiGitBranch,
  FiGithub,
  FiGlobe,
  FiGrid,
  FiLayers,
  FiLink,
  FiMonitor,
  FiMousePointer,
  FiPackage,
  FiRotateCcw,
  FiSearch,
  FiShield,
  FiTerminal,
  FiZap,
} from 'react-icons/fi';

import { AppDemo } from '@/components/app-demo';
import { CopyCommand } from '@/components/copy-command';
import { DownloadButton, DownloadPanel } from '@/components/download-panel';
import { EngineDemo } from '@/components/engine-demo';
import { BrowserShowcase, ComputerAppDemo, CustomizeShowcase, OfficeDemo } from '@/components/core-demos';
import { ApprovalDemo, CodeIntelDemo, ModelDemo, SchedulerDemo, SubagentDemo, UsageDemo } from '@/components/feature-demos';
import { Reveal } from '@/components/motion';
import { ProviderMarquee } from '@/components/provider-marquee';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
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
    id: 'code',
    title: 'Code it understands',
    text: 'Language servers for 21 languages install on demand. The agent reads diagnostics, jumps to definitions and finds references before it edits.',
    demo: <CodeIntelDemo />,
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

/** The four features the product is built around (section 03). */
const CORE = [
  {
    id: 'customize',
    nav: 'Customize',
    icon: <FiCommand />,
    kicker: 'Customize',
    title: <>Make it yours.<br /><span className="soft">Per project, per chat.</span></>,
    text: 'One page for everything that shapes how the agent works: what it knows, what it can reach, what runs around it. Personal settings follow you; project ones live in the repository.',
    points: [
      [<FiBookOpen key="i" />, 'Agent Skills and slash commands', 'Folders in the open SKILL.md format, with usage counts and who may run each one.'],
      [<FiLink key="i" />, 'MCP connectors with OAuth', 'GitHub, Linear, databases and more in one shared pool; switch any of them off per chat.'],
      [<FiPackage key="i" />, 'Plugins and marketplaces', 'Install bundles of skills, commands, subagents, hooks and connectors from GitHub, any git URL or a folder.'],
      [<FiZap key="i" />, 'Hooks', 'Commands or web requests on session, prompt and tool events that can block, allow or rewrite a call.'],
    ],
    demo: <CustomizeShowcase />,
  },
  {
    id: 'browser',
    nav: 'Browser',
    icon: <FiGlobe />,
    kicker: 'Browser',
    title: <>Two browsers.<br /><span className="soft">One for the agent, one that stays yours.</span></>,
    text: 'The agent gets its own browser inside the app and works there while you keep chatting. When the work needs a tab you are already signed in to, WebBridge shares just that tab, through a paired relay you can release at any time.',
    points: [
      [<FiMonitor key="i" />, 'Pages float as live cards', 'Each page the agent uses shows over its chat, laid out at desktop size, without opening a panel.'],
      [<FiMousePointer key="i" />, 'A virtual cursor you can follow', 'See where it clicks before it clicks, and click into the card yourself to take over.'],
      [<FiTerminal key="i" />, 'Real browser tools', 'Clicks, forms, uploads, console, network, storage, mocks, PDFs and performance traces.'],
      [<FiShield key="i" />, 'WebBridge for your own Chrome or Edge', 'You choose the tab and what to share; it crosses a policy-checked relay with private data redacted.'],
    ],
    demo: <BrowserShowcase />,
    link: ['https://github.com/evoelsewhere/evo-webbridge', 'Explore WebBridge'],
  },
  {
    id: 'computer-apps',
    nav: 'Computer apps',
    icon: <FiGrid />,
    kicker: 'Computer App Control',
    badge: 'Preview · Windows',
    title: <>Work in your apps.<br /><span className="soft">Off your screen.</span></>,
    text: 'Ask for work in an app you already have open, like a spreadsheet, a document or a chat app. The app moves off your screen while the agent works in it, a card shows it live, and it comes back exactly where it was when the turn ends.',
    points: [
      [<FiEyeOff key="i" />, 'Never your mouse or keyboard', 'Input goes to the app in the background: accessibility, the app’s own messages, or a DevTools pipe into web apps it starts.'],
      [<FiShield key="i" />, 'Every action asks first', 'The prompt lists each click and keystroke as it will run, even in Approve for me. Allow and block apps in Settings.'],
      [<FiRotateCcw key="i" />, 'It checks its own work', 'Each step reads the app back and says what changed, or that nothing did, instead of guessing from a picture.'],
      [<FiMonitor key="i" />, 'You stay in charge', 'Stop, Show the app or Close from the card at any moment; a stopped agent cannot take the app again until you allow it.'],
    ],
    demo: <ComputerAppDemo />,
  },
  {
    id: 'office',
    nav: 'Office',
    icon: <FiLayers />,
    kicker: 'Office documents',
    title: <>Decks, docs and sheets.<br /><span className="soft">Built where you can see them.</span></>,
    text: 'Word, PowerPoint and Excel files open right in the app, rendered natively. Watch a deck or a workbook appear as the agent builds it, point at what should change, and step back through every version it saved.',
    points: [
      [<FiLayers key="i" />, 'A real viewer for every file', 'Slides with Normal, Sorter and Reading views, sheets with tabs, a name box and the formula bar, documents with search.'],
      [<FiZap key="i" />, 'Live while it builds', 'Finished slides and sheets show at once, with placeholders for the rest, and the file opens by itself when it is ready.'],
      [<FiEdit3 key="i" />, 'Point, then ask', 'Select an area of a slide or a range of cells and say what to change; the request carries exactly what you marked.'],
      [<FiRotateCcw key="i" />, 'Every version kept', 'Undo, Redo and History step through each saved version. Exact print pages come from an optional runtime.'],
    ],
    demo: <OfficeDemo />,
  },
] as const;

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
          <div className="trio">
            <Reveal className="trio-item" delay={0}><strong>Native Rust engine</strong><p>The engine is compiled Rust, not a bundled script runtime. It starts quickly and needs no Node or Python to run.</p></Reveal>
            <Reveal className="trio-item" delay={80}><strong>Light on resources</strong><p>Small native processes keep memory and CPU low, so many chats and long runs fit beside your editor and builds.</p></Reveal>
            <Reveal className="trio-item" delay={160}><strong>Fast and responsive</strong><p>Streaming, file search and tool calls run natively, so the window stays smooth while agents work.</p></Reveal>
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

      <section className="section core" id="core">
        <div className="shell">
          <Reveal className="section-head center">
            <p className="eyebrow">03 / Core features</p>
            <h2>Four things it does<br /><span className="soft">that a chat window can&apos;t.</span></h2>
            <p>Shape the agent around your work, let it browse for you, hand it the apps you already use, and get real documents back.</p>
          </Reveal>
          <Reveal className="core-index" delay={60}>
            {CORE.map((feature, index) => (
              <a key={feature.id} href={`#${feature.id}`} className="core-index-item">
                <span className="core-index-n">0{index + 1}</span>
                {feature.icon}
                <span>{feature.nav}</span>
              </a>
            ))}
          </Reveal>
        </div>
        <div className="shell-wide core-rows">
          {CORE.map((feature, index) => (
            <article key={feature.id} id={feature.id} className={`core-row ${index % 2 === 1 ? 'is-flipped' : ''}`}>
              {feature.id === 'browser' && <span id="webbridge" className="core-anchor" aria-hidden="true" />}
              <Reveal className="core-copy">
                <p className="core-kicker">
                  <span className="core-n">03.{index + 1}</span> {feature.kicker}
                  {'badge' in feature && <span className="core-badge">{feature.badge}</span>}
                </p>
                <h3>{feature.title}</h3>
                <p className="core-text">{feature.text}</p>
                <ul className="core-points">
                  {feature.points.map(([icon, title, text]) => (
                    <li key={title}>
                      <span className="core-point-icon">{icon}</span>
                      <div><strong>{title}</strong><p>{text}</p></div>
                    </li>
                  ))}
                </ul>
                {'link' in feature && <a className="text-link" href={feature.link[0]}>{feature.link[1]} <FiArrowUpRight /></a>}
              </Reveal>
              <Reveal className="core-stage" delay={100}>{feature.demo}</Reveal>
            </article>
          ))}
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
