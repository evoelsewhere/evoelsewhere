'use client';

import { type FormEvent, useState } from 'react';
import { FiArrowUp, FiCheck, FiPlus } from 'react-icons/fi';

const starterPrompts = [
  'Turn a rough idea into a clear plan',
  'Research the next frontier of intelligence',
  'Ship a landing page with evidence attached',
];

export function MissionComposer() {
  const [prompt, setPrompt] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim()) return;
    setSubmitted(true);
  }

  function choosePrompt(value: string) {
    setPrompt(value);
    setSubmitted(false);
  }

  return (
    <div className="mission-composer-wrap">
      <form className={`mission-composer ${submitted ? 'is-submitted' : ''}`} onSubmit={submit}>
        <label htmlFor="mission-prompt">What would you like to move forward?</label>
        <textarea id="mission-prompt" rows={2} value={prompt} onChange={(event) => { setPrompt(event.target.value); setSubmitted(false); }} placeholder="Start with an outcome…" />
        <div className="mission-composer-bar">
          <button className="composer-add" type="button" aria-label="Add context"><FiPlus aria-hidden="true" /></button>
          <span className="composer-context">Default access <i /></span>
          <span className="composer-model">EvoFlux / lead <i /></span>
          <button className="composer-submit" type="submit" aria-label="Start mission">{submitted ? <FiCheck aria-hidden="true" /> : <FiArrowUp aria-hidden="true" />}</button>
        </div>
      </form>
      <div className="composer-suggestions" aria-label="Suggested prompts">
        {starterPrompts.map((suggestion) => <button type="button" key={suggestion} onClick={() => choosePrompt(suggestion)}>{suggestion}<FiArrowUp aria-hidden="true" /></button>)}
      </div>
      {submitted && <p className="composer-feedback" role="status"><FiCheck aria-hidden="true" /> Mission brief captured. EvoFlux is ready for the next step.</p>}
    </div>
  );
}
