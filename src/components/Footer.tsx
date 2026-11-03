import React from 'react';
import { Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-10 border-t border-slate-900 bg-slate-950 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-slate-200">Python CalcLab</span>
          <span aria-hidden="true">·</span>
          <span>Guia e Laboratório para Iniciantes</span>
        </div>

        <div className="flex items-center gap-6">
          <span>Python 3.12+</span>
          <span aria-hidden="true">·</span>
          <span>As 4 Operações Básicas: +, -, *, /</span>
          <span aria-hidden="true">·</span>
          <span>Boas Práticas & Código Limpo</span>
        </div>
      </div>
    </footer>
  );
};
