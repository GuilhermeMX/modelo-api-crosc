const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const users = [];

app.post("/user", (request, response) => {
  const { cpf, name } = request.body;

  const userAlreadyExists = users.some(
    (customer) => customer.cpf === cpf); 

  //Retornando status se o usuário já existir:   
  if (userAlreadyExists) {
    return response.status(400).json({error: "Este usuário já existe!"});
  }

  users.push({
    cpf,
    name,
    id: uuidv4(),
  });

  return response.status(201).send();
})

app.post("/cro", (request, response) => {

})

app.listen(3333);

