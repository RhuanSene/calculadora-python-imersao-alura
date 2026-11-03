export interface ComponentConcept {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  pythonSyntax: string;
  whyUseIt: string;
  detailedExplanation: string;
  commonMistake: string;
  visualExample: {
    code: string;
    output: string;
    explanation: string;
  };
}

export const EXPLANATION_COMPONENTS: ComponentConcept[] = [
  {
    id: 'funcoes',
    badge: 'Conceito Fundamental #1',
    title: 'Funções (def) e Retorno (return)',
    subtitle: 'Blocos de código reutilizáveis que realizam uma tarefa específica',
    pythonSyntax: 'def somar(a, b):\n    return a + b',
    whyUseIt: 'Imagine ter que reescrever a fórmula de soma toda vez que precisar somar algo. Com uma função, você escreve o código uma única vez e chama quantas vezes quiser.',
    detailedExplanation: `No Python, uma função é declarada com a palavra-chave **def** (de "define"), seguida pelo nome da função e parênteses com os parâmetros.

• **Parâmetros (a, b)**: São variáveis "de entrada" que a função recebe para trabalhar.
• **Dois pontos (:)**: Indica que o que vier a seguir pertence à função.
• **Indentação (4 espaços)**: O Python usa o recuo do texto para saber quais linhas fazem parte da função.
• **Comando return**: Devolve a resposta calculada para quem chamou a função, permitindo salvar o resultado em outra variável.`,
    commonMistake: 'Confundir **print()** com **return**. O print apenas mostra algo na tela, mas não entrega o valor de volta ao programa. Já o return "cospe" o valor para que outra parte do código possa usá-lo!',
    visualExample: {
      code: '# Chamando a função:\ntotal = somar(10, 5)\nprint(total)',
      output: '15',
      explanation: 'O Python passa 10 para o "a" e 5 para o "b". O return calcula 15 e entrega para a variável "total".'
    }
  },
  {
    id: 'input-float',
    badge: 'Conceito Fundamental #2',
    title: 'Entrada de Dados (input) e Conversão de Tipos (float)',
    subtitle: 'Como interagir com o usuário e garantir que números sejam tratados como números',
    pythonSyntax: 'num1 = float(input("Digite um número: "))',
    whyUseIt: 'O Python precisa saber quando você está lidando com palavras e quando está lidando com valores matemáticos para poder somar ou subtrair.',
    detailedExplanation: `A função **input()** pausa o programa e espera o usuário digitar no teclado e teclar Enter.

No entanto, o **input() SEMPRE retorna o dado no formato de texto (string - str)**!
Se você digitar 5 e 5 sem converter:
\`"5" + "5"\` resultará em \`"55"\` (o Python junta os textos em vez de somar).

Para resolver isso, envolvemos o input com a função **float()**:
• **float()**: Converte o texto para número decimal (com ponto flutuante, ex: 10.5, 3.0).
• **int()**: Se usássemos int(), só aceitaríamos números inteiros (não daria para somar 2.5 + 3.5).`,
    commonMistake: 'Esquecer a conversão e tentar dividir ou multiplicar strings, ou usar vírgula em vez de ponto no Python para decimais (o Python usa 3.5 e não 3,5).',
    visualExample: {
      code: '# Sem float():\nx = "10"\ny = "2"\nprint(x + y)  # Resulta em "102"\n\n# Com float():\nx = float("10")\ny = float("2")\nprint(x + y)  # Resulta em 12.0',
      output: '102\n12.0',
      explanation: 'A conversão transforma o caractere "10" no número decimal 10.0, permitindo cálculos matemáticos verdadeiros.'
    }
  },
  {
    id: 'condicionais',
    badge: 'Conceito Fundamental #3',
    title: 'Tomada de Decisão (if, elif, else)',
    subtitle: 'Como o programa escolhe qual operação matemática executar',
    pythonSyntax: "if opcao == '1':\n    somar(num1, num2)\nelif opcao == '2':\n    subtrair(num1, num2)\nelse:\n    print('Opção inválida')",
    whyUseIt: 'Uma calculadora precisa saber se o usuário quer somar, subtrair, multiplicar ou dividir. As condicionais criam uma bifurcação no fluxo do código.',
    detailedExplanation: `As palavras condicionais funcionam como um semáforo de trânsito lógico:

1. **if ("se")**: É a primeira checagem. Se a condição for Verdadeira (\`True\`), executa as instruções indented abaixo e pula todo o resto.
2. **elif ("senão se")**: Se a condição anterior foi Falsa (\`False\`), o Python testa esta. Podemos ter dezenas de \`elif\`.
3. **else ("senão")**: Se nenhuma das condições anteriores foi atendida, o \`else\` é executado como rede de segurança.
4. **Operador ==**: Note que usamos dois sinais de igual para perguntar "opcao é igual a '1'?". Um sinal só (=) serve para atribuir valor, dois (==) para comparar!`,
    commonMistake: 'Esquecer os dois pontos (:) no fim da linha do if/elif/else ou esquecer a indentação de 4 espaços.',
    visualExample: {
      code: "opcao = '3'\nif opcao == '1':\n    print('Soma')\nelif opcao == '3':\n    print('Multiplicação!')\nelse:\n    print('Outro')",
      output: 'Multiplicação!',
      explanation: 'O Python testou opcao == \'1\' (falso), depois testou opcao == \'3\' (verdadeiro), imprimiu a mensagem e encerrou a estrutura.'
    }
  },
  {
    id: 'divisao-zero',
    badge: 'Conceito Fundamental #4',
    title: 'A Regra de Ouro: Proteção contra Divisão por Zero',
    subtitle: 'Por que a divisão precisa de um teste de segurança e como implementá-lo',
    pythonSyntax: 'def dividir(a, b):\n    if b == 0:\n        return "Erro: Impossível dividir por zero!"\n    return a / b',
    whyUseIt: 'Na matemática clássica, dividir qualquer número por zero é uma operação indefinida. No Python, se você tentar rodar 10 / 0, o programa trava imediatamente com um erro fatídico chamado ZeroDivisionError.',
    detailedExplanation: `Para construir um programa amigável e profissional, nós antecipamos esse erro:

Antes de pedir ao processador para fazer \`a / b\`, checamos se o denominador (\`b\`) é zero:
• Se \`b == 0\`: Retornamos uma mensagem de aviso educada em vez de deixar o programa explodir.
• Se \`b != 0\`: Realizamos a divisão normalmente com \`a / b\`.

Esse conceito em programação chama-se **Validação Defensiva (Defensive Programming)**.`,
    commonMistake: 'Fazer a conta antes de checar se o número é zero, fazendo com que o erro ocorra mesmo com o if escrito depois.',
    visualExample: {
      code: '# Testando a proteção:\nprint(dividir(10, 2))\nprint(dividir(8, 0))',
      output: '5.0\nErro: Impossível dividir por zero!',
      explanation: 'O primeiro caso executa a divisão normalmente (5.0). No segundo, a condição b == 0 é ativada e a mensagem segura é retornada sem travar.'
    }
  },
  {
    id: 'f-strings',
    badge: 'Conceito Fundamental #5',
    title: 'Interpolação de Texto com f-strings',
    subtitle: 'A forma moderna, limpa e legível de misturar texto e variáveis no Python',
    pythonSyntax: 'print(f"Resultado: {num1} + {num2} = {resultado}")',
    whyUseIt: 'Antigamente era preciso escrever "Resultado: " + str(num1) + " + " + str(num2) + " = " + str(resultado), o que gerava códigos cheios de vírgulas e fáceis de errar.',
    detailedExplanation: `As **f-strings** (strings formatadas) foram introduzidas no Python 3.6 e são a forma oficial e recomendada de juntar texto e código.

• Basta colocar a letra **f** minúscula antes da primeira aspa (ex: \`f"..."\`).
• Qualquer variável ou expressão dentro de **chaves { }** será avaliada e convertida em texto automaticamente.
• Você pode até fazer contas dentro das chaves, como \`f"{2 + 2}"\` que vira \`"4"\`.`,
    commonMistake: 'Esquecer a letra "f" antes da aspa. Sem o "f", o Python imprimirá literalmente "{num1}" na tela!',
    visualExample: {
      code: 'nome = "Ana"\nidade = 20\nprint(f"Olá, {nome}! Ano que vem você fará {idade + 1} anos.")',
      output: 'Olá, Ana! Ano que vem você fará 21 anos.',
      explanation: 'O Python substitui {nome} por "Ana" e calcula {idade + 1} para "21" em uma única linha elegante.'
    }
  }
];
