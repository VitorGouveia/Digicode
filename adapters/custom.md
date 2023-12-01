# Adaptador - Custom

Esse adaptador vai servir de base para a criação de portas de entrada e saída para a sua aplicação.

É possível criar o que quiser:

- [Node.js *Event Emitter*](https://nodejs.org/api/events.html)
- [Node.js *Streams*](https://nodejs.org/api/stream.html)
- Websockets
- HTTPs, HTTP/2

## Instalação

Crie uma pasta com o nome do seu adapter em `/lib/application`

> Você pode organizar os arquivos da forma que quiser dentro dessa pasta

No arquivo que você definir como principal, crie duas funções:

- `start()`, responsável por inicializar sua aplicação.
- `stop()`, responsável por parar todos os componentes da sua aplicação.

## Readme

Utilize o template de readme para o adaptador custom:

`````md
# Project Model

Esse projeto tem a finalidade de servir de base para a construção de aplicações Node.js.

## Novidades

Clique aqui para acessar o [CHANGELOG](CHANGELOG.md)

## Principais Funcionalidades

```http
GET /health-check HTTP/1.1
```

## Uso da API

O projeto possui as rotas:

[/health-check](#)

## Configurações

PORT: Porta na qual o servidor web ficará disponível. (DEFAULT 3333)

## Uso

Tenha as seguintes versões do node, docker...

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/vitorgouveia/project-model
```

2. Dentro da pasta do projeto, instale as dependências

```bash
npm i
```

### Testes

Para executar a *stack* de testes:

```
npm run test
```

Para executar somente os testes automatizados:

```bash
npm run test:dev
```

### Execução

Execute o script `start` para iniciar a aplicação

```bash
npm run start
```
```````