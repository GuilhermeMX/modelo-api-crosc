import { randomUUID } from 'node:crypto'
import { Database } from "./database.js";
import { buildRoutePath } from './utils/build.route.path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users')

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params //Coletando o id de forma desestruturada. Também pode ser feito por: const id = req.params.id
      const { name, email } = req.body

      database.update('users', id, {
        name,
        email,
      })
      
      return res.writeHead(204).end() //Código http de sucesso que não retorna conteúdo
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params //Coletando o id de forma desestruturada. Também pode ser feito por: const id = req.params.id

      database.delete('users', id)
      
      return res.writeHead(204).end() //Código http de sucesso que não retorna conteúdo
    },
  }
]