import type { Metadata } from 'next';
import Link from 'next/link';
import { FiActivity, FiBox, FiGitBranch, FiLock, FiRefreshCw, FiShield, FiUsers } from 'react-icons/fi';

import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo';

const title = 'EvoFlux Enterprise: Evo Conductor Control Plane';
const description = 'See how Evo Conductor governs identity, resources, policy, delivery, and privacy-safe operations while EvoFlux executes AI agent work inside each team’s local workspace.';
const canonicalPath = '/enterprise';
const socialImage = {
  url: '/generated/enterprise-conductor-evoflux-architecture.png',
  width: 1536,
  height: 1024,
  alt: 'Evo Conductor governing multiple local EvoFlux workspaces through identity, policy, catalog delivery, and privacy-safe outcomes',
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPath },
  keywords: ['EvoFlux Enterprise', 'Evo Conductor', 'AI agent governance', 'enterprise AI agents', 'local-first AI', 'agent resource catalog', 'AI agent observability', 'enterprise EASD'],
  openGraph: {
    type: 'article',
    locale: 'en_US',
    title: `${title} | EvoFlux`,
    description,
    url: canonicalPath,
    siteName: SITE_NAME,
    publishedTime: '2026-08-27T00:00:00.000Z',
    modifiedTime: '2026-08-27T00:00:00.000Z',
    section: 'Enterprise AI agent architecture',
    images: [socialImage],
  },
  twitter: { card: 'summary_large_image', title: `${title} | EvoFlux`, description, images: [socialImage.url] },
};

const toc = [
  ['system', 'System model'],
  ['catalog', 'Governed catalog'],
  ['delivery', 'Realtime delivery'],
  ['identity', 'Identity & access'],
  ['operations', 'Operations & privacy'],
  ['local', 'Local execution'],
  ['easd', 'Enterprise EASD'],
  ['deployment', 'Deployment boundaries'],
  ['outcomes', 'What teams gain'],
  ['status', 'Current vs target state'],
  ['faq', 'Questions'],
];

const faqItems = [
  ['What is Evo Conductor?', 'Evo Conductor is the governance and delivery control plane for EvoFlux. It manages members, roles, connection secrets, approved Agents, Skills and Plugins, member-specific access, resource versions, installation inventory, and privacy-safe operational analytics.'],
  ['Does Evo Conductor upload source code or prompts?', 'Not by default. Source repositories, prompts, model responses, tool arguments, session transcripts, and local files remain in the EvoFlux execution boundary. Conductor receives governed resource bundles, inventory, presence, delivery state, and bounded operational outcome metadata.'],
  ['How do approved resources reach EvoFlux?', 'Conductor sends a lightweight SSE invalidation. EvoFlux then performs an authenticated smart fetch, downloads only missing immutable objects, verifies the complete staged tree, and atomically activates the new generation while preserving the last-known-good version on failure.'],
  ['What can administrators govern?', 'Administrators can govern membership, primary and sub-roles, tags, scoped connection secrets, resource lifecycle and access rules, storage providers, SSO, telemetry level, delivery state, and retention according to the organization’s deployment policy.'],
  ['Is cross-team Enterprise EASD fully implemented?', 'The core Conductor control plane is implemented, while the EvoFlux realtime client integration is pending. The multi-squad, multi-repository Enterprise EASD federation model is documented as a target state and is not presented as a completed product capability.'],
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': `${SITE_URL}${canonicalPath}/#article`,
      headline: title,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      mainEntityOfPage: `${SITE_URL}${canonicalPath}`,
      image: absoluteUrl(socialImage.url),
      datePublished: '2026-08-27',
      dateModified: '2026-08-27',
      inLanguage: 'en',
      isAccessibleForFree: true,
      author: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      about: ['Enterprise AI agent governance', 'Local-first execution', 'Evo Conductor', 'EvoFlux'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'EvoFlux', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Enterprise', item: `${SITE_URL}${canonicalPath}` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
    },
  ],
};

