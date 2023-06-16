import http from 'node:http'

import { json } from './middlewares/json.js';
import { routes } from './routes.js';

// const app = express();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  const route = routes.find(route => {
    return route.method == method && route.path == url; 
  })

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
})

// app.post("/users", (request, response) => {
//   const { username, name } = request.body;

//   const userAlreadyExists = users.some(
//     (user) => user.username === username); 

//   //Retornando status se o usuário já existir:   
//   if (userAlreadyExists) {
//     return response.status(400).json({error: "Este usuário já existe!"});
//   }

//   users.push({
//     username,
//     name,
//     id: uuidv4(),
//     todos: [],
//   });

//   return response.status(201).send();
// })

// app.get("/todos", (request, response) => {
//   const { username } = request.headers;

//   const user = users.find(user => user.username === username);

//   if (!user) {
//     return response.status(400).json({ error: "usuário não encontrado" })
//   }

//   return response.json(user.todos)
// })

// app.post("/newtodo", (request, response) => {
//   const { title, deadline } = request.body; 

//   const { user } = request;

//   const todoOperation = {
//     id: uuidv4(),
//     title: '',
//     done: false, 
//     deadline: new Date(deadline), 
// 	  created_at: new Date()
//   }

//   user.todos.push(todoOperation);

//   return response.status(201).send();
// })

server.listen(3333);

