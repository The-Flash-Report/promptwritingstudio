function renderOutput(text) {
  if (!text) return null;
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
  const parts = [];
  let last = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ type: 'text', content: text.slice(last, match.index) });
    }
    parts.push({ type: 'code', lang: match[1], content: match[2].trimEnd() });
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push({ type: 'text', content: text.slice(last) });
  }

  return parts.map((part, i) => {
    if (part.type === 'code') {
      return (
        <pre
          key={i}
          className="bg-gray-900 text-green-300 text-xs p-3 rounded overflow-x-auto my-2 font-mono"
        >
          <code>{part.content}</code>
        </pre>
      );
    }
    return (
      <p key={i} className="whitespace-pre-wrap text-[#333333] text-sm leading-relaxed">
        {part.content.trim()}
      </p>
    );
  });
}

export default function ShownIO({ prompt, testInput, output, model }) {
  return (
    <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
      <div className="bg-[#F9F9F9] border-b border-[#E5E5E5] px-4 py-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prompt</span>
      </div>
      <div className="px-4 py-3">
        <pre className="text-sm text-[#333333] whitespace-pre-wrap font-mono leading-relaxed">
          {prompt}
        </pre>
        {testInput && (
          <div className="mt-2 text-xs text-gray-400 border-t border-[#E5E5E5] pt-2">
            Test input:{' '}
            {Object.entries(testInput.vars).map(([k, v]) => (
              <span key={k} className="mr-2">
                <span className="font-medium">{k}</span>:{' '}
                <code className="bg-gray-100 px-1 rounded">{String(v).slice(0, 60)}{String(v).length > 60 ? '…' : ''}</code>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#F9F9F9] border-t border-b border-[#E5E5E5] px-4 py-2 flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Output</span>
        {model && (
          <span className="text-xs font-mono bg-white border border-[#E5E5E5] px-2 py-0.5 rounded text-[#1A1A1A]">
            {model}
          </span>
        )}
      </div>
      <div className="px-4 py-3 space-y-2">
        {renderOutput(output)}
      </div>
    </div>
  );
}
