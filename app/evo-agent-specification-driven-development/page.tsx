import type { Metadata } from 'next';
import Link from 'next/link';

import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo';

const title = 'EASD: AI Agent Specification-Driven Development';
const description = 'Learn EASD, EvoFlux’s AI agent specification-driven development methodology for accepted intent, bounded missions, typed evidence, verification, and rework.';
const canonicalPath = '/evo-agent-specification-driven-development';
const socialImage = {
  url: '/generated/easd-excalidraw-site-bg.png',
  width: 1774,
  height: 887,
  alt: 'EASD workflow from accepted outcome and specification through bounded agent missions, evidence, verification, and rework',
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPath },
  keywords: ['EASD', 'Evo Agent Specification-Driven Development', 'AI agent development methodology', 'specification-driven development', 'AI agent orchestration', 'AI agent verification', 'multi-agent software development'],
  openGraph: {
    type: 'article',
    locale: 'en_US',
    title: `${title} | EvoFlux`,
    description,
    url: canonicalPath,
    siteName: SITE_NAME,
    publishedTime: '2026-08-26T00:00:00.000Z',
    modifiedTime: '2026-08-26T00:00:00.000Z',
    section: 'AI agent engineering methodology',
    tags: ['EASD', 'AI agents', 'Specification-Driven Development', 'Software verification'],
    images: [socialImage],
  },
  twitter: { card: 'summary_large_image', title: `${title} | EvoFlux`, description, images: [socialImage.url] },
};

const faqItems = [
  ['What is EASD?', 'EASD stands for Evo Agent Specification-Driven Development. It is an AI agent engineering methodology that freezes accepted intent before execution, decomposes work into bounded missions, preserves evidence provenance, and computes completion from explicit verification gates.'],
  ['How is EASD different from Specification-Driven Development?', 'Specification-Driven Development defines and accepts normative product intent. EASD adds the agent execution protocol: mission planning, ownership, model and tool allocation, handoffs, review, typed evidence, rework, and convergence without allowing agents to redefine the accepted specification.'],
  ['How does EASD verify AI agent work?', 'Each acceptance criterion declares an evidence policy. EvoFlux binds machine results, independent review, manual observations, or authorized waivers to the exact artifact or repository revision, then computes whether every required convergence gate has passed.'],
  ['Does EASD require multiple AI agents?', 'No. EASD scales ceremony and parallelism to risk. A trivial change may use one bounded owner, while cross-layer or critical work can require a mission graph, isolated execution, an integration owner, and an independent verifier.'],
  ['Can I use EASD in EvoFlux?', 'Yes. EvoFlux implements EASD through accepted specifications, resumable phase skills, mission contracts, evidence records, deviations, independent review, and a runtime-owned convergence decision.'],
];

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': `${SITE_URL}${canonicalPath}/#article`,
      headline: 'EASD: Evo Agent Specification-Driven Development',
      alternativeHeadline: title,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      mainEntityOfPage: `${SITE_URL}${canonicalPath}`,
      image: absoluteUrl(socialImage.url),
      datePublished: '2026-08-26',
      dateModified: '2026-08-26',
      inLanguage: 'en',
      isAccessibleForFree: true,
      author: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      about: ['AI agents', 'Specification-Driven Development', 'Multi-agent software engineering', 'Software verification'],
      keywords: ['EASD', 'Evo Agent Specification-Driven Development', 'AI agent methodology', 'AI agent verification'],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${canonicalPath}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'EvoFlux', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'EASD methodology', item: `${SITE_URL}${canonicalPath}` },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${canonicalPath}/#faq`,
      mainEntity: faqItems.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
};

const invariants = [
  ['Immutable intent', 'An accepted specification revision has a stable content hash.'],
  ['Stable criteria', 'Every observable requirement has one unique acceptance-criterion ID.'],
  ['Bounded missions', 'Substantial work names its ACs, paths, dependencies, output, constraints, and evidence policy.'],
  ['Explicit ownership', 'Concurrent writers use disjoint paths or one named integration owner; mutable parallel work uses isolation.'],
  ['Typed handoff', 'Every handoff reports assigned ACs, verification, exact revision or artifact identity, and deviations.'],
  ['Evidence provenance', 'Machine, review, manual, and waiver evidence never collapse into one undifferentiated passed flag.'],
  ['No silent expansion', 'Unauthorized behavior becomes a deviation—not an implementation detail.'],
  ['Computed completion', 'Convergence is a deterministic service decision, separate from an agent summary.'],
  ['Proportional ceremony', 'Trivial changes need fewer gates; higher risk requires stronger separation of duties.'],
  ['Durable learning', 'Compare AC outcomes, defects, rework, conflicts, latency, and cost—not stylistic preference.'],
];

