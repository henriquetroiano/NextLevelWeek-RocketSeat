//importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose();

//criar o obj que ira fazer operações no BD
const db = new sqlite3.Database('./src/database/database.db')

//utilizar o obj de banco de dados para o projeto
db.serialize(() => {
  //com comandos SQL eu vou:

  // 1 Criar uma Tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)

  // 2 Inserir dados na Tabela
  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?
  );
`;

  const values = [
    "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
    "Colectoria",
    "Guilherme Gemballa, Jardim América",
    "N° 260",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos, Lâmpadas",
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err)
    }

    console.log("Cadastrado com sucesso");
    console.log(this)
  }



  db.run(query, values, afterInsertData)

  // 3 Consultar os dados da Tabela
  // 4 Deletar um dado da tabela

})
