//Arquivo responsável por receber as requisições da Dashboard e chamar a Model

var dashboardModel = require("../models/dashboardModel");

//Busca o total de fotos registradas do usuário
function buscarTotalFotos(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else {
        dashboardModel.buscarTotalFotos(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado[0]);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Erro ao buscar total de fotos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarFotosMesAtual(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else {
        dashboardModel.buscarFotosMesAtual(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as fotos do mês atual! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}
//Busca a média mensal de fotos do usuário
function buscarMediaMensal(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario me está undefined!");
    } else {
        dashboardModel.buscarMediaMensal(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Erro ao buscar média mensal: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Busca as semanas ativas (streak) do usuário
function buscarStreak(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else {
        dashboardModel.buscarStreak(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Erro ao buscar as streaks: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

//Gráficos 

function buscarCategorias(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else {
        dashboardModel.buscarCategorias(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Erro ao buscar as categorias: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function buscarFotosPorMes(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else {
        dashboardModel.buscarFotosPorMes(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Erro ao buscar as fotos por mês: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


// Exporta as funções para serem utilizadas no arquivo de rotas
module.exports = {
    buscarTotalFotos,
    buscarMediaMensal,
    buscarStreak,
    buscarCategorias,
    buscarFotosPorMes,
    buscarFotosMesAtual
};