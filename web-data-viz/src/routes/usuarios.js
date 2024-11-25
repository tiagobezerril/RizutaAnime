var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/votar/:nomeJogo", function (req, res) {
    votoController.votarPorNome(req, res); // invoca a função da controller para "incrementar votos por nome do jogo"
  });

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/ultimos", function (req, res) {
    votoController.obterVotosAtualizados(req, res); // invoca a função da controller para "obter os votos atualizados"
  });
  
module.exports = router;