import React, { useState } from 'react';
import { GitBranch, Layers, ArrowRight, HelpCircle, AlertTriangle, CheckCircle2, Cpu, Zap, Play } from 'lucide-react';

interface ExperimentScenario {
  id: string;
  name: string;
  tag: string;
  inputOp: string;
  inputOpLabel: string;
  inputNum1: string;
  inputNum2: string;
  expectedResult: string;
  branchTaken: string;
  variableState: {
    opcao: string;
    num1: string;
    num2: string;
    resultado: string;
  };
  whyItBehaves: string;
  lesson: string;
}

const EXPERIMENTS: ExperimentScenario[] = [
  {
    id: 'exp-soma-decimal',
    name: 'Soma com Números Decimais',
    tag: 'Operação Básica 1',
    inputOp: '1',
    inputOpLabel: '1 (Soma)',
    inputNum1: '15.5',
    inputNum2: '4.25',
    expectedResult: '15.5 + 4.25 = 19.75',
    branchTaken: 'if opcao == "1": -> Chama somar(num1, num2)',
    variableState: {
      opcao: '"1" (str)',
      num1: '15.5 (float)',
      num2: '4.25 (float)',
      resultado: '19.75 (float)'
    },
    whyItBehaves: 'A função float() converteu os textos "15.5" e "4.25" em números reais de ponto flutuante. O if identificou que a opção era exatamente "1", chamou somar() e somou as frações com precisão matemática.',
    lesson: 'Variáveis numéricas (float) guardam valores fracionários com ponto (não vírgula no padrão Python).'
  },
  {
    id: 'exp-sub-negativa',
    name: 'Subtração Gerando Número Negativo',
    tag: 'Operação Básica 2',
    inputOp: '2',
    inputOpLabel: '2 (Subtração)',
    inputNum1: '7.0',
    inputNum2: '20.0',
    expectedResult: '7.0 - 20.0 = -13.0',
    branchTaken: 'elif opcao == "2": -> Chama subtrair(num1, num2)',
    variableState: {
      opcao: '"2" (str)',
      num1: '7.0 (float)',
      num2: '20.0 (float)',
      resultado: '-13.0 (float)'
    },
    whyItBehaves: 'O primeiro if foi avaliado como Falso ("2" != "1"). O Python então testou o elif opcao == "2", que foi Verdadeiro! A função subtrair(7.0, 20.0) calculou 7 - 20 = -13.0.',
    lesson: 'A ordem dos operandos importa: o computador subtrai exatamente a - b, preservando o sinal negativo automaticamente.'
  },
  {
    id: 'exp-mult-zero',
    name: 'Multiplicação por Zero',
    tag: 'Operação Básica 3',
    inputOp: '3',
    inputOpLabel: '3 (Multiplicação)',
    inputNum1: '999.0',
    inputNum2: '0.0',
    expectedResult: '999.0 * 0.0 = 0.0',
    branchTaken: 'elif opcao == "3": -> Chama multiplicar(num1, num2)',
    variableState: {
      opcao: '"3" (str)',
      num1: '999.0 (float)',
      num2: '0.0 (float)',
      resultado: '0.0 (float)'
    },
    whyItBehaves: 'Diferente da divisão por zero (que é indefinida), a multiplicação por zero é perfeitamente válida na matemática e na computação, resultando sempre no float 0.0.',
    lesson: 'O computador segue as propriedades matemáticas universais: qualquer número vezes zero é zero.'
  },
  {
    id: 'exp-div-normal',
    name: 'Divisão com Resultado Fracionário',
    tag: 'Operação Básica 4',
    inputOp: '4',
    inputOpLabel: '4 (Divisão)',
    inputNum1: '10.0',
    inputNum2: '3.0',
    expectedResult: '10.0 / 3.0 = 3.3333333333333335',
    branchTaken: 'elif opcao == "4": -> if b == 0 (Falso) -> return a / b',
    variableState: {
      opcao: '"4" (str)',
      num1: '10.0 (float)',
      num2: '3.0 (float)',
      resultado: '3.3333333333333335 (float)'
    },
    whyItBehaves: 'O operador de barra única (/) no Python 3 sempre gera um número do tipo float com representação decimal de dupla precisão (padrão IEEE 754).',
    lesson: 'Em Python, a divisão / sempre produz números de ponto flutuante (float), mesmo quando o resultado é exato como 4 / 2 = 2.0.'
  },
  {
    id: 'exp-div-zero',
    name: 'O Teste Proibido: Divisão por Zero',
    tag: 'Proteção Defensiva',
    inputOp: '4',
    inputOpLabel: '4 (Divisão)',
    inputNum1: '12.0',
    inputNum2: '0.0',
    expectedResult: '12.0 / 0.0 = Erro: Não é possível dividir por zero!',
    branchTaken: 'elif opcao == "4": -> if b == 0: (Verdadeiro!) -> return Erro',
    variableState: {
      opcao: '"4" (str)',
      num1: '12.0 (float)',
      num2: '0.0 (float)',
      resultado: '"Erro: Não é possível..." (str)'
    },
    whyItBehaves: 'Ao invés de deixar o processador travar com ZeroDivisionError, a condição if b == 0 interceptou o valor antes da barra (/) ser executada e retornou uma mensagem amigável.',
    lesson: 'Programação defensiva: um software de qualidade sempre prevê entradas perigosas antes que elas quebrem o sistema.'
  },
  {
    id: 'exp-opcao-invalida',
    name: 'Entrada Inesperada (Opção 9)',
    tag: 'Rede de Segurança else',
    inputOp: '9',
    inputOpLabel: '9 (Opção Inexistente)',
    inputNum1: '10.0',
    inputNum2: '5.0',
    expectedResult: 'Opção inválida! Escolha apenas 1, 2, 3 ou 4.',
    branchTaken: 'else: -> Nenhuma das opções anteriores foi verdadeira',
    variableState: {
      opcao: '"9" (str)',
      num1: '10.0 (float)',
      num2: '5.0 (float)',
      resultado: 'Não atribuído (pulou os cálculos)'
    },
    whyItBehaves: 'O if testou "1" (falso), os elifs testaram "2", "3" e "4" (todos falsos). Como sobrou o else, ele foi executado para alertar o usuário sem interromper abruptamente.',
    lesson: 'O bloco else é o guardião final de qualquer estrutura de decisão, garantindo que o software sempre tenha uma resposta coerente.'
  }
];

