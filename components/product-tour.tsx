'use client';

import { useState } from 'react';

const features = [
  {
    id: 'work', eyebrow: 'Work mode', title: 'Start from an outcome—not a repository.',
    description: 'Research, documents, data, browser work, quick scripts, memory, and scheduled tasks share one local execution workspace.',
    image: '/showcase/evoflux-light-work.png', alt: 'EvoFlux Work mode in the light theme with workspace tools and usage overview',
    points: ['Outcome-first execution', 'Files, browser, memory, scheduler', 'Temporary or durable workspaces'],
  },
  {
    id: 'coding', eyebrow: 'Coding + EASD', title: 'Build beside the code and its specification.',
    description: 'Coding mode keeps the agent conversation, repository context, source changes, and Evo Agent Specs in one inspectable project surface.',
    image: '/showcase/evoflux-light-coding-easd.png', alt: 'EvoFlux Coding mode with an agent conversation and Evo Agent Specs setup panel in the light theme',
    points: ['Multi-repository projects', 'Evo Agent Specs', 'Git and code context'],
  },
  {
    id: 'models', eyebrow: 'Model providers', title: 'Choose the right model for every role.',
    description: 'Connect direct APIs, subscription OAuth, routed providers, cloud platforms, and local runtimes from one provider catalog.',
    image: '/showcase/evoflux-light-providers.png', alt: 'EvoFlux provider catalog in the light theme',
    points: ['19 provider integrations', 'Per-agent model choice', 'Hosted, routed, or local'],
  },
  {
    id: 'teams', eyebrow: 'Agent teams', title: 'One lead. Specialists on demand.',
    description: 'Build separate Work and Coding rosters. Give every agent one role, one model, and a focused capability set.',
    image: '/showcase/evoflux-light-agent-teams.png', alt: 'EvoFlux agent team settings in the light theme',
    points: ['Role-focused specialists', 'Independent review', 'Parallel mission ownership'],
  },
  {
    id: 'telemetry', eyebrow: 'Telemetry', title: 'Inspect the cost and shape of execution.',
    description: 'Review turns, tool calls, latency, token volume, failure spans, and estimated cost without sending local observability data elsewhere by default.',
    image: '/showcase/evoflux-light-telemetry.png', alt: 'EvoFlux telemetry dashboard in the light theme',
    points: ['Latency and failure traces', 'Token and cost trends', 'Local observability'],
  },
  {
    id: 'sandbox', eyebrow: 'Sandbox', title: 'Make execution boundaries explicit.',
    description: 'Control filesystem access, host environment inheritance, command execution, and sensitive outbound data before it leaves the session.',
    image: '/showcase/evoflux-light-sandbox.png', alt: 'EvoFlux sandbox and outbound data protection controls in the light theme',
    points: ['Denied-path policy', 'Secret and personal-data controls', 'Process isolation'],
  },
  {
    id: 'memory', eyebrow: 'Memory', title: 'Turn raw evidence into durable knowledge.',
    description: 'Keep source material separate, synthesize curated pages, and let agents recall reviewed knowledge across later conversations.',
    image: '/showcase/evoflux-light-memory.png', alt: 'EvoFlux Memory settings and synthesis workflow in the light theme',
    points: ['Capture, synthesize, recall', 'Source-backed pages', 'Scheduled Dream synthesis'],
  },
  {
    id: 'language-servers', eyebrow: 'Language servers', title: 'Bring semantic feedback into every project.',
    description: 'Detect project languages, install pinned servers with confirmation, and reuse managed or system language servers across repositories.',
    image: '/showcase/evoflux-light-language-servers.png', alt: 'EvoFlux language server management in the light theme',
    points: ['Automatic language detection', 'Managed server cache', 'Repository-aware diagnostics'],
  },
] as const;

export function ProductTour() {
  const [activeId, setActiveId] = useState<(typeof features)[number]['id']>('coding');
  const active = features.find((feature) => feature.id === activeId) ?? features[1];

  return (
    <div className="tour-shell">
      <div className="tour-tabs" role="tablist" aria-label="EvoFlux feature tour">
        {features.map((feature, index) => (
          <button key={feature.id} type="button" role="tab" aria-selected={active.id === feature.id} className="tour-tab" onClick={() => setActiveId(feature.id)}>
            <span>0{index + 1}</span><strong>{feature.eyebrow}</strong>
          </button>
        ))}
      </div>
      <div className="tour-stage" role="tabpanel">
        <div className="tour-copy">
          <p className="section-tag">{active.eyebrow}</p>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <ul>{active.points.map((point) => <li key={point}>{point}</li>)}</ul>
        </div>
        <figure className="tour-image">
          <img src={active.image} alt={active.alt} />
        </figure>
      </div>
    </div>
  );
}
