# Adaptador - API

Esse adaptador vai criar um servidor web Express.js, o que vai habilitar a construção de rotas e comunicação HTTP.

## Instalação

1. Instale as seguintes dependências

```js
npm i express
```

2. Crie o arquivo do servidor `/lib/application/http/server.js` e insira o código:

```js
import express from "express";

import * as routes from "./routes.js";

const PORT = process.env.PORT;

const app = express();

let server = null;

function notFoundHandler(_, response) {
  return response.status(404).json({
    error: "404 Not found",
  });
}

export const start = async () => {
  app.use(express.json());

  app.use("/v1", routes.router);

  app.use(notFoundHandler);

  server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
};

export const stop = () => {
  if (server) {
    server.close();
  }

  process.exit(0);
};
```

3. Crie o arquivo de rotas `/lib/application/http/routes.js` e insira o código:

```js
import express from "express";

import * as students from "./controllers/students.js";

export const router = express.Router();

router.get("/", students.hello);
```

4. Crie quaisquer *controllers* na pasta `/lib/application/http/controllers` como um arquivo Javascript e os adicione no arquivo de rotas.

5. Agora alt o arquivo `index.js`:

```diff
import "dotenv/config.js";

import { start } from "./lib/application/node.js"
+import * as server from "./lib/application/http/server.js"

const shutdown = async () => {
  console.log("Starting graceful shutdown");
+ server.stop()
};

process
  .on("SIGTERM", shutdown)
  .on("SIGINT", shutdown)
  .on("uncaughtException", (error) => {
    console.log("uncaughtException");
    console.log("Name: ", error.name);
    console.log(error.message);
    throw error;
  })
  .on("unhandledRejection", (error) => {
    console.log("unhandledRejection");
    console.log("Name: ", error.name);
    console.log(error.message);
    throw error;
  })
  .on("exit", (code) => {
    console.log(`exiting with code ${code}`);
  });

try {
  start()
+ await server.start()
  console.log("APP Started successfully!");
} catch (error) {
  console.log("APP Initialization failed!", error.name);
  throw error;
}
```

## Readme

Utilize o template de readme para o adaptador API:

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