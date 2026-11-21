const express = require('express');
const router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/total-fotos/:idUsuario", function(req, res){
    dashboardController.buscarTotalFotos(req, res);
});

router.get("/fotos-mes-atual/:idUsuario", function (req, res) {
    dashboardController.buscarFotosMesAtual(req, res);
});

router.get("/media-mensal/:idUsuario", function(req, res){
    dashboardController.buscarMediaMensal(req, res);
});

router.get("/streak/:idUsuario", function(req, res){
    dashboardController.buscarStreak(req, res);
});

// Rota para buscar a distribuição de fotos por categoria (Gráfico 1)
// Exemplo: GET /dashboard/categorias/1
router.get("/categorias/:idUsuario", function (req, res) {
    dashboardController.buscarCategorias(req, res);
});

// Rota para buscar a quantidade de fotos por mês no ano (Gráfico 2)
// Exemplo: GET /dashboard/fotos-mes/1
router.get("/fotos-mes/:idUsuario", function (req, res) {
    dashboardController.buscarFotosPorMes(req, res);
});

// Exporta o roteador para ser registrado no app.js
module.exports = router;

