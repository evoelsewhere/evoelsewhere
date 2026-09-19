'use client';

import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiCheck, FiCpu, FiFileText, FiShield, FiZap } from 'react-icons/fi';

const stages = [
  {
    id: 'brief',
    code: '01 / BRIEF',
    label: 'Brief',
    title: 'Turn the fog into a shape.',
    copy: 'Start with an outcome. EvoFlux keeps the why, the context, and the constraints together before anything gets delegated.',
    icon: FiFileText,
    color: 'rose',
    events: ['Outcome captured', 'Constraints pinned', 'Acceptance criteria drafted'],
    stat: '1 brief',
  },
  {
    id: 'route',
    code: '02 / ROUTE',
    label: 'Route',
    title: 'Give every question a specialist.',
    copy: 'A lead agent breaks the mission into focused tracks, then chooses the models, tools, and permissions each track actually needs.',
    icon: FiCpu,
    color: 'violet',
    events: ['Lead decomposed the mission', '3 specialists activated', 'Parallel work is moving'],
    stat: '3 agents',
  },
  {
    id: 'build',
    code: '03 / BUILD',
    label: 'Build',
    title: 'Keep the context in the room.',
    copy: 'Research, files, browser work, code, and previews stay connected so an agent can make the next change without starting over.',
    icon: FiZap,
    color: 'mint',
    events: ['Research synthesized', 'Artifact updated live', 'Changes stay inspectable'],
    stat: '7 artifacts',
  },
  {
    id: 'verify',
    code: '04 / VERIFY',
    label: 'Verify',
    title: 'Make “done” earn its name.',
    copy: 'Evidence, review, and rework are part of the same loop. Ship the result with the receipts attached.',
    icon: FiShield,
    color: 'blue',
    events: ['Acceptance criteria checked', 'Review signal attached', 'Ready for handoff'],
    stat: '100% proof',
  },
];

export function MissionLab() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % stages.length), 4400);
    return () => window.clearInterval(timer);
  }, []);

  const stage = stages[active];
  const Icon = stage.icon;

  return (
    <div className={`mission-lab lab-${stage.color}`}>
      <div className="mission-lab-tabs" role="tablist" aria-label="EvoFlux mission stages">
        {stages.map((item, index) => (
          <button key={item.id} className={index === active ? 'is-active' : ''} type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)}>
            <span>0{index + 1}</span><strong>{item.label}</strong><i />
          </button>
        ))}
      </div>
      <div className="mission-lab-panel">
        <div className="mission-lab-copy">
          <span className="mission-lab-code">{stage.code}</span>
          <h3 key={stage.id}>{stage.title}</h3>
          <p key={`${stage.id}-copy`}>{stage.copy}</p>
          <div className="mission-lab-stat"><span className="mission-lab-stat-icon"><Icon /></span><strong>{stage.stat}</strong><span>in motion now</span></div>
        </div>
        <div className="mission-lab-visual" aria-label={`${stage.label} stage visualization`}>
          <div className="lab-grid" />
          <div className="lab-scan" />
          <div className="lab-ring ring-a" />
          <div className="lab-ring ring-b" />
          <div className="lab-ring ring-c" />
          <div className="lab-core"><span><Icon /></span><strong>{stage.label}</strong><small>{stage.code}</small></div>
          <div className="lab-node lab-node-a"><i /><span>{stage.events[0]}</span></div>
          <div className="lab-node lab-node-b"><i /><span>{stage.events[1]}</span></div>
          <div className="lab-node lab-node-c"><i /><span>{stage.events[2]}</span></div>
          <div className="lab-connector connector-a" />
          <div className="lab-connector connector-b" />
          <div className="lab-connector connector-c" />
          <span className="lab-corner corner-tl">EVOFLUX / LIVE</span>
          <span className="lab-corner corner-br">SYNCED <FiCheck /></span>
        </div>
      </div>
      <div className="mission-lab-foot"><span>Switch stages to inspect the loop</span><span><span className="lab-live-dot" /> auto-cycling</span><a href="#download">Start a mission <FiArrowUpRight /></a></div>
    </div>
  );
}
