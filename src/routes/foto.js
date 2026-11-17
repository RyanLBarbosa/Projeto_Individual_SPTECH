//Importa a biblioteca express e router
const express = require('express');
const router = express.Router();

//Importa o configUpload oficial da SPTech
var upload = require("../config/configUpload"); //Carrega a configuração do multer
var fotoController = require("../controllers/fotoController"); //Carrega o controller de fotos

//Intercepta o envio do arquivo 'foto' pelo Multer antes de chamar o controller
router.post("/cadastrar", upload.single("foto"), function (req, res) {
    fotoController.cadastrar(req, res);
});

//Recebe o ID do usuário como parametro na URL para buscar suas fotos registradas
router.get("/listar/:fk_usuario", function (req, res) {
    fotoController.listarPorUsuario(req, res);
});

//Recebe o ID da foto e do usuário para remover a foto correspondente
router.delete("/deletar/:idFoto/:fk_usuario", function (req, res) {
    fotoController.deletar(req, res);
});

//Permite com que o router seja utilizado por outros arquivos
module.exports = router;



