// Model providers Evo Harness connects to, scrolling past. The logos are
// single-colour SVGs used as masks so they follow the theme's ink.

const PROVIDERS = [
  ['openai', 'OpenAI'],
  ['google', 'Google'],
  ['anthropic', 'Anthropic'],
  ['deepseek', 'DeepSeek'],
  ['githubcopilot', 'GitHub Copilot'],
  ['openrouter', 'OpenRouter'],
  ['xai', 'xAI'],
  ['kimi', 'Moonshot'],
  ['zai', 'Z.ai'],
  ['bedrock', 'Amazon Bedrock'],
  ['azureai', 'Azure AI'],
  ['nvidia', 'NVIDIA'],
  ['xiaomimimo', 'Xiaomi MiMo'],
  ['fpt', 'FPT AI'],
  ['ollama', 'Ollama'],
] as const;

export function ProviderMarquee() {
  const row = PROVIDERS.map(([id, label]) => (
    <span key={id} className="pm-item">
      <i style={{ maskImage: `url(/providers/${id}.svg)`, WebkitMaskImage: `url(/providers/${id}.svg)` }} aria-hidden="true" />
      {label}
    </span>
  ));
  return (
    <div className="pm" role="img" aria-label={`Works with ${PROVIDERS.map(([, label]) => label).join(', ')} and other providers listed on models.dev`}>
      <div className="pm-track" aria-hidden="true">{row}{row}</div>
    </div>
  );
}
