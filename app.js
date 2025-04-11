// Criação da biblioteca

const bodyParser = require("body-parser");
const express = require("express"); // importa livraria do EXPRESS
const sqlite3 = require("sqlite3"); // importa livraria do sqlite3

const PORT = 3000; // Porta TCP do servidor HTTP da aplicação

const app = express(); // Instância para o uso do EXPRESS

// Cria conexão com o banco de dados
const db = new sqlite3.Database("user.db"); // Instância para o uso do SQlite3, e usa o arquivo "user.db"

db.serialize(() => {
  // Este método permite enviar comandos SQL em modo 'SEQUENCIAL'
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT, celular TEXT, cpf TEXT, rg TEXT)"
  );
});

// Primeiro parametro é o caminho da URL, enquanto o segundo parâmetro éo caminho da pasta
app.use("/static", express.static(__dirname + "/static"));

//Midlleware para processar as requisições do Body Parameters do cliente
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar EJS como motor de visualização
app.set("view engine", "ejs");

// A patir de agora utilizaremos a visualização através de render

const index =
  "<a href='/sobre'>Sobre</a> <br> <a href='/login'>Login</a> <br> <a href='/cadastro'>Cadastro</a>";
// const sobre = "Você está na página SOBRE  <br> <a href='/'>Voltar</a>";
const login = "Você está na página de LOGIN <br> <a href='/'>Voltar</a>";
// const cadastro = "Você está na página de CADASTRO  <br> <a href='/'>Voltar</a>";

// Método express.get necessita de dois parâmetros. Na ARROW FUNCTION, o
// primeiro são os dados do servidor (REQUISITION - 'req') o segundo, são os
// dados que serão enviados ao cliente (RESULT - 'res')

app.get("/", (req, res) => {
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:3000/
  // res.send(index);

  console.log("GET / INDEX");
  // res.render("index"); // Utilizando o render pela pasta views

  res.redirect("/cadastro");
});

// GET USUARIOS
app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {
    console.log(`GET /usuarios ${JSON.stringify(row)}`);
    res.render("usertable");
  });
});

// GET SOBRE
app.get("/sobre", (req, res) => {
  // Rota raiz do meu servidor da pagina SOBRE, acesse o browser com o endereço http://localhost:3000/sobre
  console.log("GET / SOBRE");
  res.render("sobre");
});

// GET LOGIN
app.get("/login", (req, res) => {
  // Rota raiz do meu servidor da pagina LOGIN, acesse o browser com o endereço http://localhost:3000/login
  console.log("GET / LOGIN");
  res.render("login");
});

// GET LOGIN
app.get("/dashboard", (req, res) => {
  // Rota raiz do meu servidor da pagina LOGIN, acesse o browser com o endereço http://localhost:3000/login
  console.log("GET / DASHBOARD");
  res.render("dashboard");
});

// POST LOGIN
app.post("/login", (req, res) => {
  // Rota raiz do meu servidor da pagina LOGIN, acesse o browser com o endereço http://localhost:3000/login
  console.log("POST / LOGIN");
  res.send("login ainda não emplementado.");
});

// GET CADASTRO
app.get("/cadastro", (req, res) => {
  // Rota raiz do meu servidor da pagina CADASTRO, acesse o browser com o endereço http://localhost:3000/cadastro
  console.log("GET / CADASTRO");
  res.render("cadastro");
});

// POST CADASTRO
app.post("/cadastro", (req, res) => {
  // Linha para depurar se esta vindo no req.body
  !req.body
    ? console.log(`Body vazio: ${req.body}`)
    : console.log(JSON.stringify(req.body));
  // Rota raiz do meu servidor da pagina CADASTRO, acesse o browser com o endereço http://localhost:3000/cadastro

  // Colocar aqui as validações e inclusões no banco de dados do cadastro do usuario
  console.log("POST / CADASTRO");
  const { username, password, email, celular, cpf, rg } = req.body;

  // 1 - Validar dados do usuario

  // 2 - Saber se ele já existe no banco
  const query =
    "SELECT * FROM users WHERE email = ? OR cpf = ? OR rg = $rg OR username = ?";
  // INSERT INTO users (username, password, email, celular, cpf, rg) VALUES (?,?,?,?,?,?)
  db.get(query, [email, cpf, rg, username], (err, row) => {
    if (err) throw err;

    if (row) {
      // A váriavel row irá retornar os dados do bancos de dados executados
      // através do SQL, variável query
      res.send("Usuário já cadastrado, refaça o cadastro");
    } else {
      // 3 - Se o usuario não existe no banco cadastrar, redirecione ele para a pagina do cadastro
      const insertQuery =
        "INSERT INTO users (username, password, email, celular, cpf, rg) VALUES (?,?,?,?,?,?)";
      db.run(
        insertQuery,
        [username, password, email, celular, cpf, rg],
        (err) => {
          // Inserir a lógica do INSERT
          if (err) throw err;
          res.send("Usuário cadastro, com sucesso");
        }
      );
    }
  });

  // O app.listen() precisa ser SEMPRE ser executado por último. (app.js)
});
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});