export const LogicFlowVisualizer: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<ExperimentScenario>(EXPERIMENTS[0]);

  return (
    <section id="como-funciona" className="py-12 bg-slate-950 border-b border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Engenharia & Lógica de Software</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Como Instruções, Variáveis e Condições Constroem um Software
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Aprender a programar não é decorar comandos de cor. É entender o <strong>ciclo de vida de uma instrução</strong>:
            como o computador guarda dados na memória, como ele toma decisões lógicas e como apresenta a resposta.
          </p>
        </div>

        {/* 3 Pillars Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold flex items-center justify-center text-sm mb-3">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                1. Entrada & Memória (Variáveis)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                O comando <code className="text-amber-300 font-mono">input()</code> solicita dados ao usuário. O <code className="text-amber-300 font-mono">float()</code> converte os caracteres de texto em números decimais.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-400 border border-slate-800/80 space-y-1">
                <div><span className="text-amber-400">opcao</span> = input(...) <span className="text-slate-500"># '1', '2'...</span></div>
                <div><span className="text-cyan-300">num1</span> = float(...) <span className="text-slate-500"># 15.5</span></div>
                <div><span className="text-cyan-300">num2</span> = float(...) <span className="text-slate-500"># 4.25</span></div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              💡 <strong>Conceito:</strong> Variáveis são "etiquetas" que apontam para caixas de memória RAM do seu computador.
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 font-bold flex items-center justify-center text-sm mb-3">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                2. Fluxo e Decisão (if / elif / else)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                O programa não executa tudo ao mesmo tempo. Ele compara o valor da variável <code className="text-cyan-300 font-mono">opcao</code> e escolhe apenas um único caminho (ramo).
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-400 border border-slate-800/80 space-y-1">
                <div><span className="text-amber-400">if</span> opcao == '1': <span className="text-emerald-300">somar()</span></div>
                <div><span className="text-amber-400">elif</span> opcao == '2': <span className="text-blue-300">subtrair()</span></div>
                <div><span className="text-amber-400">else</span>: <span className="text-rose-300">Opção Inválida</span></div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              💡 <strong>Conceito:</strong> As instruções são avaliadas sequencialmente de cima para baixo até achar a primeira verdadeira.
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 font-bold flex items-center justify-center text-sm mb-3">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                3. Cálculo e Apresentação (Saída)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                A função executada calcula a resposta com <code className="text-emerald-300 font-mono">return</code>. Uma <code className="text-emerald-300 font-mono">f-string</code> junta tudo em uma frase limpa para a tela.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-400 border border-slate-800/80 space-y-1">
                <div>resultado = somar(num1, num2)</div>
                <div className="text-emerald-300">print(f"Resultado: {'{resultado}'}")</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              💡 <strong>Conceito:</strong> Separar o cálculo (função) da exibição (print) é o primeiro passo para escrever código profissional.
            </div>
          </div>
        </div>

        {/* Interactive Experiment Laboratory */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                Laboratório de Cenários Práticos
              </span>
              <h3 className="text-xl font-bold text-white">
                Experimente Diferentes Operações & Observe o Comportamento
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Selecione um cenário abaixo para ver exatamente como a memória, as instruções e as condições reagem:
              </p>
            </div>
          </div>

          {/* Scenario Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {EXPERIMENTS.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelectedExp(exp)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedExp.id === exp.id
                    ? 'bg-amber-400/15 border-amber-400 text-amber-200 shadow-md shadow-amber-400/10'
                    : 'bg-slate-950 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                  {exp.tag}
                </span>
                <span className="text-xs font-bold leading-tight line-clamp-2">
                  {exp.name}
                </span>
              </button>
            ))}
          </div>

          {/* Active Experiment Detail Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Input, Branch, and Output Flow */}
            <div className="lg:col-span-7 space-y-4">
              {/* Step Flow Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
                {/* 1. Input */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1">
                    <span className="text-slate-400 font-sans text-xs font-semibold block mb-0.5">
                      Entrada do Usuário via input():
                    </span>
                    <div className="text-slate-300">
                      Operação escolhida: <span className="text-amber-300 font-bold">"{selectedExp.inputOp}"</span> ({selectedExp.inputOpLabel})
                    </div>
                    <div className="text-slate-300">
                      Números digitados: <span className="text-cyan-300 font-bold">{selectedExp.inputNum1}</span> e <span className="text-cyan-300 font-bold">{selectedExp.inputNum2}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800/80" />

                {/* 2. Branch Decision */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex-1">
                    <span className="text-slate-400 font-sans text-xs font-semibold block mb-0.5">
                      Ramo de Decisão Escolhido (if / elif / else):
                    </span>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300">
                      {selectedExp.branchTaken}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800/80" />

                {/* 3. Output Presentation */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex-1">
                    <span className="text-slate-400 font-sans text-xs font-semibold block mb-0.5">
                      Saída Apresentada na Tela via print() & f-string:
                    </span>
                    <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 font-bold">
                      {selectedExp.expectedResult}
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanatory text */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block mb-1">
                  Por que a aplicação se comporta assim:
                </span>
                <p>{selectedExp.whyItBehaves}</p>
              </div>
            </div>

            {/* Right: Variable Table State & Core Principle */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Estado das Variáveis na Memória RAM:
                </h4>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-amber-400 font-semibold">opcao</span>
                    <span className="text-slate-200 font-bold">{selectedExp.variableState.opcao}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-cyan-300 font-semibold">num1</span>
                    <span className="text-slate-200 font-bold">{selectedExp.variableState.num1}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-cyan-300 font-semibold">num2</span>
                    <span className="text-slate-200 font-bold">{selectedExp.variableState.num2}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-emerald-400 font-semibold">resultado</span>
                    <span className="text-slate-200 font-bold">{selectedExp.variableState.resultado}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-amber-300 block mb-0.5">💡 Lição de Programação:</strong>
                  {selectedExp.lesson}
                </div>
              </div>

              {/* Encouragement box */}
              <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-300 block mb-1">
                  🎯 O segredo dos grandes programadores:
                </strong>
                Computadores não "pensam", eles executam rigorosamente uma lista ordenada de instruções. Quando você entende como o dado entra, muda de tipo e atravessa condições, você aprende a lógica de qualquer linguagem (Python, JavaScript, C++, etc.).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
