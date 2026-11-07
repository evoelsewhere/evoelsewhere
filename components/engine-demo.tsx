'use client';

import { useEffect, useRef, useState } from 'react';
import { FiAlertTriangle, FiCpu, FiDatabase, FiMonitor, FiRotateCw, FiZap } from 'react-icons/fi';

import { useInView, useReducedMotion } from '@/components/motion';

// One engine process per chat: the window relays JSONL to each engine; when
// one crashes the others keep going and the window stays up.

type Status = 'running' | 'idle' | 'crashed' | 'restarting';

const CHATS = [
  { id: 'a', title: 'Retry web_fetch on 429', model: 'gpt-5.1' },
  { id: 'b', title: 'Write the 4.0 release notes', model: 'gemini-3-pro' },
  { id: 'c', title: 'Profile chat search', model: 'qwen3-coder · local' },
];

export function EngineDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Record<string, Status>>({ a: 'running', b: 'running', c: 'idle' });
  const [tokens, setTokens] = useState({ a: 18200, b: 9400, c: 3100 });
  const timers = useRef<number[]>([]);
  const current = useRef(status);
  useEffect(() => {
    current.current = status;
  }, [status]);

  const crash = () => {
    const b = current.current.b;
    if (b !== 'running' && b !== 'idle') return;
    timers.current.forEach(clearTimeout);
    setStatus((s) => ({ ...s, b: 'crashed' }));
    timers.current = [
      window.setTimeout(() => setStatus((s) => ({ ...s, b: 'restarting' })), 1600),
      window.setTimeout(() => setStatus((s) => ({ ...s, b: 'running' })), 2800),
    ];
  };

  // Tokens keep streaming on running engines.
  useEffect(() => {
    if (!inView || reduced) return;
    const timer = window.setInterval(() => {
      setTokens((t) => ({
        a: status.a === 'running' ? t.a + 37 : t.a,
        b: status.b === 'running' ? t.b + 23 : t.b,
        c: status.c === 'running' ? t.c + 11 : t.c,
      }));
    }, 120);
    return () => window.clearInterval(timer);
  }, [inView, reduced, status]);

  // Left alone, the demo crashes one engine now and then and wakes the idle one.
  useEffect(() => {
    if (!inView || reduced) return;
    const auto = window.setInterval(() => {
      crash();
      setStatus((s) => ({ ...s, c: s.c === 'idle' ? 'running' : 'idle' }));
    }, 7000);
    return () => window.clearInterval(auto);
  }, [inView, reduced]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <div className="engine-demo" ref={ref}>
      <div className="ed-window">
        <div className="ed-label"><FiMonitor /> Evo Harness window</div>
        {CHATS.map((chat) => (
          <div key={chat.id} className={`ed-chat is-${status[chat.id]}`}>
            <span className="ed-dot" />
            <span className="ed-chat-title">{chat.title}</span>
            <span className="ed-chat-state">
              {status[chat.id] === 'crashed' ? 'engine stopped' : status[chat.id] === 'restarting' ? 'reconnecting…' : status[chat.id]}
            </span>
          </div>
        ))}
        <div className="ed-window-foot">Window stays up · sessions saved as they run</div>
      </div>

      <div className="ed-lanes" aria-hidden="true">
        {CHATS.map((chat) => (
          <div key={chat.id} className={`ed-lane is-${status[chat.id]}`}>
            <span className="ed-packet" />
            <span className="ed-packet ed-packet-2" />
            <span className="ed-packet ed-packet-back" />
          </div>
        ))}
        <span className="ed-lanes-label">JSONL · stdin / stdout</span>
      </div>

      <div className="ed-engines">
        {CHATS.map((chat) => (
          <div key={chat.id} className={`ed-engine is-${status[chat.id]}`}>
            <div className="ed-engine-top">
              {status[chat.id] === 'crashed' ? <FiAlertTriangle /> : status[chat.id] === 'restarting' ? <FiRotateCw className="spin" /> : <FiCpu />}
              <strong>evo-engine</strong>
              <span>pid {chat.id === 'a' ? 4182 : chat.id === 'b' ? (status.b === 'running' ? 4377 : 4190) : 4203}</span>
            </div>
            <div className="ed-engine-meta">
              <span>{chat.model}</span>
              <span>{tokens[chat.id as 'a'].toLocaleString('en-US')} tok</span>
            </div>
          </div>
        ))}
      </div>

      <div className="ed-side">
        <div className="ed-side-card"><FiZap /> Model providers <small>HTTPS · streaming</small></div>
        <div className="ed-side-card"><FiDatabase /> Your machine <small>~/.evo/agent · project folders</small></div>
      </div>

      <button type="button" className="ed-crash" onClick={crash} disabled={status.b === 'crashed' || status.b === 'restarting'}>
        <FiAlertTriangle /> Crash an engine
      </button>
    </div>
  );
}
