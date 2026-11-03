import { QuizQuestion } from '../types/index.ts';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Por que precisamos usar float(input(...)) em vez de apenas input(...) para ler os números?',
    options: [
      'Porque o input() sempre retorna uma string (texto), e não é possível fazer contas matemáticas com texto.',
      'Porque o Python não aceita números inteiros em programas de terminal.',
      'Porque float() é obrigatório em todas as linhas de um programa Python.',
      'Apenas para mudar a cor do texto no terminal.'
    ],
    correctIndex: 0,
    explanation: 'Exatamente! A função input() sempre captura o que o usuário digita como texto (string). Se você somar "5" + "5", o resultado seria "55" (concatenação). O float() converte o texto para um número decimal real!'
  },
  {
    id: 2,
    question: 'Qual é a diferença fundamental entre "print()" e "return" dentro de uma função em Python?',
    options: [
      'print() e return fazem exatamente a mesma coisa, são sinônimos.',
      'print() exibe informação visual na tela, enquanto return devolve o valor calculado para ser armazenado ou reutilizado.',
      'return só funciona para números negativos, enquanto print() serve para números positivos.',
      'print() encerra o programa imediatamente.'
    ],
    correctIndex: 1,
    explanation: 'Perfeito! O comando print() apenas "mostra" uma mensagem para o humano ler no console, mas o programa descarta aquele valor. O return entrega o dado de volta ao código, permitindo guardá-lo em uma variável como "resultado = somar(a, b)".'
  },
  {
    id: 3,
    question: 'O que aconteceria no Python se executássemos a conta 15 / 0 sem uma condição de proteção?',
    options: [
      'O Python retornaria o valor especial "Infinito".',
      'O computador reiniciaria automaticamente.',
      'O programa travaria com o erro "ZeroDivisionError" e interromperia a execução.',
      'O resultado seria automaticamente 0.'
    ],
    correctIndex: 2,
    explanation: 'Correto! Em matemática e na arquitetura de computadores, divisão por zero não é permitida. No Python, isso gera a exceção ZeroDivisionError, derrubando o script. Por isso criamos a regra if b == 0: return "Erro...".'
  },
  {
    id: 4,
    question: 'Qual a diferença entre usar um sinal de igual (=) e dois sinais de igual (==)?',
    options: [
      'Não há diferença, o Python aceita qualquer um.',
      'Um sinal (=) serve para atribuir valor a uma variável; dois sinais (==) servem para comparar se dois valores são iguais.',
      'Um sinal (=) é para números decimais; dois sinais (==) para números inteiros.',
      'Dois sinais (==) apagam a variável da memória.'
    ],
    correctIndex: 1,
    explanation: 'Excelente! Este é um dos erros mais comuns de quem está começando. Escrever "opcao = \'1\'" guarda \'1\' na variável. Escrever "opcao == \'1\'" faz uma pergunta: "O valor dentro de opcao é igual a \'1\'?".'
  }
];
