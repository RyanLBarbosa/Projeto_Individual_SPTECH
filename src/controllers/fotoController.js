//Importa o Model das fotos
var fotoModel = require("../models/fotoModel");

//req.body trás os campos de texto enviados pelo FormData no HTML da galeria
function cadastrar(req, res) {
    const arquivo = req.file; //Extrai o arquivo processado pelo Multer
    const categoria = req.body.categoria;
    const descricao = req.body.descricao;
    const fk_usuario = req.body.fk_usuario;

//Validação de segurança: Impede o envio se faltar algum campo obrigatório
    if (!arquivo) {
        res.status(400).send("O arquivo de foto é obrigatório!");
    } else if (!categoria) {
        res.status(400).send("A categoria é obrigatória!");
    } else if (!fk_usuario) {
        res.status(400).send("O ID do usuário é obrigatório!");
    } else {
        const nomeArquivo = arquivo.filename; //Pega o nome gerado pelo crypto no configUpload

//Caso esteja tudo certo, envia para o model para ele cadastrar no banco de dados
        fotoModel.cadastrar(nomeArquivo, categoria, descricao, fk_usuario)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

//
function listarPorUsuario(req, res) {
    var fk_usuario = req.params.fk_usuario; //Pega o parametro da requisição. Ex: usuário com ID 3

    fotoModel.listarPorUsuario(fk_usuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado); //Devolve o array de fotos registradas
            } else {
                res.status(204).send("Nenhuma foto encontrada!");  //Quando não acha nenhum conteúdo na array
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function deletar(req, res) {
    var idFoto = req.params.idFoto; //Captura o ID da foto que vai ser apagada
    var fk_usuario = req.params.fk_usuario; //Captura o ID do usúario que é o dono da foto

    //Utiliza a função de remoção do model
    fotoModel.deletar(idFoto, fk_usuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    listarPorUsuario,
    deletar
};

