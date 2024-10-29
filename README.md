## Test Analisador de Hierarquia de Palavras

Este sistema analisa uma frase fornecida e retorna a quantidade de ocorrências das palavras que estão presentes em um dicionário pré-definido (dicts). O teste pode ser executado em um ambiente Docker.

Clone o repositório

```
git clone https://github.com/herlandio/wordanalyser.git
```
### Pré-requisitos:
 - Docker instalado.

### Para começar:
- Inicie os containers

```
docker-compose up -d
```

### Como executar a análise de uma frase:

```
syntax: docker-compose exec wa-svc bun run src/cli.ts analyze –depth <n> –verbose (optional) “{phrase}”
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
docker-compose exec wa-svc bun run src/cli.ts analyze --depth 5 "tem cavalos" --verbose
```

- Esse comando analisa a frase "tem cavalos" até o nível de profundidade 5 e exibe os tempos de carregamento e verificação.

Sem exibição do tempo de análise:

```
docker-compose exec wa-svc bun run src/cli.ts analyze --depth 5 "tem cavalos"
```
- Neste caso, o tempo de execução não será exibido.

### Execução dos Testes:
Para executar os testes do sistema sem exibir o tempo de execução:

```
docker-compose exec wa-svc bun test
```
## Front Reactjs

Permite a criação de hierarquias além de exibir visualmente os items adicionados, também a possibilidade de salvar em formato json.

 <img src="https://github.com/herlandio/wordanalyser/blob/development/front-analyser/Captura%20de%20tela%202024-10-29%20121450.png" width="350"/>
 <img src="https://github.com/herlandio/wordanalyser/blob/development/front-analyser/Captura%20de%20tela%202024-10-29%20121326.png" width="350"/>

Acesse a aplicação:
```
http://localhost:3000/
```
Uso: Ao clicar em salvar em formato json salve na pasta dicts dentro de cli-analyser onde a mesma consegue ler o conteúdo.

