import { PythonCodeVersion } from '../types/index.ts';

export const PYTHON_VERSIONS: PythonCodeVersion[] = [
  {
    id: 'basic',
    title: '1. Versão Essencial (Recomendada para Iniciar)',
    subtitle: 'Estrutura limpa com 4 funções, input(), float(), if/elif/else e proteção de divisão por zero',
    filename: 'calculadora_simples.py',
    description: 'O ponto de partida ideal. Ensina como isolar cada cálculo em uma função (def), receber dados com input(), converter para float e tomar decisões com if/elif/else.',
    code: `# ==========================================
# CALCULADORA SIMPLES EM PYTHON
# As 4 operações matemáticas fundamentais
# ==========================================

# 1. DEFINIÇÃO DAS FUNÇÕES
# Cada função recebe dois valores (a e b) e retorna a resposta
def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    # Proteção matemática: nenhum número pode ser dividido por zero!
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# 2. EXIBIÇÃO DO MENU
print("=" * 35)
print("     CALCULADORA EM PYTHON")
print("=" * 35)
print("Escolha a operação desejada:")
print("1 - Soma (+)")
print("2 - Subtração (-)")
print("3 - Multiplicação (*)")
print("4 - Divisão (/)")
print("-" * 35)

# 3. ENTRADA DE DADOS DO USUÁRIO
opcao = input("Digite a opção (1/2/3/4): ")

# 4. LEITURA DOS DOIS NÚMEROS
# Usamos float() para permitir decimais como 4.5 ou 10.25
num1 = float(input("Digite o primeiro número: "))
num2 = float(input("Digite o segundo número: "))

# 5. TOMADA DE DECISÃO (CONDICIONAIS)
print("-" * 35)
if opcao == '1':
    resultado = somar(num1, num2)
    print(f"Resultado: {num1} + {num2} = {resultado}")

elif opcao == '2':
    resultado = subtrair(num1, num2)
    print(f"Resultado: {num1} - {num2} = {resultado}")

elif opcao == '3':
    resultado = multiplicar(num1, num2)
    print(f"Resultado: {num1} * {num2} = {resultado}")

elif opcao == '4':
    resultado = dividir(num1, num2)
    print(f"Resultado: {num1} / {num2} = {resultado}")

else:
    print("Opção inválida! Escolha apenas 1, 2, 3 ou 4.")

print("=" * 35)
print("Fim do programa!")`,
    annotations: [
      {
        lineNumber: 7,
        code: 'def somar(a, b):',
        component: 'funcao',
        title: 'Definição de Função (def)',
        explanation: 'A palavra-chave "def" cria uma função reutilizável chamada "somar". Os parênteses recebem dois parâmetros (a e b), que serão os números a somar.',
        tip: 'Funções deixam o código organizado e evitam repetição de lógica.'
      },
      {
        lineNumber: 8,
        code: '    return a + b',
        component: 'funcao',
        title: 'Instrução return',
        explanation: 'O comando "return" envia o resultado da conta de volta para onde a função foi chamada no código.',
        tip: 'Diferente de print(), return entrega o valor para ser guardado em uma variável.'
      },
      {
        lineNumber: 16,
        code: 'def dividir(a, b):',
        component: 'divisao_zero',
        title: 'Função com Validação de Divisão',
        explanation: 'A divisão precisa de cuidado especial: se o denominador (b) for igual a 0, o Python lançaria o erro ZeroDivisionError.',
        tip: 'Sempre teste o segundo número antes de efetuar a barra (/).'
      },
      {
        lineNumber: 18,
        code: '    if b == 0:',
        component: 'divisao_zero',
        title: 'Verificação if b == 0',
        explanation: 'Verificamos com os dois sinais de igual (==) se o valor de "b" é exatamente zero.',
        tip: 'Um único sinal "=" atribui valor; dois sinais "==" comparam valores.'
      },
      {
        lineNumber: 33,
        code: 'opcao = input("Digite a opção (1/2/3/4): ")',
        component: 'input',
        title: 'Entrada de Dados com input()',
        explanation: 'Pausa o programa e espera o usuário digitar algo e pressionar Enter. O texto digitado é guardado na variável "opcao".',
        tip: 'Atenção: o input() SEMPRE devolve um texto (string), por isso comparamos com \'1\' em vez de 1.'
      },
      {
        lineNumber: 37,
        code: 'num1 = float(input("Digite o primeiro número: "))',
        component: 'conversao',
        title: 'Conversão com float()',
        explanation: 'Como o input() gera texto, precisamos convertê-lo em número usando float(). Sem isso, "5" + "5" viraria "55" em vez de 10!',
        tip: 'float suporta números decimais (3.14). Se quisesse apenas números inteiros, usaria int().'
      },
      {
        lineNumber: 42,
        code: "if opcao == '1':",
        component: 'condicional',
        title: 'Condicional if (Se)',
        explanation: 'Avalia se a condição é verdadeira. Se o usuário digitou "1", entra neste bloco e executa a soma.',
        tip: 'Observe a indentação (4 espaços à direita) nas linhas de dentro do bloco.'
      },
      {
        lineNumber: 46,
        code: "elif opcao == '2':",
        component: 'condicional',
        title: 'Condicional elif (Senão Se)',
        explanation: 'Se a primeira condição foi falsa, o Python testa a próxima com "elif". É a abreviação elegante de "else if".',
        tip: 'Você pode encadear quantos elif quiser!'
      },
      {
        lineNumber: 58,
        code: 'else:',
        component: 'condicional',
        title: 'Condicional else (Senão)',
        explanation: 'O "else" captura qualquer entrada que não seja 1, 2, 3 ou 4 (por exemplo, se o usuário digitou 9 ou "olá").',
        tip: 'Excelente prática para orientar o usuário sobre entradas inesperadas.'
      },
      {
        lineNumber: 44,
        code: '    print(f"Resultado: {num1} + {num2} = {resultado}")',
        component: 'outro',
        title: 'F-string (Formatação Elegante)',
        explanation: 'O prefixo "f" antes das aspas permite colocar variáveis dentro de chaves {num1}, facilitando muito a leitura do texto.',
        tip: 'É o método padrão e moderno do Python para montar frases com variáveis.'
      }
    ]
  },
  {
    id: 'loop',
    title: '2. Versão Interativa Contínua (Com Loop while)',
    subtitle: 'Permite realizar vários cálculos seguidos sem precisar reabrir o programa',
    filename: 'calculadora_com_loop.py',
    description: 'Adiciona um loop "while True", permitindo que o usuário faça 10, 20 cálculos seguidos e só encerre o programa quando digitar a opção 5 (Sair).',
    code: `# ==========================================
# CALCULADORA EM PYTHON COM LOOP (while)
# Faça vários cálculos seguidos sem reiniciar
# ==========================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero!"
    return a / b

# O loop 'while True' mantém a calculadora ativa
while True:
    print("\\n" + "=" * 35)
    print("        MENU DA CALCULADORA")
    print("=" * 35)
    print("1 - Soma (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("5 - Sair do programa")
    print("-" * 35)

    opcao = input("Escolha uma opção (1-5): ")

    # Se o usuário escolheu 5, quebramos o loop com break
    if opcao == '5':
        print("\\nObrigado por usar a calculadora! Até logo.")
        break

    # Verifica se a opção digitada é válida antes de pedir os números
    if opcao not in ['1', '2', '3', '4']:
        print("Opção inválida! Tente novamente.")
        continue  # Volta para o início do while

    num1 = float(input("Digite o 1º número: "))
    num2 = float(input("Digite o 2º número: "))

    if opcao == '1':
        print(f"\\n> {num1} + {num2} = {somar(num1, num2)}")
    elif opcao == '2':
        print(f"\\n> {num1} - {num2} = {subtrair(num1, num2)}")
    elif opcao == '3':
        print(f"\\n> {num1} * {num2} = {multiplicar(num1, num2)}")
    elif opcao == '4':
        print(f"\\n> {num1} / {num2} = {dividir(num1, num2)}")`,
    annotations: [
      {
        lineNumber: 19,
        code: 'while True:',
        component: 'loop',
        title: 'Loop Infinito Controlado',
        explanation: 'Enquanto a condição for Verdadeira (True), o bloco de código se repete infinitamente até encontrar uma instrução "break".',
        tip: 'Muito comum em menus de jogos e programas de terminal.'
      },
      {
        lineNumber: 33,
        code: '        break',
        component: 'loop',
        title: 'Instrução break (Interromper)',
        explanation: 'O comando "break" interrompe imediatamente a execução do loop "while" mais próximo e segue para o fim.',
        tip: 'Usado para sair do loop quando o usuário escolher a opção 5.'
      },
      {
        lineNumber: 38,
        code: "        continue",
        component: 'loop',
        title: 'Instrução continue (Pular para o início)',
        explanation: 'O comando "continue" interrompe a iteração atual e volta direto para o topo do while, sem pedir os números se a opção for inválida.',
        tip: 'Evita perguntar números à toa se a opção estiver errada!'
      }
    ]
  },
  {
    id: 'robust',
    title: '3. Versão Blindada (Com try / except)',
    subtitle: 'Protege o programa contra falhas caso o usuário digite letras em vez de números',
    filename: 'calculadora_robusta.py',
    description: 'Quando um usuário digita "dez" em vez de 10, o float() quebra o programa com ValueError. Aqui você aprende como usar try/except para contornar isso de forma profissional.',
    code: `# ==========================================
# CALCULADORA BLINDADA COM TRY / EXCEPT
# Tratamento de exceções e entradas inválidas
# ==========================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero!"
    return a / b

# Função auxiliar para pedir um número com validação
def ler_numero(mensagem):
    while True:
        try:
            valor = float(input(mensagem))
            return valor
        except ValueError:
            print("Entrada inválida! Por favor, digite um número válido.")

# Execução principal
print("--- CALCULADORA COM TRATAMENTO DE ERROS ---")
print("1: Soma | 2: Subtração | 3: Multiplicação | 4: Divisão")

opcao = input("Escolha a operação (1-4): ")

if opcao in ['1', '2', '3', '4']:
    n1 = ler_numero("Digite o 1º número: ")
    n2 = ler_numero("Digite o 2º número: ")

    if opcao == '1':
        print(f"Resultado: {somar(n1, n2)}")
    elif opcao == '2':
        print(f"Resultado: {subtrair(n1, n2)}")
    elif opcao == '3':
        print(f"Resultado: {multiplicar(n1, n2)}")
    elif opcao == '4':
        print(f"Resultado: {dividir(n1, n2)}")
else:
    print("Opção inválida.")`,
    annotations: [
      {
        lineNumber: 22,
        code: '        try:',
        component: 'tratamento_erro',
        title: 'Bloco try (Tente)',
        explanation: 'O bloco try avisa o Python: "Tente executar este código perigoso que pode causar erro". Se der certo, segue normalmente.',
        tip: 'Usado para capturar erros em tempo de execução sem travar o programa.'
      },
      {
        lineNumber: 25,
        code: '        except ValueError:',
        component: 'tratamento_erro',
        title: 'Bloco except ValueError (Capture o Erro)',
        explanation: 'Se o float() não conseguir converter o texto em número, o Python salta para cá em vez de fechar o programa na cara do usuário.',
        tip: 'Permite exibir uma mensagem amigável e tentar novamente.'
      }
    ]
  }
];
