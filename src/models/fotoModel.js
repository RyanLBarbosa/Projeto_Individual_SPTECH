/*
Models é o unico lugar da aplicação onde são executado os comandos SQL (das fotos inseridas pelos usuários)
Aqui são montadas as queries de INSERT, SELECT e DELETE que são aplicadas ao banco
*/


//Importa as configurações do banco de dados, incluindo a conexão
var database = require("../database/config");

//Função de cadastro de imagem, inserindo no banco de dados seus metadados
function cadastrar(nomeArquivo, categoria, descricao, fk_usuario) {
    var instrucaoSql = `
        INSERT INTO foto (imagem, categoria, descricao, fk_usuario) 
        VALUES ('${nomeArquivo}', '${categoria}', '${descricao}', ${fk_usuario});`;
    return database.executar(instrucaoSql);
}

//Função que busca todas as fotos cadastradas pelo usuário que está logado na seção
function listarPorUsuario(fk_usuario) {
    var instrucaoSql = `
        SELECT 
            idFoto, 
            imagem, 
            categoria, 
            descricao, 
            DATE_FORMAT(dtCaptura, '%d/%m/%Y %H:%i') AS dtCaptura 
        FROM foto 
        WHERE fk_usuario = ${fk_usuario}
        ORDER BY idFoto DESC;`;
    return database.executar(instrucaoSql);
}

/*Função de deletar, apaga a foto selecionada pelo usuário, conferindo pelo id do usuário e pelo id da foto, 
para evitar erros*/
function deletar(idFoto, fk_usuario) {
    var instrucaoSql = `
        DELETE FROM foto WHERE idFoto = ${idFoto} AND fk_usuario = ${fk_usuario};`;
    return database.executar(instrucaoSql);
}

//Mecanismo para deixar as funções públicas para outros arquivos do projeto utilizarem, como o "fotoController.js"
module.exports = {
    cadastrar,
    listarPorUsuario,
    deletar
};

/*OBS:
Ao final das funções, temos a linha "return database.executar(instrucaoSql);", ela é responsável por:
-Enviar a instrução ao MySQL, para que o banco execute;
-Retorna uma promessa ao controller, prometendo que os dados vão chegar.
*/
