import React from 'react';
import { CalculatorLevel } from '../types/index.ts';
import { Play, Sparkles, BookOpen, Layers } from 'lucide-react';

interface HeroProps {
  currentLevel: CalculatorLevel;
  onSelectLevel: (level: CalculatorLevel) => void;
  onStartTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLevel,
  onSelectLevel,
  onStartTerminal
}) => {
  return (
    <section className="relative pt-10 pb-12 border-b border-slate-800/80 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-amber-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3 tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Guia Prático para Iniciantes em Programação</span>
        </div>

        {/* Hero headline & text-wrap: balance */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 text-balance">
            Calculadora Simples em Python: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">As 4 Operações Básicas</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
            Construa seu primeiro projeto real em Python do zero. Aprenda com código limpo,
            funções modulares (<code className="text-amber-300 font-mono text-sm px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">def</code>),
            entrada de dados (<code className="text-amber-300 font-mono text-sm px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">input()</code> e <code className="text-amber-300 font-mono text-sm px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">float()</code>),
            árvore de decisão (<code className="text-amber-300 font-mono text-sm px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">if/elif/else</code>)
            e a proteção essencial contra divisão por zero.
          </p>
        </div>

        {/* Level Switcher (Segmented Control) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="inline-flex p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner">
            <button
              onClick={() => onSelectLevel('basic')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentLevel === 'basic'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Nível 1: Básico (4 Operações)</span>
            </button>
            <button
              onClick={() => onSelectLevel('loop')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentLevel === 'loop'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Nível 2: Com Loop (while)</span>
            </button>
            <button
              onClick={() => onSelectLevel('robust')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentLevel === 'robust'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Nível 3: Com try / except</span>
            </button>
          </div>

          <button
            onClick={onStartTerminal}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700/80 rounded-xl transition-all cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>Testar no Terminal Interativo</span>
          </button>
        </div>

        {/* Feature summary strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-900">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 block mb-1">01. Funções Matemáticas</span>
            <span className="text-sm font-semibold text-slate-100 font-mono">def somar(a, b)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 block mb-1">02. Entrada & Decimais</span>
            <span className="text-sm font-semibold text-slate-100 font-mono">float(input())</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 block mb-1">03. Tomada de Decisão</span>
            <span className="text-sm font-semibold text-slate-100 font-mono">if / elif / else</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 block mb-1">04. Proteção Matemática</span>
            <span className="text-sm font-semibold text-slate-100 font-mono">if b == 0: Erro</span>
          </div>
        </div>
      </div>
    </section>
  );
};
