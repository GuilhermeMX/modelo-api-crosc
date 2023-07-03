import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

// Adicionar # antes de uma propriedade transforma essa propriedade em privada
export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {  // Transformando o objeto search em array e verificando se o search bate com o banco
          return row[key].toLowerCase().includes(value.toLowerCase());
        })
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    // Procurando se existe um usuário com ID correspondente
    const rowIndex = this.#database[table].findIndex(row => row.id === id);

    // Se existir, remove e salva o banco
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data } //Substituindo os dados antigos pelo data do request
      this.#persist;
    }
  }

  delete(table, id) {
    //Procurando se existe um usuário com ID correspondente
    const rowIndex = this.#database[table].findIndex(row => row.id === id);

    // Se existir, remove e salva o banco
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist;
    }
  }
}