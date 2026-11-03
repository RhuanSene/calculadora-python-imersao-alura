export type CalculatorLevel = 'basic' | 'loop' | 'robust';

export interface CodeLineAnnotation {
  lineNumber: number;
  code: string;
  component: 'funcao' | 'input' | 'conversao' | 'condicional' | 'divisao_zero' | 'loop' | 'tratamento_erro' | 'outro';
  title: string;
  explanation: string;
  tip?: string;
}

export interface PythonCodeVersion {
  id: CalculatorLevel;
  title: string;
  subtitle: string;
  filename: string;
  description: string;
  code: string;
  annotations: CodeLineAnnotation[];
}

export interface TerminalMessage {
  id: string;
  type: 'system' | 'output' | 'input-prompt' | 'user-input' | 'error' | 'success' | 'trace';
  text: string;
}

export interface MemoryVariable {
  name: string;
  value: string | number;
  type: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
