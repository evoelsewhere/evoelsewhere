'use client';

import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

/** A shell command with a copy button. */
export function CopyCommand({ lines }: { lines: string[] }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard?.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  };
  return (
    <div className="cmd">
      <pre>{lines.map((line) => <span key={line}><b>$</b> {line}{'\n'}</span>)}</pre>
      <button type="button" onClick={copy} aria-label="Copy commands">{copied ? <FiCheck /> : <FiCopy />}<span>{copied ? 'Copied' : 'Copy'}</span></button>
    </div>
  );
}
