## Test Analisador de Hierarquia de Palavras

Este sistema analisa uma frase fornecida e retorna a quantidade de ocorrências das palavras que estão presentes em um dicionário pré-definido (dicts). O teste pode ser executado em um ambiente Docker.

### Pré-requisitos:
 - Docker instalado.
### Como executar a análise de uma frase:

```
syntax: bun run src/cli.ts analyze –depth <n> –verbose (optional) “{phrase}”
```
- O comando analisa a frase fornecida e exibe uma tabela com a contagem de palavras até o nível de profundidade especificado.

### Parâmetros:
1. `--depth <n>`: Define o nível de profundidade da árvore para o qual será exibida a contagem de palavras.
2. `"{frase}"`: Texto a ser analisado.
3. `--verbose (opcional)`: Caso informado, exibe uma tabela no stdout com as seguintes métricas:
    - Tempo de carregamento dos parâmetros (em milissegundos).
    - Tempo de verificação da frase (em milissegundos).

### Exemplos de Execução:
Com exibição do tempo de análise (--verbose):
```
docker-compose run --rm wa-svc bun run src/cli.ts analyze --depth 4 "tem cavalos" --verbose
```
- Esse comando analisa a frase "tem cavalos" até o nível de profundidade 4 e exibe os tempos de carregamento e verificação.

Sem exibição do tempo de análise:
 
```
docker-compose run --rm wa-svc bun run src/cli.ts analyze --depth 4 "tem cavalos"
```
- Neste caso, o tempo de execução não será exibido.

### Execução dos Testes:
Para executar os testes do sistema sem exibir o tempo de execução: 
```
docker-compose run --rm wa-svc bun test"
```