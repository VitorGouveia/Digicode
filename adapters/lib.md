# Adaptador - API

Esse adaptador vai criar um cliente API para acessar sua aplicação.

Exemplo de uso:

```js
const api = new Client()

const hello = await api.hello()

console.log(hello) // { "hello": "world" }
```

## Instalação

1. Crie o *entrypoint* da biblioteca em `/lib/application/lib.js` e insira o código:

```js
import * as healthCheck from "../domain/usecases/health-check.js";

const api = {
  status: {
    healthCheck: () => {
      const info = healthCheck.machineInfo()

      return info
    }
  }
};

export const client = () => {
  // faça a lógica de API Key ou configurações iniciais aqui
  return api;
};
```

2. Utilize sua API em qualquer lugar da sua aplicação:

```js
import { client } from "./application/lib.js"

const api = client()

const machineInfo = api.status.healthCheck()

console.log(machineInfo)
```

## Readme

Utilize o template de readme para o adaptador de biblioteca:

`````md
# Project Model

Esse projeto tem a finalidade de servir de base para a construção de aplicações Node.js.

## Novidades

Clique aqui para acessar o [CHANGELOG](CHANGELOG.md)

## Principais Funcionalidades

> Descreva aqui os Use Cases

- healthCheck, retorna informações da máquina

## Uso da API

O projeto possui as rotas:

[`status.healthCheck()`](#health-check)

### Health Check

> Exemplos de uso, peculiaridades da funcionalidade, retorno

Não tem parâmetros...

```
api.status.healthCheck()
```

## Configurações

> Explique as configurações do seu projeto

TOKEN: Token utilizado como segredo do JWT. (DEFAULT secret-token)

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

```js
const api = new Client()

const hello = await api.hello()

console.log(hello) // { "hello": "world" }
```
```````