export default function EnterprisePage() {
  return (
    <main className="easd-page enterprise-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <SiteHeader />

      <header className="easd-paper-header enterprise-paper-header shell">
        <nav className="easd-breadcrumb" aria-label="Breadcrumb"><Link href="/">EvoFlux</Link><span aria-hidden="true">/</span><span aria-current="page">Enterprise</span></nav>
        <div className="easd-paper-id"><span className="enterprise-mark" aria-hidden="true">EC</span><span>evoelsewhere Architecture Brief · 01</span></div>
        <h1>Govern centrally.<br />Execute locally.</h1>
        <div className="easd-paper-meta"><span>System: Evo Conductor + EvoFlux</span><span>Scope: teams · projects · governed resources</span><span>Revision: 1.0 · August 2026</span></div>
        <section className="easd-abstract" aria-labelledby="enterprise-abstract-title">
          <h2 id="enterprise-abstract-title">Abstract</h2>
          <p>Evo Conductor gives an organization one control plane for identity, approved agent resources, policy, delivery state, and privacy-safe operations. EvoFlux remains the execution plane on each member&apos;s machine—where repositories, files, models, tools, memory, sandbox policy, and agent work stay close to the user.</p>
          <p className="easd-keywords"><strong>Keywords:</strong> local-first execution; resource governance; role policy; smart delivery; privacy-safe telemetry; enterprise agent operations.</p>
        </section>
        <div className="enterprise-definition"><strong>Operating principle</strong><p>Conductor may distribute approved resources and narrow policy. It does not silently broaden local repository, filesystem, process, model, or tool authority.</p></div>
        <div className="easd-paper-links"><a href="https://github.com/evoelsewhere/evo-conductor">Evo Conductor source ↗</a><Link href="/#download">Download EvoFlux →</Link><Link href="/evo-agent-specification-driven-development">Read EASD →</Link></div>
      </header>

      <figure className="enterprise-architecture-figure shell">
        <img src={socialImage.url} width="1536" height="1024" fetchPriority="high" alt={socialImage.alt} />
        <figcaption><strong>Figure 1.</strong> One control plane distributes approved policy and resources; multiple EvoFlux installations execute within separate local workspaces and return bounded operational outcomes.</figcaption>
      </figure>

      <section className="easd-manifesto enterprise-manifesto"><div className="shell"><blockquote>“Central governance is useful only when local execution remains explicit, bounded, and inspectable.”<cite>Enterprise control boundary</cite></blockquote></div></section>

      <div className="easd-layout shell">
        <aside className="easd-toc" aria-label="Enterprise architecture contents"><strong>Brief contents</strong>{toc.map(([id, label], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>)}</aside>

        <article className="easd-content enterprise-content">
          <section className="easd-section" id="system">
            <p className="section-tag">01 / System model</p>
            <h2>One system.<br />Two clear planes.</h2>
            <p className="easd-lede">Conductor owns organization-level governance and delivery. EvoFlux owns the authorized execution context on each machine. Git, CI, object storage, identity providers, and model providers remain external systems with their own trust boundaries.</p>
            <div className="enterprise-plane-grid">
              <article><span>Control plane</span><h3>Evo Conductor</h3><ul><li>Members, primary roles, sub-roles, tags, and scoped connection secrets.</li><li>Draft, publish, deprecate, version, and assign approved Agents, Skills, and Plugins.</li><li>Realtime invalidation, member-specific desired state, inventory, presence, and delivery health.</li><li>Privacy-safe request, model, tool, token, cost, outcome, and feedback analytics.</li></ul></article>
              <article><span>Execution plane</span><h3>EvoFlux Desktop</h3><ul><li>Local repositories, files, terminals, browser work, memory, schedules, and artifacts.</li><li>Work and Coding agent teams, model selection, tools, MCP servers, Skills, and Plugins.</li><li>Filesystem, process, shell, denied-path, sandbox, and outbound-data controls.</li><li>Local EASD specifications, missions, evidence, deviations, and convergence.</li></ul></article>
            </div>
            <div className="easd-callout enterprise-boundary"><strong>Data boundary</strong><p>Conductor is not a remote desktop and does not stream source code, prompts, responses, tool arguments, or file paths into dashboards by default. The organization chooses what operational metadata is enabled and retained.</p></div>
          </section>

          <section className="easd-section" id="catalog">
            <p className="section-tag">02 / Governed resource catalog</p>
            <h2>Approve once.<br />Deliver by policy.</h2>
            <p className="easd-lede">Contributors author portable resources; administrators govern release and access; members receive only published versions visible to their role, tag, or identity.</p>
            <div className="easd-table-wrap"><table><thead><tr><th>Resource</th><th>What it standardizes</th><th>Delivery unit</th></tr></thead><tbody><tr><td><strong>Agent</strong></td><td>Role, model policy, capabilities, tools, and operating instructions</td><td>Immutable governed bundle</td></tr><tr><td><strong>Skill</strong></td><td>Resumable method, instructions, references, scripts, and assets</td><td>Immutable governed bundle</td></tr><tr><td><strong>Plugin</strong></td><td>Portable capability package with manifest and dependency contract</td><td>Verified plugin bundle</td></tr></tbody></table></div>
            <figure className="enterprise-demo-figure"><img src="/enterprise/conductor-skill-installations.jpg" width="1280" height="720" loading="lazy" alt="Actual Evo Conductor skill installation inventory showing desired and observed delivery state" /><figcaption><strong>Actual product UI.</strong> Resource installation inventory separates the desired published version from the version observed on each EvoFlux client.</figcaption></figure>
          </section>

          <section className="easd-section" id="delivery">
            <p className="section-tag">03 / Realtime resource delivery</p>
            <h2>Invalidate lightly.<br />Converge authoritatively.</h2>
            <p className="easd-lede">The realtime channel carries liveness and head changes—not authored files. EvoFlux performs a retryable smart fetch whenever it connects, reconnects, or receives an invalidation.</p>
            <ol className="enterprise-flow">
              <li><span>01</span><strong>Publish</strong><p>Conductor commits an immutable resource version and access policy.</p></li>
              <li><span>02</span><strong>Invalidate</strong><p>SSE announces that the desired head changed.</p></li>
              <li><span>03</span><strong>Negotiate</strong><p>EvoFlux sends its active commit and managed object set.</p></li>
              <li><span>04</span><strong>Fetch</strong><p>Only missing immutable objects are downloaded.</p></li>
              <li><span>05</span><strong>Verify</strong><p>The complete tree, limits, hashes, and access are checked in staging.</p></li>
              <li><span>06</span><strong>Activate</strong><p>One atomic generation switch preserves last-known-good on failure.</p></li>
            </ol>
            <p className="easd-note">A slow stream cannot block other members. It receives a resync instruction and negotiates current desired state. Reconnects use bounded backoff; revocation and member disable fail closed.</p>
          </section>

          <section className="easd-section" id="identity">
            <p className="section-tag">04 / Identity and policy</p>
            <h2>Authority comes from identity—not payload claims.</h2>
            <div className="enterprise-feature-grid">
              <article><FiUsers aria-hidden="true" /><h3>Role model</h3><p><strong>Admin</strong> governs setup and policy. <strong>Contributor</strong> publishes approved resources and sees owned monitoring. <strong>User</strong> consumes the catalog and reports bounded outcomes.</p></article>
              <article><FiShield aria-hidden="true" /><h3>Fine-grained access</h3><p>Primary role, sub-role, tag, or member rules resolve the exact catalog visible to each connection secret.</p></article>
              <article><FiLock aria-hidden="true" /><h3>Scoped credentials</h3><p><code>evc_…</code> connection secrets are hashed at rest, scoped for subscription or telemetry, revocable, and blocked when an owner is disabled.</p></article>
              <article><FiRefreshCw aria-hidden="true" /><h3>SSO lifecycle</h3><p>Microsoft Entra ID uses authorization code + PKCE, state, nonce, issuer, audience, and JWKS validation. Session-version checks make disable and reset effective immediately.</p></article>
            </div>
          </section>

          <section className="easd-section" id="operations">
            <p className="section-tag">05 / Operations and privacy</p>
            <h2>See adoption and outcomes.<br />Do not centralize the work.</h2>
            <p className="easd-lede">Conductor attributes activity from the authenticated connection secret rather than trusting a client-provided member ID. Retry-safe event IDs prevent double counting.</p>
            <div className="enterprise-demo-grid">
              <figure className="enterprise-demo-figure"><img src="/showcase/conductor-member-overview.jpg" width="1436" height="997" loading="lazy" alt="Actual Evo Conductor member analytics dashboard with token, request, tool, model, and activity summaries" /><figcaption><strong>Member operations.</strong> Requests, tokens, model mix, tool calls, cache use, and recent outcomes across a selected time range.</figcaption></figure>
              <figure className="enterprise-demo-figure"><img src="/enterprise/conductor-request-detail.jpg" width="1440" height="1000" loading="lazy" alt="Actual Evo Conductor request detail showing privacy-safe model and tool timeline without prompts or outputs" /><figcaption><strong>Privacy-safe detail.</strong> Model and tool status, duration, token volume, and error category—without prompts, outputs, arguments, or file paths.</figcaption></figure>
            </div>
            <div className="enterprise-metadata-list"><span>Allowed operational signals</span><p>request outcome · duration · model identity · token counts · cache · tool name/status · error category · resource version · installation state · feedback</p><span>Excluded by default</span><p>prompt content · model response · tool arguments · credentials · source code · file paths · local conversation history</p></div>
          </section>

          <section className="easd-section" id="local">
            <p className="section-tag">06 / Local execution</p>
            <h2>Governance arrives.<br />Work stays close.</h2>
            <p className="easd-lede">An EvoFlux member can receive an approved agent team or skill bundle, then use it inside an explicitly attached repository and local permission boundary. Conductor cannot make a local path available when EvoFlux has not authorized it.</p>
            <figure className="enterprise-demo-figure enterprise-evoflux-figure"><img src="/showcase/evoflux-light-coding-easd.png" width="1634" height="1057" loading="lazy" alt="Actual EvoFlux light-theme coding workspace with a local repository and Enterprise EASD setup panel" /><figcaption><strong>Actual EvoFlux UI.</strong> The governed method is installed into authorized repositories; agents execute locally with repository, tool, sandbox, and user-approval controls intact.</figcaption></figure>
          </section>

          <section className="easd-section" id="easd">
            <p className="section-tag">07 / Enterprise EASD target state</p>
            <h2>Federate execution.<br />Keep intent and evidence traceable.</h2>
            <p className="easd-lede">The proposed Enterprise EASD control model extends local EASD across squads, repositories, shared contracts, assurance roles, and release streams. It is a documented target state—not a claim that program-level orchestration is already shipped.</p>
            <div className="enterprise-hierarchy"><div><span>01</span><strong>Enterprise policy</strong><p>Risk, evidence, separation-of-duty, and waiver rules.</p></div><div><span>02</span><strong>Initiative contract</strong><p>Cross-team outcome, non-goals, ACs, owners, and baseline.</p></div><div><span>03</span><strong>Project EASD runs</strong><p>Accepted local specs, plans, missions, evidence, and deviations.</p></div><div><span>04</span><strong>Program convergence</strong><p>All required projects and cross-team gates bound to exact artifacts.</p></div></div>
            <div className="easd-callout"><strong>Precedence</strong><p>Enterprise policy may narrow local authority and add gates. It may not silently rewrite accepted product intent, grant broader repository access, or relabel a failed review as machine evidence.</p></div>
          </section>

          <section className="easd-section" id="deployment">
            <p className="section-tag">08 / Deployment boundaries</p>
            <h2>Start contained.<br />Scale deliberately.</h2>
            <div className="easd-table-wrap"><table><thead><tr><th>Boundary</th><th>Available shape</th><th>Scale note</th></tr></thead><tbody><tr><td><strong>Database</strong></td><td>SQLite by default; PostgreSQL and MySQL supported</td><td>Choose the production database for concurrency and operations</td></tr><tr><td><strong>Resource objects</strong></td><td>Local, S3, Azure Blob, or Git-backed immutable objects</td><td>Canonical keys and digests stay provider-independent</td></tr><tr><td><strong>Realtime</strong></td><td>Bounded single-process SSE hub</td><td>Multiple replicas require a shared broker and transactional outbox</td></tr><tr><td><strong>Edge</strong></td><td>TLS reverse proxy with buffering disabled for SSE</td><td>Admission, handshake, heartbeat, and file-descriptor limits must be tested</td></tr></tbody></table></div>
          </section>

          <section className="easd-section" id="outcomes">
            <p className="section-tag">09 / What organizations gain</p>
            <h2>Consistency without turning every machine into a thin client.</h2>
            <div className="enterprise-outcome-grid">
              <article><FiBox aria-hidden="true" /><h3>Approved building blocks</h3><p>Versioned Agents, Skills, and Plugins replace copy-pasted team configuration.</p></article>
              <article><FiGitBranch aria-hidden="true" /><h3>Controlled change</h3><p>Draft, release, deprecate, assign, observe, and roll forward with immutable history.</p></article>
              <article><FiActivity aria-hidden="true" /><h3>Operational evidence</h3><p>Understand adoption, delivery drift, request outcomes, model/tool use, and estimated cost.</p></article>
              <article><FiShield aria-hidden="true" /><h3>Bounded governance</h3><p>Central policy narrows what is allowed while local sandbox and repository authorization remain decisive.</p></article>
            </div>
          </section>

          <section className="easd-section" id="status">
            <p className="section-tag">10 / Current capability and roadmap</p>
            <h2>State the boundary honestly.</h2>
            <div className="enterprise-status-list"><article><span className="is-current">Implemented</span><h3>Evo Conductor control plane</h3><p>Web console, member and role governance, scoped secrets, catalog lifecycle, access rules, resource artifacts, SSE invalidation, smart-fetch APIs, inventory, presence, telemetry, outcome attribution, feedback, and storage providers.</p></article><article><span className="is-integration">Integration pending</span><h3>EvoFlux realtime client</h3><p>The Conductor contracts and endpoints are implemented. EvoFlux still needs the production client path that subscribes, smart-fetches, verifies, atomically activates, inventories, and reports governed outcomes.</p></article><article><span className="is-target">Target state</span><h3>Enterprise EASD federation</h3><p>Portfolio intake, cross-project initiative graphs, enterprise evidence admission, program convergence, and release-baseline orchestration are documented methodology and architecture targets.</p></article></div>
          </section>

          <section className="easd-section" id="faq">
            <p className="section-tag">11 / Questions</p><h2>Enterprise FAQ.</h2>
            <div className="easd-faq">{faqItems.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div>
          </section>
        </article>
      </div>

      <section className="easd-closing enterprise-closing shell"><div><p className="section-tag">Enterprise operating rule</p><h2>Govern what must be shared.<br />Keep execution where work happens.</h2></div><div className="enterprise-closing-actions"><Link href="/#download" className="button primary">Download EvoFlux ↓</Link><a href="https://github.com/evoelsewhere/evo-conductor" className="button secondary">View Conductor ↗</a></div></section>
      <SiteFooter />
    </main>
  );
}
