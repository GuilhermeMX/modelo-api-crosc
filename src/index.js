const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const users = [];

app.post("/user", (request, response) => {
  const { username, name } = request.body;

  const userAlreadyExists = users.some(
    (user) => user.username === username); 

  //Retornando status se o usuário já existir:   
  if (userAlreadyExists) {
    return response.status(400).json({error: "Este usuário já existe!"});
  }

  users.push({
    username,
    name,
    id: uuidv4(),
    todos: [],
  });

  return response.status(201).send();
})

app.get("/todos", (request, response) => {
  const { username } = request.headers;

  const user = users.find(user => user.username === username);

  if (!user) {
    return response.status(400).json({ error: "usuário não encontrado" })
  }

  return response.json(user.todos)
})

app.post("/newtodo", (request, response) => {
  
})

app.listen(3333);

