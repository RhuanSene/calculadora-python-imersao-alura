import React from 'react';
import { Download, Terminal } from 'lucide-react';

interface HeaderProps {
  onDownload: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownload, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-sm shadow-amber-500/20">
            <Terminal className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-white group-hover:text-amber-400 transition-colors">
            Python CalcLab
          </span>
        </a>

        {/* Zone 2: Navigation Links (single line, whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-400">
          <button
            onClick={() => onNavigate('codigo')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Código Python
          </button>
          <button
            onClick={() => onNavigate('componentes')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Como Funciona
          </button>
          <button
            onClick={() => onNavigate('terminal')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Terminal Interativo
          </button>
          <button
            onClick={() => onNavigate('calculadora-visual')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Calculadora Visual
          </button>
          <button
            onClick={() => onNavigate('desafios')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Quiz & Desafios
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            title="Baixar arquivo calculadora.py para rodar no seu computador"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
