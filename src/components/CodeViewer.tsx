import React, { useState } from 'react';
import { PythonCodeVersion, CodeLineAnnotation } from '../types/index.ts';
import { Copy, Check, Download, Play, Info, ChevronRight } from 'lucide-react';

interface CodeViewerProps {
  version: PythonCodeVersion;
  onRunInTerminal: (codeVersion: PythonCodeVersion) => void;
  onDownload: () => void;
}

// Lightweight, resilient Python syntax tokenizer for high readability
function highlightPythonLine(line: string): React.ReactNode {
  // Check if whole line is comment
  const trimmed = line.trim();
  if (trimmed.startsWith('#')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Handle inline comments
  const commentIndex = line.indexOf(' #');
  if (commentIndex !== -1 && !line.slice(0, commentIndex).includes('"') && !line.slice(0, commentIndex).includes("'")) {
    const codePart = line.slice(0, commentIndex);
    const commentPart = line.slice(commentIndex);
    return (
      <>
        {renderHighlightedCodeTokens(codePart)}
        <span className="text-slate-500 italic">{commentPart}</span>
      </>
    );
  }

  return renderHighlightedCodeTokens(line);
}

function renderHighlightedCodeTokens(code: string): React.ReactNode {
  // Regex splitting by strings, keywords, numbers, punctuation
  const tokenRegex = /(f?"(?:[^"\\]|\\.)*"|f?'(?:[^'\\]|\\.)*'|\b(?:def|return|if|elif|else|while|break|continue|try|except|float|int|input|print|in|not|and|or|True|False)\b|\b\d+(?:\.\d+)?\b|[a-zA-Z_]\w*|[^\s\w])/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      parts.push(code.substring(lastIndex, match.index));
    }

    const token = match[0];

    // String literals
    if (token.startsWith('"') || token.startsWith("'") || token.startsWith('f"') || token.startsWith("f'")) {
      parts.push(
        <span key={match.index} className="text-emerald-300">
          {token}
        </span>
      );
    }
    // Keywords
    else if (/^(def|return|if|elif|else|while|break|continue|try|except|in|not|and|or)$/.test(token)) {
      parts.push(
        <span key={match.index} className="text-amber-400 font-semibold">
          {token}
        </span>
      );
    }
    // Builtins
    else if (/^(float|int|input|print)$/.test(token)) {
      parts.push(
        <span key={match.index} className="text-cyan-300">
          {token}
        </span>
      );
    }
    // Booleans
    else if (/^(True|False)$/.test(token)) {
      parts.push(
        <span key={match.index} className="text-purple-300 font-semibold">
          {token}
        </span>
      );
    }
    // Numbers
    else if (/^\d+(?:\.\d+)?$/.test(token)) {
      parts.push(
        <span key={match.index} className="text-orange-300 font-mono">
          {token}
        </span>
      );
    }
    // Function definition names
    else if (/^[a-zA-Z_]\w*$/.test(token)) {
      // Check if preceded by 'def '
      const beforeToken = code.substring(0, match.index).trimEnd();
      if (beforeToken.endsWith('def')) {
        parts.push(
          <span key={match.index} className="text-blue-300 font-semibold">
            {token}
          </span>
        );
      } else {
        parts.push(token);
      }
    } else {
      parts.push(token);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    parts.push(code.substring(lastIndex));
  }

  return <>{parts}</>;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  version,
  onRunInTerminal,
  onDownload
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<CodeLineAnnotation | null>(
    version.annotations[0] || null
  );

  const lines = version.code.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(version.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const findAnnotation = (lineNumber: number): CodeLineAnnotation | undefined => {
    return version.annotations.find((a) => a.lineNumber === lineNumber);
  };

  return (
    <section id="codigo" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
              Código Completo & Didático
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {version.title}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {version.subtitle}
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>

            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Salvar .py</span>
            </button>

            <button
              onClick={() => onRunInTerminal(version)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Executar Código</span>
            </button>
          </div>
        </div>

        {/* Grid: Code Editor on Left, Interactive Line Tutor on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Code Box */}
          <div className="lg:col-span-8 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-slate-400 ml-2 font-medium">
                  {version.filename}
                </span>
              </div>
              <div className="text-slate-500 font-mono text-[11px] hidden sm:block">
                Clique nas linhas com indicador para ver a explicação
              </div>
            </div>

            {/* Scrollable Code Content */}
            <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed max-h-[580px] overflow-y-auto">
              <div className="min-w-[500px]">
                {lines.map((line, idx) => {
                  const lineNumber = idx + 1;
                  const annotation = findAnnotation(lineNumber);
                  const isSelected = selectedAnnotation?.lineNumber === lineNumber;

                  return (
                    <div
                      key={lineNumber}
                      onClick={() => {
                        if (annotation) {
                          setSelectedAnnotation(annotation);
                        }
                      }}
                      className={`group flex items-start gap-4 px-2 py-0.5 rounded transition-colors ${
                        isSelected
                          ? 'bg-amber-500/15 border-l-2 border-amber-400'
                          : annotation
                          ? 'hover:bg-slate-800/70 cursor-pointer border-l-2 border-dashed border-amber-500/40'
                          : 'border-l-2 border-transparent'
                      }`}
                    >
                      {/* Line Number */}
                      <span className="w-7 text-right text-slate-600 select-none text-xs shrink-0 font-mono pt-0.5">
                        {lineNumber}
                      </span>

                      {/* Line Code */}
                      <span className="flex-1 whitespace-pre">
                        {highlightPythonLine(line)}
                      </span>

                      {/* Indicator badge if line has tutorial explanation */}
                      {annotation && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded font-sans tracking-wide shrink-0 transition-opacity ${
                            isSelected
                              ? 'bg-amber-400/20 text-amber-300 font-semibold'
                              : 'text-slate-500 opacity-60 group-hover:opacity-100 group-hover:text-amber-400'
                          }`}
                        >
                          Ver nota
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Line Inspector / Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Active Line Breakdown Card */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Info className="w-4 h-4" />
                <span>Explicação do Trecho</span>
              </div>

              {selectedAnnotation ? (
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-base font-bold text-white">
                      {selectedAnnotation.title}
                    </h3>
                    <span className="text-xs font-mono text-amber-300/80 bg-amber-400/10 px-2 py-0.5 rounded">
                      Linha {selectedAnnotation.lineNumber}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800 mb-3 overflow-x-auto">
                    {selectedAnnotation.code}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {selectedAnnotation.explanation}
                  </p>

                  {selectedAnnotation.tip && (
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/90 text-xs text-slate-400">
                      <strong className="text-amber-300 font-semibold block mb-0.5">
                        Dica para Iniciantes:
                      </strong>
                      {selectedAnnotation.tip}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-slate-400 py-6 text-center">
                  Clique em qualquer linha marcada com indicador no código ao lado para ver a explicação detalhada.
                </div>
              )}
            </div>

            {/* Quick Navigation to Other Annotations */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                Pontos-Chave deste Código ({version.annotations.length})
              </span>
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {version.annotations.map((ann) => (
                  <button
                    key={ann.lineNumber}
                    onClick={() => setSelectedAnnotation(ann)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      selectedAnnotation?.lineNumber === ann.lineNumber
                        ? 'bg-amber-400/15 text-amber-300 font-semibold border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <span className="truncate pr-2">
                      <span className="text-slate-500 font-mono mr-1.5">L{ann.lineNumber}:</span>
                      {ann.title}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
