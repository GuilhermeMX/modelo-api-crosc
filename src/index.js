import http from 'node:http'

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// const app = express();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  // Testando se o regex bate com a url da requisição
  const route = routes.find(route => {
    return route.method == method && route.path.test(url); 
  })

  if (route) {
    const routeParams = req.url.match(route.path);

    // Declarando as variáveis de forma desestruturada de dentro da variável routeParams
    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {} // Especificando que se o meu query estiver vazio, ele retornará um objeto vazio e não quebrará a aplicação
     
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
})

server.listen(3333);

