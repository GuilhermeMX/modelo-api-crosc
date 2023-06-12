import http from 'node:http'

// const express = require('express');
// const { v4: uuidv4 } = require("uuid");

// const app = express();

// app.use(express.json());

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    })

    return res.writeHead(201).end()
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