const skills = [
  ['easd-specify', 'Ground intent in repository evidence and submit a draft for human review.'],
  ['easd-plan', 'Compile the accepted hash and ACs into bounded ownership and evidence work.'],
  ['easd-implement', 'Execute only an active accepted contract and report scope or spec deviations.'],
  ['easd-review', 'Independently challenge the integrated change with cited AC and boundary findings.'],
  ['easd-verify', 'Validate integration and evidence, reconcile docs, and prepare convergence.'],
];

const roles = [
  ['Spec owner', 'Accepts normative intent and all normative revisions.'],
  ['Lead / convergence owner', 'Compiles and allocates missions, reviews handoffs, integrates accepted work, and initiates convergence.'],
  ['Mission owner', 'Implements only the assigned contract and returns evidence.'],
  ['Integration owner', 'Resolves shared contracts and produces the final tree.'],
  ['Independent verifier', 'Challenges the integrated result without authorship responsibility for it.'],
  ['EASD service', 'Validates identities and computes the AC matrix and gates.'],
];

const antiPatterns = [
  ['Prompt-as-spec', 'A long chat message with no immutable acceptance point.'],
  ['Agent says Done', 'Treating a polished summary as convergence.'],
  ['Evidence laundering', 'Entering a human claim as machine evidence.'],
  ['Review before integration', 'Using isolated worktree tests as proof of the final tree.'],
  ['Silent expansion', 'Shipping helpful behavior absent from accepted intent.'],
  ['Orphan AC', 'A required criterion with no owner or evidence plan.'],
  ['Shared-file swarm', 'Multiple writers editing the same contract without an integration owner.'],
  ['Model prestige', 'Using a larger model as a substitute for constraints and verification.'],
  ['Green-only report', 'Deleting failures, conflicts, or rework from the benchmark narrative.'],
];

const toc = [
  ['foundation', 'Foundation'],
  ['invariants', 'Core invariants'],
  ['skills', 'Skill bundle'],
  ['source', 'Source of truth'],
  ['lifecycle', 'Lifecycle'],
  ['contracts', 'Contracts'],
  ['evidence', 'Evidence & convergence'],
  ['roles', 'Roles'],
  ['risk', 'Risk scaling'],
  ['rework', 'Rework & anti-patterns'],
  ['example', 'Worked example'],
  ['maturity', 'Maturity & governance'],
  ['faq', 'Frequently asked questions'],
];

function ExitGate({ children }: { children: React.ReactNode }) {
  return <div className="easd-exit"><strong>Exit gate</strong><p>{children}</p></div>;
}

