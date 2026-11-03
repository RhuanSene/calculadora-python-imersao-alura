# Calculadora de terminal em Python

Uma calculadora simples que roda no terminal e faz as quatro operações básicas. Fiz este projeto para praticar três coisas que aparecem em qualquer programa: executar instruções em ordem, guardar valores em variáveis e decidir o que fazer com um if.

## Como rodar

Você só precisa do Python 3 instalado.

    python calculadora.py

O programa mostra um menu com quatro opções, pede a escolha e depois pede dois números.

    1 - Somar
    2 - Subtrair
    3 - Multiplicar
    4 - Dividir

## Como o código está organizado

Cada operação tem a sua própria função: somar, subtrair, multiplicar e dividir. Todas recebem dois parâmetros, a e b, e devolvem o resultado com return. Separar assim deixa o bloco principal curto e facilita testar cada conta sozinha.

O menu é só uma sequência de print. Depois dele, o input pausa o programa e espera o usuário digitar.

A parte de decisão usa if, elif e else. O Python olha as condições de cima para baixo e executa só a primeira que for verdadeira. O else no final pega qualquer opção que não existe, como o 9, e avisa que é inválida em vez de quebrar.

## Entrada de dados

Uma coisa que me confundiu no começo: o input sempre devolve texto. Por isso a opção do menu é comparada com aspas (opcao == '1'), já que o valor é a string "1" e não o número 1.

Com os números a conversão é necessária. Sem ela, "5" + "5" dá "55", porque o Python junta os dois textos. Usei float(input(...)) para obter 10.0 e, de quebra, aceitar decimais como 4.5.

As variáveis opcao, num1 e num2 ficam na memória até o cálculo terminar.

## Divisão por zero

Dividir por zero gera o erro ZeroDivisionError e derruba o programa. Para evitar isso, a função dividir confere se b == 0 antes de fazer a conta. Se for, devolve uma mensagem avisando que não dá para dividir por zero.

## Saída

O resultado é impresso com uma f-string, que troca o que está entre chaves pelo valor das variáveis:

    print(f"Resultado: {num1} + {num2} = {resultado}")

## Testes que vale a pena fazer

Rodei estes casos para ver como o programa se comporta:

| Entrada | Saída esperada | O que mostra |
|---------|----------------|--------------|
| 15.5 + 4.25 | 19.75 | Decimais funcionam |
| 7 - 20 | -13.0 | A ordem dos argumentos importa |
| 50 * 0 | 0.0 | Multiplicar por zero |
| 12 / 0 | Mensagem de aviso | O programa não quebra |
| Opção 9 | "Opção inválida" | Cai no else |

Se você digitar uma letra no lugar de um número, o float() ainda lança ValueError. Esse caso eu não tratei. Um try/except resolveria, e é o próximo passo que pretendo fazer.

## Ideias para depois

- Tratar letras digitadas com try/except
- Deixar o programa rodar em loop até o usuário escolher sair
- Adicionar potência e resto da divisão

## Licença

Uso livre para estudo.
