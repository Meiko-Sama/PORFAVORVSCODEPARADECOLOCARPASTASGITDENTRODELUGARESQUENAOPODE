// Criação da biblioteca

const express = require("express");

// const PORT = 3000; // Porta TCP do servidor HTTP da aplicação

const app = express();

// Método express.get necessita de dois parâmetros. Na ARROW FUNCTION, o primeiro
app.get("/", (req, res) => {
  res.send("Olá MEU SER");
});

// O app.listen() precisa ser SEMPRE ser executado por último. (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});
