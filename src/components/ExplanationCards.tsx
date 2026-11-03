import React, { useState } from 'react';
import { EXPLANATION_COMPONENTS } from '../data/explanations.ts';
import { BookOpen, AlertCircle, Check, Copy, Code2, ChevronDown, ChevronUp } from 'lucide-react';

export const ExplanationCards: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('funcoes');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <section id="componentes" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guia Didático Passo a Passo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Explicação dos Principais Componentes
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Cada linha de uma calculadora em Python tem uma função essencial. Descubra por que
            escolhemos cada comando, como eles trabalham juntos e quais são os erros mais comuns
            que você deve evitar.
          </p>
        </div>

        {/* Component Cards Stack */}
        <div className="space-y-4">
          {EXPLANATION_COMPONENTS.map((item, idx) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900 border-amber-500/40 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-mono font-bold text-sm shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 shrink-0">
                    <span className="text-xs font-medium hidden sm:inline">
                      {isExpanded ? 'Recolher' : 'Ver detalhes'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-amber-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-5">
                    {/* Why use it */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                        Por que usamos isso?
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {item.whyUseIt}
                      </p>
                    </div>

                    {/* Detailed explanation */}
                    <div className="text-sm text-slate-300 leading-relaxed space-y-2 whitespace-pre-line">
                      {item.detailedExplanation}
                    </div>

                    {/* Code Syntax Comparison & Common Mistake Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                      {/* Interactive Code Example */}
                      <div className="rounded-xl bg-slate-950 border border-slate-800 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5" />
                            Exemplo Prático
                          </span>
                          <button
                            onClick={() => handleCopy(item.id, item.visualExample.code)}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            {copiedCodeId === item.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>

                        <pre className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 overflow-x-auto mb-2">
                          {item.visualExample.code}
                        </pre>

                        <div className="text-xs font-mono text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 mb-2">
                          <span className="text-slate-500 font-sans block text-[10px] uppercase font-semibold">Saída no Terminal:</span>
                          <span className="text-emerald-300 whitespace-pre-line">{item.visualExample.output}</span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.visualExample.explanation}
                        </p>
                      </div>

                      {/* Common Pitfall / Mistake */}
                      <div className="rounded-xl bg-rose-950/20 border border-rose-900/30 p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Erro Mais Comum de Iniciantes
                          </span>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.commonMistake}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-rose-900/30 text-[11px] text-rose-300/80">
                          💡 <strong>Fique atento:</strong> Testar essas armadilhas no terminal é a melhor forma de fixar o aprendizado!
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
