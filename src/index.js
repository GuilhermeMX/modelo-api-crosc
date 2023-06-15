import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js';
import { Database } from './database.js';

// const express = require('express');
// const { v4: uuidv4 } = require("uuid");

// const app = express();

// app.use(express.json());

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body;

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user)

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

