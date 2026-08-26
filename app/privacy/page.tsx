import type { Metadata } from 'next';

import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { SITE_NAME } from '@/lib/seo';

const description = 'Privacy practices and data boundaries for EvoFlux Desktop, Evo Conductor, the EvoFlux WebBridge extension, and evoelsewhere.asia.';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description,
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Privacy Policy | EvoFlux',
    description,
    url: '/privacy',
    siteName: SITE_NAME,
    images: [],
  },
  twitter: { card: 'summary', title: 'Privacy Policy | EvoFlux', description, images: [] },
};

const toc = [
  ['scope', 'Scope'],
  ['website', 'Website'],
  ['evoflux', 'EvoFlux Desktop'],
  ['conductor', 'Evo Conductor'],
  ['webbridge', 'WebBridge Extension'],
  ['shared', 'Shared practices'],
  ['security', 'Security & retention'],
  ['transfers', 'International transfers'],
  ['rights', 'Rights & choices'],
  ['children', 'Children'],
  ['changes', 'Changes'],
  ['contact', 'Contact'],
];

export default function PrivacyPage() {
  return (
    <main className="privacy-main">
      <SiteHeader />

      <header className="privacy-hero shell">
        <p className="section-tag">Legal / Privacy</p>
        <h1>Three products.<br />Three data boundaries.</h1>
        <p>This policy separates how EvoFlux Desktop, Evo Conductor, and the EvoFlux WebBridge extension handle information. Shared website and legal practices are covered after the product-specific sections.</p>
        <div className="privacy-meta"><span>Effective: August 26, 2026</span><span>Version 1.1</span><span>No advertising · No sale of personal data</span></div>
      </header>

      <nav className="privacy-product-grid shell" aria-label="Product privacy areas">
        <a href="#evoflux" className="privacy-product-card privacy-product-flux"><span>01 · Desktop</span><strong>EvoFlux</strong><p>Local workspace, agents, models, tools, memory, and artifacts.</p><b>Local by default →</b></a>
        <a href="#conductor" className="privacy-product-card privacy-product-conductor"><span>02 · Control plane</span><strong>Evo Conductor</strong><p>Members, policies, shared resources, secrets, and fleet telemetry.</p><b>Operator controlled →</b></a>
        <a href="#webbridge" className="privacy-product-card privacy-product-bridge"><span>03 · Browser extension</span><strong>WebBridge</strong><p>Authorized tabs, page context, screenshots, Side Chat, and browser actions.</p><b>User supervised →</b></a>
      </nav>

      <div className="privacy-layout shell">
        <aside className="privacy-toc" aria-label="Privacy policy contents">
          <strong>On this page</strong>
          {toc.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </aside>

        <article className="privacy-policy">
          <div className="privacy-summary">
            <strong>The short version</strong>
            <p>EvoFlux keeps work on your device by default. Evo Conductor is governed by the organization operating it. WebBridge acts only for browser tabs connected to an authorized EvoFlux session. Data leaves these boundaries only when a feature, provider, tool, or operator configuration requires it.</p>
          </div>

          <section className="policy-section" id="scope">
            <h2>1. Scope</h2>
            <p>This policy applies to <strong>evoelsewhere.asia</strong>, EvoFlux Desktop, Evo Conductor, and the EvoFlux WebBridge browser extension.</p>
            <p>Open-source code, issues, discussions, releases, and downloads hosted by GitHub are subject to GitHub&apos;s privacy terms. Model providers, MCP servers, plugins, cloud platforms, and other connected services apply their own practices.</p>
            <p className="policy-note">For an organization-operated Evo Conductor deployment, that organization determines the purpose and means of processing. Its privacy notice may apply in addition to this policy.</p>
          </section>

          <section className="policy-section" id="website">
            <h2>2. Website</h2>
            <p>Hosting and delivery providers may automatically process standard request information such as IP address, browser and device type, requested URL, timestamps, referrer, and security events. This is used to deliver the site, prevent abuse, and diagnose availability.</p>
            <div className="privacy-facts"><div><span>Analytics</span><strong>None configured</strong></div><div><span>Advertising</span><strong>None</strong></div><div><span>Marketing account</span><strong>Not required</strong></div><div><span>Security logs</span><strong>Operational only</strong></div></div>
          </section>

          <section className="policy-section privacy-product-policy privacy-policy-flux" id="evoflux">
            <div className="privacy-policy-title"><span>01 · Desktop workspace</span><h2>EvoFlux</h2><p>Personal execution runs locally unless you explicitly connect an external service.</p></div>
            <div className="privacy-facts"><div><span>Default storage</span><strong>Your device</strong></div><div><span>Primary controller</span><strong>You</strong></div><div><span>External data</span><strong>Feature-dependent</strong></div><div><span>Retention</span><strong>User controlled</strong></div></div>

            <div className="privacy-subgrid">
              <section><h3>Information processed</h3><ul><li>Workspace paths, project files, repository metadata, code indexes, and language-server diagnostics.</li><li>Prompts, agent messages, tool results, plans, specifications, evidence, memory, schedules, and generated artifacts.</li><li>Agent, model, skill, plugin, MCP, permission, sandbox, connection, and appearance settings.</li><li>Operational logs, local telemetry, performance metrics, and diagnostics.</li><li>Credentials or tokens for providers and integrations you configure, stored through designated credential storage.</li></ul></section>
              <section><h3>How it is used</h3><ul><li>Execute Work and Coding requests.</li><li>Maintain project and session context.</li><li>Coordinate agents and verify their work.</li><li>Apply sandbox, permission, and outbound-data policies.</li><li>Diagnose failures and support updates.</li></ul></section>
              <section><h3>When data leaves the device</h3><p>Local-first does not mean never leaves the device. EvoFlux sends the information required for an action when you choose a hosted model, remote MCP server, plugin, cloud service, website, or other connected provider.</p><p>The provider receives only what the selected action and current permission scope make available, but its own privacy and retention terms then apply.</p></section>
              <section><h3>Your controls</h3><ul><li>Delete local sessions, memory, artifacts, configuration, and application data.</li><li>Disconnect providers and revoke integration credentials.</li><li>Disable plugins, Skills, and MCP servers.</li><li>Change filesystem, process, shell, and outbound-data permissions.</li><li>Choose a local model instead of a hosted model where supported.</li></ul></section>
            </div>
          </section>

          <section className="policy-section privacy-product-policy privacy-policy-conductor" id="conductor">
            <div className="privacy-policy-title"><span>02 · Organization control plane</span><h2>Evo Conductor</h2><p>The deployment operator controls storage, access, telemetry level, integrations, and retention.</p></div>
            <div className="privacy-facts"><div><span>Default storage</span><strong>Operator selected</strong></div><div><span>Primary controller</span><strong>Your organization</strong></div><div><span>Access</span><strong>Role governed</strong></div><div><span>Retention</span><strong>Operator policy</strong></div></div>

            <div className="privacy-subgrid">
              <section><h3>Information processed</h3><ul><li>Member identity, account details, roles, teams, tags, and account status.</li><li>Password or SSO identifiers, browser sessions, and revocable connection tokens.</li><li>Shared agents, Skills, plugins, MCP resources, versions, and access policies.</li><li>Secrets metadata, resource inventory, installations, feedback, and synchronization state.</li><li>Configured levels of usage, request, model, tool, cost, and effectiveness telemetry.</li></ul></section>
              <section><h3>How it is used</h3><ul><li>Authenticate and authorize members.</li><li>Publish and deliver governed resources.</li><li>Apply role, team, and member access policy.</li><li>Coordinate realtime resource invalidation and sync.</li><li>Provide usage, reliability, and effectiveness reporting when enabled.</li></ul></section>
              <section><h3>Operator responsibilities</h3><p>The operator chooses SQLite or another supported database, object storage, SSO, external integrations, telemetry level, member access, and retention. It must provide members with any additional notice required by its jurisdiction or employment relationship.</p></section>
              <section><h3>Member controls</h3><ul><li>Review resources and access granted through the console.</li><li>Create or revoke personal connection secrets where allowed.</li><li>Contact the organization administrator for access, correction, deletion, export, or retention requests.</li><li>Disconnect the EvoFlux installation from the Conductor instance.</li></ul></section>
            </div>
          </section>

          <section className="policy-section privacy-product-policy privacy-policy-bridge" id="webbridge">
            <div className="privacy-policy-title"><span>03 · Browser extension</span><h2>EvoFlux WebBridge</h2><p>Browser access is session-bound, visible, and supervised by the user.</p></div>
            <div className="privacy-facts"><div><span>Default storage</span><strong>Browser + EvoFlux</strong></div><div><span>Control</span><strong>User supervised</strong></div><div><span>Remote code</span><strong>None</strong></div><div><span>Tab access</span><strong>Authorized session</strong></div></div>

            <div className="privacy-subgrid">
              <section><h3>Information processed</h3><ul><li>Website content, URLs, tab IDs, titles, lifecycle state, and page metadata.</li><li>Screenshots, selected text, elements, readable page context, and files you attach.</li><li>Browser actions, Side Chat messages, page watches, task recordings, and handoff state.</li><li>Extension settings, connection state, tab/session bindings, editable drafts, and temporary operational state.</li></ul></section>
              <section><h3>Browser capabilities</h3><ul><li>Navigate and manage authorized tabs.</li><li>Read pages, elements, screenshots, and accessibility information.</li><li>Perform supervised clicks, typing, selection, waits, and responsive testing.</li><li>Show Side Chat, context actions, teach mode, and page watches.</li></ul></section>
              <section><h3>When content is submitted</h3><p>Context-menu actions create an editable Side Chat draft; nothing is sent until you review and submit it. Page context, screenshots, selections, and files explicitly sent to EvoFlux may then be provided to the model or tool you selected.</p><p>WebBridge does not use remotely hosted executable code. Automation code ships with the extension package.</p></section>
              <section><h3>Your controls</h3><ul><li>Take control to pause agent commands or release control entirely.</li><li>Resume only when ready.</li><li>Cancel page watches and task recording.</li><li>Delete captured artifacts where the feature provides deletion.</li><li>Disconnect or uninstall the extension.</li><li>Secret handoff is designed so values entered directly on a page are not read back into the agent transcript.</li></ul></section>
            </div>
          </section>

          <section className="policy-section" id="shared">
            <h2>6. Shared practices</h2>
            <h3>How information is used</h3><p>Across the Services, information is processed to deliver and secure features, execute your instructions through selected models and tools, maintain state and evidence, provide updates and documentation, operate configured organization features, and respond to support, security, privacy, and legal requests.</p>
            <h3>When information is shared</h3><p>We do not sell personal information or share it for cross-context behavioral advertising. Information may be disclosed to hosting and security providers; services you configure or invoke; authorized Conductor operators and members; or where necessary to protect users, investigate abuse, comply with law, or complete a reorganization subject to appropriate safeguards.</p>
            <p>Public Git repositories, issues, discussions, and contributions are public by design. Do not publish secrets or personal information you do not want disclosed.</p>
            <h3>Legal bases</h3><p>Where applicable law requires a legal basis, processing may rely on performance of a contract, legitimate interests in operating secure Services, compliance with law, or consent. Consent may be withdrawn for future processing where it is the basis.</p>
          </section>

          <section className="policy-section" id="security">
            <h2>7. Security and retention</h2>
            <p>EvoFlux uses scoped permissions, sandbox policy, outbound-data controls, credential storage, inspectable history, and signed update mechanisms. Conductor supports role-based access, revocable sessions and tokens, and deployment-controlled storage. WebBridge uses explicit browser-control handoffs and bounded operational state.</p>
            <ul><li><strong>EvoFlux:</strong> local information remains until you delete it, remove application data, or a feature-specific rule removes it.</li><li><strong>Conductor:</strong> retention is controlled by the deployment operator.</li><li><strong>WebBridge:</strong> pending handoffs, watches, drafts, bindings, and captured artifacts use bounded or feature-specific retention.</li><li><strong>Website:</strong> security logs are retained only as reasonably necessary for operations, abuse prevention, and legal compliance.</li></ul>
            <p>No system guarantees absolute security. Keep software current, review permissions, protect credentials, and report suspected vulnerabilities through a private security channel.</p>
          </section>

          <section className="policy-section" id="transfers">
            <h2>8. International transfers</h2>
            <p>The website and connected services may process information in countries other than your own. When required, appropriate transfer safeguards apply. Your selected model, cloud, plugin, or organization providers may use different locations; review their documentation before connecting sensitive work.</p>
          </section>

          <section className="policy-section" id="rights">
            <h2>9. Your rights and choices</h2>
            <p>Depending on where you live, you may have rights to access, correct, delete, restrict, object to, or receive a portable copy of personal information, and to appeal or complain to a data protection authority.</p>
            <ul><li>Use EvoFlux and WebBridge controls for local data, connections, permissions, and browser access.</li><li>For organization-managed Conductor data, contact the organization administrator first.</li><li>For website or project-maintainer requests, contact the address below. Verification may be required.</li></ul>
          </section>

          <section className="policy-section" id="children"><h2>10. Children</h2><p>The Services are intended for software professionals and organizations, not children under 13 or the minimum age required by local law. We do not knowingly collect children&apos;s personal information through this website.</p></section>
          <section className="policy-section" id="changes"><h2>11. Changes</h2><p>We may update this policy when Services, providers, or legal requirements change. The revised version and effective date will be posted here. Material changes may also be announced in release notes or another appropriate channel.</p></section>
          <section className="policy-section" id="contact"><h2>12. Contact</h2><p>For privacy questions or requests, email <a href="mailto:privacy@evoelsewhere.asia">privacy@evoelsewhere.asia</a>. For security vulnerabilities, use the private security reporting channel provided in the relevant Evo Elsewhere GitHub repository.</p><p>This product-operational draft should be reviewed against the final hosting setup, organization identity, contact channels, and applicable law before public launch.</p></section>
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
