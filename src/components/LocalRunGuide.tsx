import React, { useState } from 'react';
import { Terminal, Copy, Check, Laptop, Sparkles } from 'lucide-react';

export const LocalRunGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section className="py-12 bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Laptop className="w-3.5 h-3.5" />
            <span>Passo a Passo Prático</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Como Rodar a Calculadora no seu Próprio Computador
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Depois de testar no laboratório online, você pode executar o código nativamente
            no seu Windows, Mac ou Linux em menos de 2 minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center mb-3">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Verifique se tem Python
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Abra o Terminal (ou CMD / PowerShell no Windows) e digite o comando abaixo para ver se o Python já está instalado:
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs text-amber-300">
              <code>python --version</code>
              <button
                onClick={() => copyCommand('python --version')}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
                title="Copiar comando"
              >
                {copiedCmd === 'python --version' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center mb-3">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Salve o Arquivo .py
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Clique no botão <strong>"Baixar .py"</strong> no topo desta página ou crie um arquivo chamado <code className="text-amber-300 font-mono">calculadora.py</code> na sua pasta de projetos e cole o código.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
              💡 <strong>Dica:</strong> Editores gratuitos recomendados para iniciantes são o <strong>VS Code</strong> ou o <strong>Thonny IDE</strong>.
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center mb-3">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Execute o Programa
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Navegue até a pasta onde salvou o arquivo e rode o comando no terminal:
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs text-emerald-400">
              <code>python calculadora.py</code>
              <button
                onClick={() => copyCommand('python calculadora.py')}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
                title="Copiar comando"
              >
                {copiedCmd === 'python calculadora.py' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
