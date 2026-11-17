CREATE DATABASE lenz;

USE lenz;

--Tabela de usuários, dados registrados do cadastro
CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50) UNIQUE,
	cpf CHAR(11) UNIQUE,
	telefone VARCHAR(20),
	senha VARCHAR(50)
);

--Tabela de fotos vinculada ao usuário
CREATE TABLE foto (
    idFoto INT PRIMARY KEY AUTO_INCREMENT,
    imagem VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descricao TEXT,
    dtCaptura DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

select * from foto;
