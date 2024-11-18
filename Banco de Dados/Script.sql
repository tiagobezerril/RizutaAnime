CREATE DATABASE Rizuta;
USE Rizuta;

CREATE TABLE cadastro (
idcadastro INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(45),
dt_nasc date,
fklista_animme INT,
fklista_manga INT,
FOREIGN KEY (fklista_anime)
	REFERENCES lista_total (idlista_anime)
);

CREATE TABLE login (
idlogin INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
senha VARCHAR(45)
);
