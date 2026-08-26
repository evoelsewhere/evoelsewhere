const providers = [
  { id: 'anthropic', label: 'Anthropic', color: '#D4A574', icon: 'anthropic.svg' },
  { id: 'googlegenai', label: 'Google Gemini', color: '#4285F4', icon: 'google.svg' },
  { id: 'vertexai', label: 'Vertex AI', color: '#4285F4', icon: 'google.svg' },
  { id: 'openai', label: 'OpenAI', color: '#10A37F', icon: 'openai.svg' },
  { id: 'codex', label: 'OpenAI Codex', color: '#10A37F', icon: 'openai.svg' },
  { id: 'openrouter', label: 'OpenRouter', color: '#8B5CF6', icon: 'openrouter.svg' },
  { id: 'zai', label: 'Z.AI', color: '#4B5563', icon: 'zai.svg' },
  { id: 'nvidia', label: 'NVIDIA NIM', color: '#76B900', icon: 'nvidia.svg' },
  { id: 'xai', label: 'xAI', color: '#60646c', icon: 'xai.svg' },
  { id: 'deepseek', label: 'DeepSeek', color: '#4D6BFE', icon: 'deepseek.svg' },
  { id: 'xiaomi', label: 'Xiaomi MiMo', color: '#FF6900', icon: 'xiaomimimo.svg' },
  { id: 'fci', label: 'FCI', color: '#F26522', image: 'fpt.svg' },
  { id: 'kimi', label: 'Kimi', color: '#7C3AED', icon: 'kimi.svg' },
  { id: 'router9', label: '9Router', color: '#60A5FA', initials: '9R' },
  { id: 'cliproxy', label: 'CLIProxy', color: '#F59E0B', initials: 'CP' },
  { id: 'ollama', label: 'Ollama', color: '#555B62', icon: 'ollama.svg' },
  { id: 'copilot', label: 'GitHub Copilot', color: '#6E40C9', icon: 'githubcopilot.svg' },
  { id: 'bedrock', label: 'AWS Bedrock', color: '#FF9900', icon: 'bedrock.svg' },
  { id: 'foundry', label: 'Azure AI Foundry', color: '#0078D4', icon: 'azureai.svg' },
] as const;

function ProviderLogo({ provider }: { provider: (typeof providers)[number] }) {
  if ('image' in provider) {
    return <img className="provider-logo-image" src={`/providers/${provider.image}`} alt="" />;
  }
  if ('icon' in provider) {
    return (
      <span
        className="provider-logo-mask"
        style={{
          backgroundColor: provider.color,
          WebkitMaskImage: `url(/providers/${provider.icon})`,
          maskImage: `url(/providers/${provider.icon})`,
        }}
        aria-hidden="true"
      />
    );
  }
  return <span className="provider-logo-initial" style={{ color: provider.color }}>{provider.initials}</span>;
}

export function ProviderMarquee() {
  return (
    <div className="provider-marquee" aria-label="19 supported model providers">
      <div className="provider-marquee-window">
        <div className="provider-marquee-track">
          {[0, 1].map((copy) => (
            <div className="provider-marquee-group" aria-hidden={copy === 1} key={copy}>
              {providers.map((provider) => (
                <div className="provider-chip" key={`${copy}-${provider.id}`} title={provider.label}>
                  <span className="provider-logo" style={{ borderColor: `${provider.color}38`, backgroundColor: `${provider.color}12` }}><ProviderLogo provider={provider} /></span>
                  <span>{provider.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
