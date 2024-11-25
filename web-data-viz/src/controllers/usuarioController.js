var usuarioModel = require("../models/usuarioModel");
var empresaModel = require("../models/empresaModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
  } else {

      usuarioModel.autenticar(email, senha)
          .then(
              function (resultadoAutenticar) {
                  console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                  console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                  if (resultadoAutenticar.length == 1) {
                      console.log(resultadoAutenticar);

                      empresaModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].nome)
                          .then((resultadoAutenticar) => {
                              if (resultadoAutenticar.length > 0) {
                                  res.json({
                                      id: resultadoAutenticar[0].id,
                                      email: resultadoAutenticar[0].email,
                                      nome: resultadoAutenticar[0].nome,
                                      senha: resultadoAutenticar[0].senha
                                  });
                              } else {
                                  res.status(204).json({ aquarios: [] });
                              }
                          })
                  } else if (resultadoAutenticar.length == 0) {
                      res.status(403).send("Email e/ou senha inválido(s)");
                  } else {
                      res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                  }
              })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function votarPorNome(req, res) {
  var nomeJogo = req.params.nomeJogo;
  console.log("Jogo recebido:", nomeJogo);

  votoModel.atualizarVoto(nomeJogo)                             // invoca a função da model para atualizar os votos
    .then(function (resultado) {                                // ENTÃO, obtém o resultado após retornar a execução da query SQL na model
      res.status(200).send("Voto contabilizado com sucesso!");  // -- retorna o status 200 (OK) com a mensagem "Voto contabilizado com sucesso!"
    })
    .catch(function (erro) {                                                // CAPTURA qualquer erro ocorrido durante a execução da query para a busca dos votos
      console.log(erro);                                                    // exibe o JSON contendo as informações do erro ocorrido
      console.log("Houve um erro ao atualizar os votos.", erro.sqlMessage); // exibe a mensagem do erro ocorrido
      res.status(500).json(erro.sqlMessage);                                // retorna o status 500 (Erro) com a mensagem do erro ocorrido
    });              
}

function obterVotosAtualizados(req, res) {
  console.log(`Buscando os votos...`);

  votoModel.buscarVotos()                                     // invoca a função da model para buscar os votos
    .then(function (resultado) {                              // ENTÃO, obtém o resultado após retornar a execução da query SQL na model
      if (resultado.length > 0) {                             // - verifica se obteve resultados
        console.log(resultado);                               // -- exibe no console o resultado obtido
        res.status(200).json(resultado);                      // -- retorna o status 200 (OK) com os dados formatados em JSON
      } else {                                                // - caso não obtenha resultados
        res.status(204).send("Nenhum resultado encontrado!"); // -- retorna o status 204 (Not Found) com a mensagem "Nenhum resultado encontrado!"
      }
    })
    .catch(function (erro) {                                             // CAPTURA qualquer erro ocorrido durante a execução da query para a busca dos votos
      console.log(erro);                                                 // exibe o JSON contendo as informações do erro ocorrido
      console.log("Houve um erro ao buscar os votos.", erro.sqlMessage); // exibe a mensagem do erro ocorrido
      res.status(500).json(erro.sqlMessage);                             // retorna o status 500 (Erro) com a mensagem do erro ocorrido
    });
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send(`Seu nome está undefined`);
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, email, senha)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  autenticar,
  cadastrar,
  votarPorNome,
  obterVotosAtualizados,
};
