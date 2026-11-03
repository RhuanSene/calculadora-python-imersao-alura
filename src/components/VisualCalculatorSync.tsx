import React, { useState } from 'react';
import { Calculator, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export const VisualCalculatorSync: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/' | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [lastCalculation, setLastCalculation] = useState<{
    opName: string;
    funcDef: string;
    argA: number;
    argB: number;
    opSymbol: string;
    result: string | number;
    isZeroError?: boolean;
  } | null>(null);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOp: '+' | '-' | '*' | '/') => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(firstOperand, inputValue, operator);
      setDisplay(String(result.result));
      setFirstOperand(typeof result.result === 'number' ? result.result : null);
      setLastCalculation(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOp);
  };

  const performCalculation = (
    a: number,
    b: number,
    op: '+' | '-' | '*' | '/'
  ) => {
    if (op === '+') {
      return {
        opName: 'somar',
        funcDef: 'def somar(a, b):\n    return a + b',
        argA: a,
        argB: b,
        opSymbol: '+',
        result: a + b
      };
    }
    if (op === '-') {
      return {
        opName: 'subtrair',
        funcDef: 'def subtrair(a, b):\n    return a - b',
        argA: a,
        argB: b,
        opSymbol: '-',
        result: a - b
      };
    }
    if (op === '*') {
      return {
        opName: 'multiplicar',
        funcDef: 'def multiplicar(a, b):\n    return a * b',
        argA: a,
        argB: b,
        opSymbol: '*',
        result: a * b
      };
    }
    // op === '/'
    if (b === 0) {
      return {
        opName: 'dividir',
        funcDef: 'def dividir(a, b):\n    if b == 0:\n        return "Erro: Divisão por zero!"\n    return a / b',
        argA: a,
        argB: b,
        opSymbol: '/',
        result: 'Erro: Divisão por zero!',
        isZeroError: true
      };
    }
    return {
      opName: 'dividir',
      funcDef: 'def dividir(a, b):\n    if b == 0:\n        return "Erro: Divisão por zero!"\n    return a / b',
      argA: a,
      argB: b,
      opSymbol: '/',
      result: a / b
    };
  };

  const handleEqual = () => {
    if (operator === null || firstOperand === null) return;
    const inputValue = parseFloat(display);
    const result = performCalculation(firstOperand, inputValue, operator);

    setDisplay(String(result.result));
    setLastCalculation(result);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setLastCalculation(null);
  };

  return (
    <section id="calculadora-visual" className="py-12 bg-slate-950/70 border-b border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Ponte Teoria e Prática</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Calculadora Visual sincronizada com Python
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Clique nos botões da calculadora para ver em tempo real qual função Python é disparada,
            quais parâmetros são passados e como o valor de retorno é processado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Calculator Pad */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
              {/* LCD Display */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800/80 p-4 mb-5 text-right font-mono">
                <div className="h-5 text-xs text-slate-500 mb-1 overflow-hidden">
                  {firstOperand !== null && `${firstOperand} ${operator || ''}`}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white truncate">
                  {display}
                </div>
              </div>

              {/* Calculator Keypad */}
              <div className="grid grid-cols-4 gap-2.5">
                {/* Row 1 */}
                <button
                  onClick={handleClear}
                  className="col-span-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-rose-400 font-bold text-sm transition-all cursor-pointer"
                >
                  AC (Limpar)
                </button>
                <button
                  onClick={() => handleOperator('/')}
                  className={`py-3 rounded-xl font-bold text-base transition-all active:scale-95 cursor-pointer ${
                    operator === '/'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-400'
                  }`}
                >
                  ÷
                </button>
                <button
                  onClick={() => handleOperator('*')}
                  className={`py-3 rounded-xl font-bold text-base transition-all active:scale-95 cursor-pointer ${
                    operator === '*'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-400'
                  }`}
                >
                  ×
                </button>

                {/* Row 2 */}
                {['7', '8', '9'].map((d) => (
                  <button
                    key={d}
                    onClick={() => inputDigit(d)}
                    className="py-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-white font-semibold text-lg transition-all cursor-pointer"
                  >
                    {d}
                  </button>
                ))}
                <button
                  onClick={() => handleOperator('-')}
                  className={`py-3 rounded-xl font-bold text-base transition-all active:scale-95 cursor-pointer ${
                    operator === '-'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-400'
                  }`}
                >
                  −
                </button>

                {/* Row 3 */}
                {['4', '5', '6'].map((d) => (
                  <button
                    key={d}
                    onClick={() => inputDigit(d)}
                    className="py-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-white font-semibold text-lg transition-all cursor-pointer"
                  >
                    {d}
                  </button>
                ))}
                <button
                  onClick={() => handleOperator('+')}
                  className={`py-3 rounded-xl font-bold text-base transition-all active:scale-95 cursor-pointer ${
                    operator === '+'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-400'
                  }`}
                >
                  +
                </button>

                {/* Row 4 */}
                {['1', '2', '3'].map((d) => (
                  <button
                    key={d}
                    onClick={() => inputDigit(d)}
                    className="py-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-white font-semibold text-lg transition-all cursor-pointer"
                  >
                    {d}
                  </button>
                ))}
                <button
                  onClick={handleEqual}
                  className="row-span-2 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xl transition-all shadow-md shadow-amber-400/20 cursor-pointer flex items-center justify-center"
                >
                  =
                </button>

                {/* Row 5 */}
                <button
                  onClick={() => inputDigit('0')}
                  className="col-span-2 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-white font-semibold text-lg transition-all cursor-pointer"
                >
                  0
                </button>
                <button
                  onClick={inputDecimal}
                  className="py-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 active:scale-95 text-white font-semibold text-lg transition-all cursor-pointer"
                >
                  .
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
                <span className="text-[11px] text-slate-500">
                  Dica: Experimente calcular <span className="font-mono text-amber-300">10 ÷ 0 =</span> para ver a proteção!
                </span>
              </div>
            </div>
          </div>

          {/* Right: Python Live Translation Panel */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <h3 className="text-base font-bold text-white">
                  O que acontece nos bastidores em Python:
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Interpretador Visual
              </span>
            </div>

            {lastCalculation ? (
              <div className="space-y-4">
                {/* Function called badge */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Função Invocada:</span>
                  </div>
                  <pre className="font-mono text-xs sm:text-sm text-amber-300 whitespace-pre">
                    {lastCalculation.funcDef}
                  </pre>
                </div>

                {/* Arguments passing visualizer */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block mb-0.5 font-sans text-[11px]">Parâmetro a:</span>
                    <span className="text-cyan-300 font-bold text-sm">{lastCalculation.argA}</span>
                    <span className="text-[10px] text-slate-500 block">tipo: float</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block mb-0.5 font-sans text-[11px]">Parâmetro b:</span>
                    <span className="text-cyan-300 font-bold text-sm">{lastCalculation.argB}</span>
                    <span className="text-[10px] text-slate-500 block">tipo: float</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${
                    lastCalculation.isZeroError
                      ? 'bg-rose-950/20 border-rose-900/40'
                      : 'bg-emerald-950/20 border-emerald-900/40'
                  }`}>
                    <span className="text-slate-500 block mb-0.5 font-sans text-[11px]">Valor de Retorno:</span>
                    <span className={`font-bold text-sm ${lastCalculation.isZeroError ? 'text-rose-400' : 'text-emerald-300'}`}>
                      {lastCalculation.result}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {lastCalculation.isZeroError ? 'tipo: str (aviso)' : 'tipo: float'}
                    </span>
                  </div>
                </div>

                {/* Python Equivalent Code */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-2">
                    Código Python correspondente:
                  </span>
                  <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                    {`# O usuário escolheu a operação e digitou os números:
num1 = ${lastCalculation.argA}
num2 = ${lastCalculation.argB}

# Chamando a função definida:
resultado = ${lastCalculation.opName}(num1, num2)

# Exibindo o resultado final formatado com f-string:
print(f"Resultado: {num1} ${lastCalculation.opSymbol} {num2} = {resultado}")`}
                  </pre>
                </div>

                {lastCalculation.isZeroError && (
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs text-rose-200">
                    <strong className="block mb-1 text-rose-300 font-bold">
                      🛡️ Proteção de Divisão por Zero Ativada!
                    </strong>
                    Como o segundo parâmetro <code>b</code> foi zero, o comando <code>if b == 0:</code> impediu que o computador realizasse a divisão física, evitando o travamento do sistema.
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <Calculator className="w-10 h-10 text-slate-600 mx-auto stroke-[1.5]" />
                <p className="text-sm max-w-sm mx-auto">
                  Faça um cálculo na calculadora ao lado (por exemplo, clique em <span className="text-amber-300 font-mono font-semibold">15 × 4 =</span>) para ver a tradução simultânea em código Python!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
