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
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, password TEXT, email TEXT, celular TEXT, cpf TEXT, rg TEXT)"
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
  "<a href='/home'>Home</a> <br><a href='/sobre'>Sobre</a> <br> <a href='/login'>Login</a> <br> <a href='/cadastro'>Cadastro</a>";
const home = "Você está na página HOME <br> <a href='/'>Voltar</a>";
const sobre = "Você está na página SOBRE  <br> <a href='/'>Voltar</a>";
const login = "Você está na página de LOGIN <br> <a href='/'>Voltar</a>";
const cadastro = "Você está na página de CADASTRO  <br> <a href='/'>Voltar</a>";

// Método express.get necessita de dois parâmetros. Na ARROW FUNCTION, o
// primeiro são os dados do servidor (REQUISITION - 'req') o segundo, são os
// dados que serão enviados ao cliente (RESULT - 'res')

app.get("/", (req, res) => {
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:3000/
  // res.send(index);

  res.render("cadastroFormulario"); // Utilizando o render pela pasta views
});

app.get("/home", (req, res) => {
  // Rota raiz do meu servidor da pagina HOME,acesse o browser com o endereço http://localhost:3000/hom
  res.send(home);
});

app.get("/sobre", (req, res) => {
  // Rota raiz do meu servidor da pagina SOBRE, acesse o browser com o endereço http://localhost:3000/sobre
  res.send(sobre);
});

app.get("/login", (req, res) => {
  // Rota raiz do meu servidor da pagina LOGIN, acesse o browser com o endereço http://localhost:3000/login
  res.render("loginFormulario");
});

app.post("/login", (req, res) => {
  // Rota raiz do meu servidor da pagina LOGIN, acesse o browser com o endereço http://localhost:3000/login
  res.send("login ainda não emplementado.");
});

app.get("/cadastro", (req, res) => {
  // Rota raiz do meu servidor da pagina CADASTRO, acesse o browser com o endereço http://localhost:3000/cadastro
  res.send(cadastro);
});

app.post("/cadastro", (req, res) => {
  // Linha para depurar se esta vindo no req.body
  !req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`Body vazio: ${req.body}`);
  // Rota raiz do meu servidor da pagina CADASTRO, acesse o browser com o endereço http://localhost:3000/cadastro

  // Colocar aqui as validações e inclusões no banco de dados do cadastro do usuario
  res.send(
    `Bem-vindo usuario: ${req.body.nome}, seu email é ${req.body.email}`
  );
});

// O app.listen() precisa ser SEMPRE ser executado por último. (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});