export default function EasdPage() {
  return (
    <main className="easd-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData).replace(/</g, '\\u003c') }}
      />
      <SiteHeader />

      <header className="easd-paper-header shell">
        <nav className="easd-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">EvoFlux</Link><span aria-hidden="true">/</span><span aria-current="page">EASD methodology</span>
        </nav>
        <div className="easd-paper-id">
          <img src="/generated/easd-mark-excalidraw.png" alt="EASD methodology logo" width="1254" height="1254" />
          <span>evoelsewhere Research Note · 01</span>
        </div>
        <h1>EASD: Evo Agent Specification-Driven Development</h1>
        <div className="easd-paper-meta"><span>Status: normative method</span><span>Product name: Evo Agent Specs</span><span>Revision: 1.0 · August 2026</span></div>
        <section className="easd-abstract" aria-labelledby="abstract-title">
          <h2 id="abstract-title">Abstract</h2>
          <p>EASD is EvoFlux&apos;s product-executable form of Agent-Driven Development, governed by Specification-Driven Development. It coordinates agent planning, implementation, testing, review, and integration while preserving human authority over normative intent and exceptional risk. The method accepts intent before execution, assigns bounded ownership, preserves evidence provenance, and computes completion from explicit convergence gates.</p>
          <p className="easd-keywords"><strong>Keywords:</strong> specification-driven development; agent orchestration; acceptance criteria; evidence provenance; convergence; software engineering.</p>
        </section>
        <div className="easd-definition">
          <strong>Definition</strong>
          <p><dfn>Evo Agent Specification-Driven Development (EASD)</dfn> is an AI agent development methodology that accepts immutable intent before execution, assigns bounded agent missions, attaches typed evidence to acceptance criteria, and computes Done only after explicit verification gates pass.</p>
        </div>
        <div className="easd-paper-links"><a href="https://github.com/evoelsewhere/evoflux/blob/main/documents/reference/easd-methodology.md">Source document ↗</a><Link href="/#download">EvoFlux implementation →</Link></div>
      </header>

      <figure className="easd-paper-figure shell">
        <img src="/generated/easd-excalidraw-site-bg.png" alt="EASD AI agent workflow showing accepted outcome and specification, parallel bounded missions, typed evidence, verified completion, and rework" width="1774" height="887" fetchPriority="high" />
        <figcaption><strong>Figure 1.</strong> The EASD execution loop: accepted outcome and specification are decomposed into bounded missions, challenged with evidence, and either verified or returned for rework.</figcaption>
      </figure>

      <section className="easd-manifesto">
        <div className="shell">
          <blockquote>“Accept intent before execution, assign bounded ownership, preserve provenance, challenge claims with evidence, and compute Done from explicit gates.”<cite>Core EASD convergence rule</cite></blockquote>
        </div>
      </section>

      <div className="easd-layout shell">
        <aside className="easd-toc" aria-label="EASD contents">
          <strong>Method contents</strong>
          {toc.map(([id, label], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>)}
        </aside>

        <article className="easd-content">
          <section className="easd-section" id="foundation">
            <p className="section-tag">01 / Foundation</p>
            <h2>SDD defines intent.<br />ADD executes the work.</h2>
            <p className="easd-lede">The layers are complementary. The accepted specification is normative; plans, mission prompts, implementation notes, and agent messages are derived artifacts.</p>
            <div className="easd-table-wrap">
              <table>
                <thead><tr><th>Layer</th><th>Owns</th><th>Must not do</th></tr></thead>
                <tbody>
                  <tr><td><strong>SDD</strong></td><td>Problem, outcome, goals, non-goals, risk, sources, acceptance criteria</td><td>Silently change after execution starts</td></tr>
                  <tr><td><strong>ADD</strong></td><td>Mission decomposition, roles, models, tools, isolation, execution, handoff, review, rework</td><td>Redefine accepted product intent</td></tr>
                  <tr><td><strong>EASD convergence</strong></td><td>Evidence policy, mission state, deviations, final artifact identity</td><td>Accept an agent&apos;s prose claim as Done</td></tr>
                </tbody>
              </table>
            </div>
            <div className="easd-callout"><strong>Normative conflict rule</strong><p>When a plan, prompt, implementation note, or agent message disagrees with the accepted specification, affected work stops. The team records a deviation or requests a new spec revision.</p></div>
          </section>

          <section className="easd-section" id="invariants">
            <p className="section-tag">02 / Core invariants</p>
            <h2>Ten rules the runtime cannot hand-wave away.</h2>
            <div className="easd-invariants">
              {invariants.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
          </section>

          <section className="easd-section" id="skills">
            <p className="section-tag">03 / Repository skill bundle</p>
            <h2>Five resumable phase skills.</h2>
            <p className="easd-lede">Initializing EASD installs five portable, Coding-only project skills under <code>.evoflux/skills/</code>. They resume from durable EASD state—not conversation memory—and stop on a stale accepted hash or wrong lifecycle phase.</p>
            <div className="easd-skill-list">
              {skills.map(([name, copy], index) => <article key={name}><span>{String(index + 1).padStart(2, '0')}</span><code>{name}</code><p>{copy}</p></article>)}
            </div>
            <p className="easd-note">Skill selection provides phase guidance but cannot change EASD state or trust. The user accepts the specification; runtime services validate lifecycle, admit evidence, and compute convergence. Learn remains telemetry-backed rather than a sixth Skill until bounded run-report context is available.</p>
          </section>

          <section className="easd-section" id="source">
            <p className="section-tag">04 / Repository source of truth</p>
            <h2>Git documents win.</h2>
            <div className="easd-source-grid">
              <div>
                <p><code>.evoflux/easd/config.json</code> selects a safe repository-relative data directory. Accepted revisions are immutable; mutable projections use generation/hash compare-and-swap and atomic rename.</p>
                <p>Application SQLite and <code>.evoflux/easd/.local/</code> may store only rebuildable projections, locks, or session bindings. Another collaborator can continue without the original machine or chat.</p>
              </div>
              <pre aria-label="EASD repository structure">{`.evoflux/easd/
├── specs/          accepted contracts
├── features/       adopted knowledge
├── architecture/   living architecture
├── reference/      durable reference
├── runs/           change execution
├── records/        history
└── .local/         rebuildable only`}</pre>
            </div>
          </section>

          <section className="easd-section" id="lifecycle">
            <p className="section-tag">05 / Lifecycle</p>
            <h2>Seven phases from intent to learning.</h2>
            <div className="easd-stages">
              <section>
                <span>01</span><div><h3>Author and Accept</h3><p>Persist minimal Intent—title, problem, and optional outcome—before choosing an implementation. A bound Coding lead inspects authorized repository evidence, asks questions, and submits a typed specification draft for human review. Submission never authorizes execution.</p><p>The reviewed spec contains goals, non-goals, sources, affected targets, typed constraints, planned verification commands, risk tier, and stable ACs with evidence policies. Acceptance freezes a normalized revision and content hash.</p><ExitGate>One accepted revision exists and every required behavior has a stable AC ID. Unresolved product choices remain explicit.</ExitGate></div>
              </section>
              <section>
                <span>02</span><div><h3>Select flow and compile when required</h3><p>The spec recommends <code>direct</code> or <code>planned</code>. Direct is only for low-risk, single-boundary work. Cross-layer, multi-repository, security, persistence, compatibility, concurrency, and critical changes require a planned mission DAG.</p><div className="easd-checklist"><strong>Compilation checks</strong><ul><li>Every required AC has an implementation or integration owner.</li><li>Every run has an explicit review mission.</li><li>Accepted proof commands belong to verification missions.</li><li>Target paths do not overlap accidentally.</li><li>Dependencies express contract or data order—not team hierarchy.</li><li>Integration and final review have named owners.</li><li>No mission prompt can broaden the accepted spec.</li></ul></div><ExitGate>Direct eligibility is server-validated, or one accepted Plan revision exists for the current accepted Spec hash.</ExitGate></div>
              </section>
              <section>
                <span>03</span><div><h3>Allocate</h3><p>Choose agents, models, reasoning, tools, permissions, repositories, and isolation according to each mission—not as one global model decision. Model choice is policy, never evidence.</p><div className="easd-table-wrap"><table><thead><tr><th>Responsibility</th><th>Default</th><th>Why</th></tr></thead><tbody><tr><td>Lead / convergence</td><td>GPT-5.6 Sol · high</td><td>Cross-mission reasoning and gate ownership</td></tr><tr><td>Architect</td><td>GPT-5.6 Sol · high</td><td>Public contracts and dependency design</td></tr><tr><td>Explorer</td><td>GPT-5.6 Luna or Terra · medium</td><td>Bounded source mapping</td></tr><tr><td>Builder</td><td>GPT-5.6 Terra · medium/high</td><td>Focused implementation</td></tr><tr><td>Independent verifier</td><td>GPT-5.6 Sol · high</td><td>Adversarial cross-criterion review</td></tr></tbody></table></div></div>
              </section>
              <section>
                <span>04</span><div><h3>Execute</h3><p>Agents work only inside their mission contract. Repository instructions, sandbox policy, path claims, worktrees, dependency gates, and permission prompts still apply. Discoveries can be communicated, but another mission owns any resulting change until ownership is explicitly revised.</p><p>Each delegation names the run, spec hash, plan hash when planned, mission ID, AC set, and bounded repository/path scope. The desired unit is a small commit or artifact snapshot that can be reviewed, rejected, retried, and traced independently.</p></div>
              </section>
              <section>
                <span>05</span><div><h3>Challenge</h3><p>After implementation missions are terminal, the user starts Review. Every handoff is a claim requiring examination. Runtime verification binds commands to the changed-file snapshot.</p><p>For isolated worktrees, evidence is admitted only after lead merge acceptance. Higher-risk runs add an independent reviewer who did not author the change. Review prose without sources is not machine evidence.</p></div>
              </section>
              <section>
                <span>06</span><div><h3>Verify and Converge</h3><p>Verify re-evaluates spec and plan hashes, the AC matrix, proof commands, integration, deviations, docs, and manual-required gaps. It produces a fresh CompletionContract bound to the current repository revision and may recommend convergence—but cannot call itself Done.</p><div className="easd-checklist"><strong>Done requires</strong><ul><li>An active accepted specification and matching accepted plan.</li><li>Every required AC passed or explicitly waived under policy.</li><li>Required machine and review evidence.</li><li>All missions terminal and accepted.</li><li>No blocking deviation open or merely approved.</li><li>Required cross-layer or critical independent review.</li><li>Spec/plan hashes and final Git revision in the report.</li></ul></div><p>A rejected convergence attempt is useful evidence. Its structured reasons drive rework and remain visible after success.</p></div>
              </section>
              <section>
                <span>07</span><div><h3>Learn</h3><p>After convergence, compare intended and actual execution: AC coverage, escaped defects, rejections, conflicts, deviations, critical path, parallel width, token/tool cost, allocation, and human interventions.</p><p>Learning may recommend a future allocation, but it cannot retroactively change the accepted specification or evidence trust level.</p></div>
              </section>
            </div>
          </section>

          <section className="easd-section" id="contracts">
            <p className="section-tag">06 / Contracts</p>
            <h2>Typed boundaries at every handoff.</h2>
            <div className="easd-contracts">
              <article><h3>Specification contract</h3><pre>{`title, problem, outcome
goals[], non_goals[], source_refs[], risk_tier
criteria[] = { id, statement, required, evidence_policy }`}</pre><p>Acceptance criteria must be observable and falsifiable. “Code is clean” is weak; “the 11th request inside one minute returns 429” names a boundary.</p></article>
              <article><h3>Optional Plan contract</h3><pre>{`spec_hash, review_required, integration_owner
missions[] = {
  id, kind, title, goal, acceptance_criteria[],
  target_repositories[], target_paths[], depends_on[],
  expected_output, constraints[], verification_commands[],
  isolation
}`}</pre><p>Planned graphs are acyclic, cover every required AC, stay inside Scope, and include independent review when policy requires it.</p></article>
              <article><h3>Mission contract</h3><pre>{`trace_run_id, trace_spec_hash
acceptance_criteria[]
goal, expected_output, constraints[], evidence_policy
target_paths[], dependencies[], isolation, target_repos[]`}</pre><p>Planned flow additionally requires the plan hash and plan mission ID. Mission IDs and attempts remain stable across rejection and rework.</p></article>
              <article><h3>Handoff contract</h3><pre>{`summary, findings[], exact revision/artifact
verification = { method, commands, exit codes, artifact hash }
criteria_results[] = {
  criterion_id, result, summary, evidence_ids[]
}
deviations[]`}</pre><p>Changed files without a passing runtime CompletionContract are not machine-verified delivery.</p></article>
            </div>
          </section>

          <section className="easd-section" id="evidence">
            <p className="section-tag">07 / Evidence and convergence</p>
            <h2>Proof keeps its type and provenance.</h2>
            <figure className="easd-evidence-figure"><img src="/generated/easd-evidence-gates-excalidraw.png" alt="EASD evidence model showing machine, review, manual, and waiver evidence feeding acceptance criteria and convergence gates" width="1536" height="1024" loading="lazy" /><figcaption><strong>Figure 2.</strong> Typed evidence feeds the AC matrix. Convergence gates yield either a computed Done verdict or structured rework.</figcaption></figure>
            <div className="easd-table-wrap"><table><thead><tr><th>Kind</th><th>Producer</th><th>Trust and use</th></tr></thead><tbody><tr><td><code>machine</code></td><td>EvoFlux runtime</td><td>Process result bound to command IDs and artifact or revision</td></tr><tr><td><code>review</code></td><td>Independent agent or human</td><td>Concrete inspection evidence with provenance</td></tr><tr><td><code>manual</code></td><td>User or lead</td><td>Explicit observation; never promoted to machine evidence</td></tr><tr><td><code>waiver</code></td><td>Authorized human</td><td>Accepts an unmet AC with a visible reason</td></tr></tbody></table></div>
            <div className="easd-callout"><strong>Trust boundary</strong><p>Public API and UI callers cannot manufacture machine evidence. Failed and inconclusive evidence remains in the ledger even after later success.</p></div>
            <h3 className="easd-subhead">Deviation contract</h3><p>A deviation records the originating spec hash, affected AC or mission, description, blocking state, proposed change, and resolution. Normative change requires a new accepted revision; the same hash may resolve only an explicitly non-normative clarification.</p>
          </section>

          <section className="easd-section" id="roles">
            <p className="section-tag">08 / Roles and separation of duties</p>
            <h2>Authority remains explicit.</h2>
            <div className="easd-role-grid">{roles.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
            <p className="easd-note">One actor may hold several roles for trivial or standard work. For cross-layer and critical work, author and verifier should be different. The service—not either actor—owns the final convergence calculation.</p>
          </section>

          <section className="easd-section" id="risk">
            <p className="section-tag">09 / Risk scaling</p>
            <h2>Ceremony is proportional to risk.</h2>
            <div className="easd-table-wrap"><table><thead><tr><th>Tier</th><th>Typical change</th><th>Minimum operating shape</th></tr></thead><tbody><tr><td><code>trivial</code></td><td>Typo, narrow docs, mechanical rename</td><td>One owner; manual or machine evidence; no forced fan-out</td></tr><tr><td><code>standard</code></td><td>Isolated feature or fix</td><td>Accepted ACs; focused mission; machine or review evidence</td></tr><tr><td><code>cross_layer</code></td><td>API, UI, data, or multiple owners</td><td>Mission DAG; isolation; machine evidence; independent integrated review</td></tr><tr><td><code>critical</code></td><td>Auth, permissions, migrations, concurrency, production</td><td>Human acceptance; isolation; failure tests; independent review; no self-waiver</td></tr></tbody></table></div>
            <p className="easd-note">Parallelism follows independent ownership. It is not a success metric; extra agents are wrong when coordination costs more than the work.</p>
          </section>

          <section className="easd-section" id="rework">
            <p className="section-tag">10 / Rework and anti-patterns</p>
            <h2>Failure remains visible and actionable.</h2>
            <div className="easd-rework-grid">
              <ol><li>Reject with criterion-specific issues.</li><li>Preserve failed evidence and rejection reason.</li><li>Increment the same mission attempt unless ownership or spec changed.</li><li>If the mission contract was wrong but intent holds, recompile the mission.</li><li>If intended behavior changed, record a blocking deviation and accept a new spec revision.</li><li>Rerun affected checks and independent review on the integrated result.</li></ol>
              <div className="easd-anti-grid">{antiPatterns.map(([title, copy]) => <article key={title}><strong>{title}</strong><p>{copy}</p></article>)}</div>
            </div>
          </section>

          <section className="easd-section" id="example">
            <p className="section-tag">11 / Worked example</p>
            <h2>Per-client rate limiting.</h2>
            <div className="easd-example">
              <div><span>AC-1</span><strong>11th request returns 429</strong></div><div><span>AC-2</span><strong>Window resets correctly</strong></div><div><span>AC-3</span><strong>Configuration is documented</strong></div>
              <p>The lead allocates a backend policy mission for AC-1 and AC-2, a config/help mission for AC-3, and an integrated verifier for all three. Builders work in disjoint paths or worktrees.</p>
              <p>A newly discovered distributed-limit requirement becomes a blocking deviation because distributed behavior was a non-goal. Convergence waits for a new accepted spec—or rejection of that deviation—plus accepted merges, machine tests, and independent review of the final revision.</p>
            </div>
          </section>

          <section className="easd-section" id="maturity">
            <p className="section-tag">12 / Maturity and governance</p>
            <h2>Evidence-gated today.<br />Learning toward tomorrow.</h2>
            <div className="easd-maturity">
              <div><span>0</span><strong>Prompted</strong><p>Completion is conversational.</p></div><div><span>1</span><strong>Specified</strong><p>Accepted specs exist; evidence is mostly manual.</p></div><div><span>2</span><strong>Traceable</strong><p>Missions map to ACs with durable attempts.</p></div><div className="active"><span>3</span><strong>Evidence-gated</strong><p>Evidence and deviations control convergence.</p></div><div><span>4</span><strong>Learning</strong><p>Validated outcomes improve future policy.</p></div>
            </div>
            <p>EvoFlux targets Level 3 and records metrics for Level 4. It does not claim autonomous self-improvement or automatic mission compilation today.</p>
            <div className="easd-governance"><strong>Method governance</strong><ul><li>Version the EASD schema and normative document together.</li><li>Treat feature, architecture, API, and Help pages as implemented product contracts.</li><li>Publish reproducible benchmark seed and final revisions, including failures.</li><li>Re-audit competitive first claims at release time; present EASD as EvoFlux&apos;s ADD protocol without claiming invention of SDD, ADD, multi-agent coding, or evidence-based engineering.</li></ul></div>
          </section>

          <section className="easd-section" id="faq">
            <p className="section-tag">13 / Frequently asked questions</p>
            <h2>EASD methodology FAQ.</h2>
            <div className="easd-faq">
              {faqItems.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
            </div>
          </section>
        </article>
      </div>

      <section className="easd-closing shell">
        <div><p className="section-tag">The convergence rule</p><h2>No accepted intent, no execution.<br />No evidence, no Done.</h2></div>
        <Link href="/#download" className="button primary">Download EvoFlux ↓</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
