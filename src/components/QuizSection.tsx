import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions.ts';
import { Award, CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isComplete = answeredCount === QUIZ_QUESTIONS.length;

  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const handleCheckAnswers = () => {
    setShowResults(true);
    if (score === QUIZ_QUESTIONS.length) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <section id="desafios" className="py-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Award className="w-3.5 h-3.5" />
            <span>Fixação & Desafios</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Teste seu Conhecimento de Python
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Responda às 4 perguntas rápidas sobre os conceitos da calculadora para fixar o que você aprendeu.
          </p>
        </div>

        {/* Questions Grid */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const selected = selectedAnswers[q.id];
            const isAnswered = selected !== undefined;
            const isCorrect = selected === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    <span className="text-amber-400 font-mono mr-2">0{idx + 1}.</span>
                    {q.question}
                  </h3>

                  {showResults && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/40">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correto!
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded-full border border-rose-800/40">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorreto
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = selected === optIdx;
                    let optionClasses =
                      'w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        optionClasses += 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200 font-medium';
                      } else if (isOptionSelected) {
                        optionClasses += 'bg-rose-950/30 border-rose-500/60 text-rose-200';
                      } else {
                        optionClasses += 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
                      }
                    } else {
                      if (isOptionSelected) {
                        optionClasses += 'bg-amber-400/15 border-amber-400 text-amber-200 font-medium shadow-sm';
                      } else {
                        optionClasses += 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={showResults}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={optionClasses}
                      >
                        <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box shown after results */}
                {showResults && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">Por que esta é a resposta:</strong>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Score & Action Bar */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {showResults ? (
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  Pontuação Final
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-white">
                  Você acertou <span className="text-amber-400">{score}</span> de {QUIZ_QUESTIONS.length} perguntas!
                </span>
              </div>
            ) : (
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  Progresso do Quiz
                </span>
                <span className="text-sm font-medium text-slate-300">
                  {answeredCount} de {QUIZ_QUESTIONS.length} perguntas respondidas
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {showResults ? (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Refazer Quiz</span>
              </button>
            ) : (
              <button
                onClick={handleCheckAnswers}
                disabled={!isComplete}
                className={`flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-md ${
                  isComplete
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/20 active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Conferir Respostas</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
