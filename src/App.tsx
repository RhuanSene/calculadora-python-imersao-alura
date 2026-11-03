import React, { useState } from 'react';
import { CalculatorLevel, PythonCodeVersion } from './types/index.ts';
import { PYTHON_VERSIONS } from './data/pythonSnippets.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { CodeViewer } from './components/CodeViewer.tsx';
import { InteractiveTerminal } from './components/InteractiveTerminal.tsx';
import { LogicFlowVisualizer } from './components/LogicFlowVisualizer.tsx';
import { ExplanationCards } from './components/ExplanationCards.tsx';
import { VisualCalculatorSync } from './components/VisualCalculatorSync.tsx';
import { QuizSection } from './components/QuizSection.tsx';
import { LocalRunGuide } from './components/LocalRunGuide.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [level, setLevel] = useState<CalculatorLevel>('basic');
  const [activeSection, setActiveSection] = useState('codigo');

  const currentVersion: PythonCodeVersion =
    PYTHON_VERSIONS.find((v) => v.id === level) || PYTHON_VERSIONS[0];

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentVersion.code], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = currentVersion.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRunInTerminal = (version: PythonCodeVersion) => {
    setLevel(version.id);
    handleNavigate('terminal');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar Contract (3 zones) */}
      <Header
        onDownload={handleDownload}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          currentLevel={level}
          onSelectLevel={setLevel}
          onStartTerminal={() => handleNavigate('terminal')}
        />

        {/* Complete Python Code with Syntax Highlighter and Line Inspector */}
        <CodeViewer
          version={currentVersion}
          onRunInTerminal={handleRunInTerminal}
          onDownload={handleDownload}
        />

        {/* Interactive Python Terminal & Step-by-Step Memory Inspector */}
        <InteractiveTerminal currentVersion={currentVersion} />

        {/* How instructions, variables, and conditions work */}
        <LogicFlowVisualizer />

        {/* Detailed Explanation of Key Components */}
        <ExplanationCards />

        {/* Visual Calculator synchronized with Python interpreter logic */}
        <VisualCalculatorSync />

        {/* Practical Quiz & Challenges for Beginners */}
        <QuizSection />

        {/* How to run locally on Windows/Mac/Linux */}
        <LocalRunGuide />
      </main>

      {/* Clean quiet footer */}
      <Footer />
    </div>
  );
}
