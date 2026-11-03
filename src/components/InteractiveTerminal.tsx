import React, { useState, useEffect, useRef } from 'react';
import { PythonCodeVersion, TerminalMessage, MemoryVariable } from '../types/index.ts';
import { Play, RotateCcw, FastForward, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface InteractiveTerminalProps {
  currentVersion: PythonCodeVersion;
}

type ExecState =
  | 'idle'
  | 'waiting-option'
  | 'waiting-num1'
  | 'waiting-num2'
  | 'completed'
  | 'loop-continue';

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  currentVersion
}) => {
  const [mode, setMode] = useState<'console' | 'stepper'>('console');
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [execState, setExecState] = useState<ExecState>('idle');
  
  // Stored execution values
  const [storedOption, setStoredOption] = useState<string>('');
  const [storedNum1, setStoredNum1] = useState<number | null>(null);
  const [storedNum2, setStoredNum2] = useState<number | null>(null);

  // Stepper state
  const [stepIndex, setStepIndex] = useState(0);
  const [stepperRunning, setStepperRunning] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    resetConsole();
  }, [currentVersion.id]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (type: TerminalMessage['type'], text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(7), type, text }
    ]);
  };

  const resetConsole = () => {
    setMessages([
      {
        id: 'init-1',
        type: 'system',
        text: 'Python 3.12.2 (interactive lab environment)'
      },
      {
        id: 'init-2',
        type: 'system',
        text: `Arquivo carregado: ${currentVersion.filename}`
      },
      {
        id: 'init-3',
        type: 'system',
        text: 'Clique em "Executar Programa" para iniciar a simulação.'
      }
    ]);
    setExecState('idle');
    setStoredOption('');
    setStoredNum1(null);
    setStoredNum2(null);
    setUserInput('');
    setStepIndex(0);
    setStepperRunning(false);
  };

  const startProgram = () => {
    setMessages([
      {
        id: 'run-cmd',
        type: 'system',
        text: `$ python ${currentVersion.filename}`
      },
      {
        id: 'm1',
        type: 'output',
        text: '===================================\n     CALCULADORA EM PYTHON\n==================================='
      },
      {
        id: 'm2',
        type: 'output',
        text: 'Escolha a operação desejada:\n1 - Soma (+)\n2 - Subtração (-)\n3 - Multiplicação (*)\n4 - Divisão (/)' +
          (currentVersion.id === 'loop' ? '\n5 - Sair do programa' : '')
      },
      {
        id: 'm3',
        type: 'output',
        text: '-----------------------------------'
      },
      {
        id: 'm4',
        type: 'input-prompt',
        text: currentVersion.id === 'loop'
          ? 'Escolha uma opção (1-5): '
          : 'Digite a opção (1/2/3/4): '
      }
    ]);
    setExecState('waiting-option');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = userInput.trim();
    if (!val && execState !== 'idle') return;

    if (execState === 'waiting-option') {
      addMessage('user-input', val);
      setUserInput('');

      if (currentVersion.id === 'loop' && val === '5') {
        addMessage('success', 'Obrigado por usar a calculadora! Até logo.');
        addMessage('system', '[Programa encerrado com código de saída 0]');
        setExecState('completed');
        return;
      }

      if (!['1', '2', '3', '4'].includes(val)) {
        addMessage('error', 'Opção inválida! Escolha apenas 1, 2, 3 ou 4.');
        if (currentVersion.id === 'loop') {
          addMessage('input-prompt', 'Escolha uma opção (1-5): ');
          setExecState('waiting-option');
        } else {
          addMessage('system', '[Programa finalizado pelo else]');
          setExecState('completed');
        }
        return;
      }

      setStoredOption(val);
      setExecState('waiting-num1');
      addMessage('input-prompt', 'Digite o primeiro número: ');
      return;
    }

    if (execState === 'waiting-num1') {
      addMessage('user-input', val);
      setUserInput('');

      const parsed = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed)) {
        if (currentVersion.id === 'robust') {
          addMessage('error', 'Entrada inválida! Por favor, digite um número válido.');
          addMessage('input-prompt', 'Digite o primeiro número: ');
          return;
        } else {
          addMessage('error', 'ValueError: could not convert string to float: \'' + val + '\'');
          addMessage('system', '[O programa travou porque não tratou o erro com try/except]');
          setExecState('completed');
          return;
        }
      }

      setStoredNum1(parsed);
      setExecState('waiting-num2');
      addMessage('input-prompt', 'Digite o segundo número: ');
      return;
    }

    if (execState === 'waiting-num2') {
      addMessage('user-input', val);
      setUserInput('');

      const parsed = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed)) {
        if (currentVersion.id === 'robust') {
          addMessage('error', 'Entrada inválida! Por favor, digite um número válido.');
          addMessage('input-prompt', 'Digite o segundo número: ');
          return;
        } else {
          addMessage('error', 'ValueError: could not convert string to float: \'' + val + '\'');
          addMessage('system', '[O programa travou porque não tratou o erro com try/except]');
          setExecState('completed');
          return;
        }
      }

      setStoredNum2(parsed);
      calculateAndShowResult(storedOption, storedNum1!, parsed);
    }
  };

  const calculateAndShowResult = (op: string, a: number, b: number) => {
    addMessage('output', '-----------------------------------');
    let res: number | string = 0;
    let symbol = '+';

    if (op === '1') {
      res = a + b;
      symbol = '+';
      addMessage('success', `Resultado: ${a} ${symbol} ${b} = ${res}`);
    } else if (op === '2') {
      res = a - b;
      symbol = '-';
      addMessage('success', `Resultado: ${a} ${symbol} ${b} = ${res}`);
    } else if (op === '3') {
      res = a * b;
      symbol = '*';
      addMessage('success', `Resultado: ${a} ${symbol} ${b} = ${res}`);
    } else if (op === '4') {
      symbol = '/';
      if (b === 0) {
        addMessage('error', `Resultado: ${a} / ${b} = Erro: Não é possível dividir por zero!`);
      } else {
        res = a / b;
        addMessage('success', `Resultado: ${a} ${symbol} ${b} = ${res}`);
      }
    }

    if (currentVersion.id === 'loop') {
      addMessage('output', '\n[Loop while ativo: pronto para novo cálculo]');
      addMessage('input-prompt', 'Escolha uma opção (1-5): ');
      setExecState('waiting-option');
    } else {
      addMessage('output', '===================================\nFim do programa!');
      addMessage('system', '[Execução concluída com sucesso]');
      setExecState('completed');
    }
  };

  // Quick choice handler for user convenience
  const handleQuickOption = (opt: string) => {
    if (execState === 'waiting-option') {
      setUserInput(opt);
      setTimeout(() => {
        addMessage('user-input', opt);
        setStoredOption(opt);
        setExecState('waiting-num1');
        addMessage('input-prompt', 'Digite o primeiro número: ');
        setUserInput('');
      }, 50);
    }
  };

  const handleQuickNumber = (num: number) => {
    if (execState === 'waiting-num1' || execState === 'waiting-num2') {
      setUserInput(num.toString());
    }
  };

  // Stepper logic (line-by-line simulation)
  const stepperSteps = [
    {
      line: 'def somar(a, b): ...',
      codeSnippet: 'def somar(a, b):\n    return a + b',
      narrative: 'Python registra a função "somar" na tabela de símbolos.',
      vars: [{ name: 'somar', value: '<function somar>', type: 'function', description: 'Função de soma pronta' }]
    },
    {
      line: 'def dividir(a, b): ...',
      codeSnippet: 'def dividir(a, b):\n    if b == 0: return "Erro..."\n    return a / b',
      narrative: 'Python registra as 4 funções matemáticas na memória.',
      vars: [
        { name: 'somar', value: '<function>', type: 'function', description: 'Função de adição' },
        { name: 'dividir', value: '<function>', type: 'function', description: 'Função com proteção b == 0' }
      ]
    },
    {
      line: 'opcao = input(...)',
      codeSnippet: 'opcao = "4"',
      narrative: 'Usuário escolheu a opção 4 (Divisão). O texto "4" é armazenado como string.',
      vars: [
        { name: 'opcao', value: '"4"', type: 'str', description: 'Texto da opção escolhida' }
      ]
    },
    {
      line: 'num1 = float(input(...))',
      codeSnippet: 'num1 = float("20")  # vira 20.0',
      narrative: 'O texto "20" é convertido para o número decimal float 20.0.',
      vars: [
        { name: 'opcao', value: '"4"', type: 'str', description: 'Texto da opção' },
        { name: 'num1', value: 20.0, type: 'float', description: 'Primeiro número para cálculo' }
      ]
    },
    {
      line: 'num2 = float(input(...))',
      codeSnippet: 'num2 = float("4")   # vira 4.0',
      narrative: 'O segundo número digitado é lido e convertido para float 4.0.',
      vars: [
        { name: 'opcao', value: '"4"', type: 'str', description: 'Texto da opção' },
        { name: 'num1', value: 20.0, type: 'float', description: 'Primeiro número' },
        { name: 'num2', value: 4.0, type: 'float', description: 'Segundo número (divisor)' }
      ]
    },
    {
      line: 'elif opcao == \'4\': resultado = dividir(num1, num2)',
      codeSnippet: 'if b == 0: ...\nreturn 20.0 / 4.0  # retorna 5.0',
      narrative: 'Python entra no bloco da opção 4, testa se num2 é 0 (falso!), calcula 20.0 / 4.0 e retorna 5.0.',
      vars: [
        { name: 'opcao', value: '"4"', type: 'str', description: 'Opção' },
        { name: 'num1', value: 20.0, type: 'float', description: 'Primeiro número' },
        { name: 'num2', value: 4.0, type: 'float', description: 'Segundo número' },
        { name: 'resultado', value: 5.0, type: 'float', description: 'Valor retornado pela função' }
      ]
    },
    {
      line: 'print(f"Resultado: {num1} / {num2} = {resultado}")',
      codeSnippet: 'print("Resultado: 20.0 / 4.0 = 5.0")',
      narrative: 'A f-string formata e exibe na tela o resultado final para o usuário!',
      vars: [
        { name: 'num1', value: 20.0, type: 'float', description: 'Primeiro número' },
        { name: 'num2', value: 4.0, type: 'float', description: 'Segundo número' },
        { name: 'resultado', value: 5.0, type: 'float', description: 'Resultado final' }
      ]
    }
  ];

  const currentStep = stepperSteps[stepIndex];

  const handleNextStep = () => {
    if (stepIndex < stepperSteps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setStepIndex(0);
    }
  };

  return (
    <section id="terminal" className="py-12 bg-slate-950/80 border-b border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
              Ambiente de Execução em Tempo Real
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Terminal Interativo Python
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Teste o código sem precisar instalar nada! Digite valores no console ou use o Inspetor de Memória para ver as variáveis mudando passo a passo.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => {
                setMode('console');
                resetConsole();
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mode === 'console'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Modo Console (Interativo)
            </button>
            <button
              onClick={() => {
                setMode('stepper');
                setStepIndex(0);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                mode === 'stepper'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Modo Tutor (Passo a Passo)
            </button>
          </div>
        </div>

        {mode === 'console' ? (
          /* CONSOLE MODE */
          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
            {/* Terminal Topbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-slate-300 font-semibold ml-2">
                  bash / terminal — python {currentVersion.filename}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {execState === 'idle' ? (
                  <button
                    onClick={startProgram}
                    className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Executar Programa</span>
                  </button>
                ) : (
                  <button
                    onClick={resetConsole}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reiniciar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm min-h-[320px] max-h-[460px] overflow-y-auto space-y-2 bg-slate-950/90">
              {messages.map((msg) => {
                if (msg.type === 'system') {
                  return (
                    <div key={msg.id} className="text-slate-500 italic">
                      {msg.text}
                    </div>
                  );
                }
                if (msg.type === 'error') {
                  return (
                    <div key={msg.id} className="text-rose-400 font-semibold bg-rose-950/30 p-2 rounded border border-rose-900/40">
                      {msg.text}
                    </div>
                  );
                }
                if (msg.type === 'success') {
                  return (
                    <div key={msg.id} className="text-emerald-400 font-bold bg-emerald-950/20 p-2 rounded border border-emerald-900/30">
                      {msg.text}
                    </div>
                  );
                }
                if (msg.type === 'user-input') {
                  return (
                    <div key={msg.id} className="text-amber-300 font-bold flex items-center gap-1">
                      <span className="text-slate-600">&gt;</span> {msg.text}
                    </div>
                  );
                }
                if (msg.type === 'input-prompt') {
                  return (
                    <div key={msg.id} className="text-cyan-300 font-semibold">
                      {msg.text}
                    </div>
                  );
                }
                return (
                  <div key={msg.id} className="text-slate-200 whitespace-pre-wrap">
                    {msg.text}
                  </div>
                );
              })}

              <div ref={terminalEndRef} />
            </div>

            {/* Active Input Line & Suggestions */}
            <div className="p-3.5 bg-slate-900/80 border-t border-slate-800">
              {execState !== 'idle' && execState !== 'completed' ? (
                <div>
                  <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
                    <span className="text-amber-400 font-mono font-bold text-sm select-none">
                      &gt;&gt;&gt;
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={
                        execState === 'waiting-option'
                          ? 'Digite 1, 2, 3 ou 4 e tecle Enter...'
                          : 'Digite um número (ex: 15 ou 2.5)...'
                      }
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Enviar
                    </button>
                  </form>

                  {/* Quick Helper Chips */}
                  <div className="flex flex-wrap items-center gap-2 mt-2.5 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                    <span className="text-slate-500 font-medium">Sugestões rápidas:</span>
                    {execState === 'waiting-option' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleQuickOption('1')}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono transition-colors cursor-pointer"
                        >
                          1 (Soma)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickOption('2')}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono transition-colors cursor-pointer"
                        >
                          2 (Subtração)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickOption('3')}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono transition-colors cursor-pointer"
                        >
                          3 (Multiplicação)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickOption('4')}
                          className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono transition-colors cursor-pointer"
                        >
                          4 (Divisão)
                        </button>
                      </>
                    )}

                    {(execState === 'waiting-num1' || execState === 'waiting-num2') && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleQuickNumber(10)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono transition-colors cursor-pointer"
                        >
                          10
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickNumber(5)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono transition-colors cursor-pointer"
                        >
                          5
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickNumber(2.5)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono transition-colors cursor-pointer"
                        >
                          2.5 (decimal)
                        </button>
                        {execState === 'waiting-num2' && (
                          <button
                            type="button"
                            onClick={() => handleQuickNumber(0)}
                            className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono transition-colors cursor-pointer"
                            title="Testar a proteção contra divisão por zero"
                          >
                            0 (Testar divisão por zero!)
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {execState === 'completed'
                      ? '✓ Execução concluída. Clique em "Reiniciar" ou "Executar" para testar novos números.'
                      : 'Console pronto. Clique no botão "Executar Programa" acima para iniciar.'}
                  </span>
                  {execState === 'completed' && (
                    <button
                      onClick={startProgram}
                      className="text-amber-400 hover:underline font-semibold cursor-pointer"
                    >
                      Executar novamente &rarr;
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* STEPPER MODE (MEMORY & LINE-BY-LINE TRACER) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Step visualizer & code focus */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Passo {stepIndex + 1} de {stepperSteps.length}
                    </span>
                    <span className="text-xs text-slate-500">·</span>
                    <span className="text-xs text-slate-400">Linha ativa no interpretador</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setStepIndex(0)}
                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Voltar ao início"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm"
                    >
                      <span>{stepIndex === stepperSteps.length - 1 ? 'Reiniciar' : 'Avançar Passo'}</span>
                      <FastForward className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Active line code display */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-amber-300 mb-4 whitespace-pre-wrap">
                  {currentStep.codeSnippet}
                </div>

                {/* Educational narration of what Python is doing */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 text-slate-200 text-sm leading-relaxed mb-4">
                  <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>O que o Python está fazendo neste momento:</span>
                  </div>
                  <p>{currentStep.narrative}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="pt-2">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full transition-all duration-300"
                    style={{ width: `${((stepIndex + 1) / stepperSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Memory Inspector (Variables Table) */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    Tabela de Memória (Variáveis)
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Estado do Escopo Global
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4">
                  Veja exatamente o que está guardado na memória do computador em cada etapa do programa:
                </p>

                <div className="space-y-2.5">
                  {currentStep.vars.map((v, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs flex flex-col gap-1 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-amber-400 font-bold">{v.name}</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {v.type}
                        </span>
                      </div>
                      <div className="text-slate-100 font-bold text-sm">
                        {String(v.value)}
                      </div>
                      <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                        {v.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
                <span>Total de variáveis ativas: {currentStep.vars.length}</span>
                <span className="text-emerald-400 font-medium">✓ Sem vazamentos</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
