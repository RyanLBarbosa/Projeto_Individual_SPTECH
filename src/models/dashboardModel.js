var database = require("../database/config");

//KPI's
function buscarTotalFotos(idUsuario){
    var instrucaoSql = `
    SELECT COUNT(idFoto) AS totalFotos
    FROM foto 
    WHERE fk_usuario = ${idUsuario}`;

    return database.executar(instrucaoSql);
};

// KPI 1 - Complemento: Fotos Adicionadas no Mês Atual
function buscarFotosMesAtual(idUsuario) {
    var instrucaoSql = `
        SELECT COUNT(idFoto) AS fotosMesAtual 
        FROM foto 
        WHERE fk_usuario = ${idUsuario} 
          AND MONTH(dtCaptura) = MONTH(CURRENT_DATE()) 
          AND YEAR(dtCaptura) = YEAR(CURRENT_DATE());
    `;
    return database.executar(instrucaoSql);
}


function buscarStreak(idUsuario){
    var instrucaoSql = `
    SELECT 
    COUNT(DISTINCT YEARWEEK(dtCaptura, 1)) as Streak
    FROM foto
    WHERE fk_usuario = ${idUsuario};`;

    return database.executar(instrucaoSql);
};

function buscarMediaMensal(idUsuario){
    var instrucaoSql = `
    SELECT 
    COUNT(idFoto) / NULLIF(COUNT(DISTINCT DATE_FORMAT(dtCaptura, '%Y/%m')), 0) as MediaMensal
    FROM foto
    WHERE fk_usuario = ${idUsuario};`;

    return database.executar(instrucaoSql);
};


//Gráficos
function buscarCategorias(idUsuario){
    var instrucaoSql = `
    SELECT 
    c.nome as categoria,
    COUNT (f.idFoto) as quantidade
    FROM foto f
    JOIN categoria c ON c.idCategoria = f.fk_categoria
    WHERE f.fk_usuario = ${idUsuario}
    GROUP BY c.nome
    ORDER BY quantidade DESC;`;

    return database.executar(instrucaoSql);
};

function buscarFotosPorMes(idUsuario){
    var instrucaoSql = `
    SELECT 
    MONTH(dtCaptura) as mes,
    COUNT (idFoto) as quantidade
    FROM foto 
    WHERE fk_usuario = ${idUsuario} AND YEAR(dtCaptura) = YEAR(CURRENT_DATE)
    GROUP BY MONTH(dtCaptura)
    ORDER BY mes ASC;`;

    return database.executar(instrucaoSql);
};

module.exports = {
    buscarTotalFotos,
    buscarMediaMensal,
    buscarStreak,
    buscarCategorias,
    buscarFotosPorMes,
    buscarFotosMesAtual
};
