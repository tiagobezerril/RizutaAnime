CREATE DATABASE rizuta;

USE rizuta;

CREATE TABLE cadastro (
idcadastro	INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (50),
email VARCHAR (50) UNIQUE,
senha varchar(50),
fklista_anime INT,
FOREIGN KEY (fklista_anime) REFERENCES lista_anime (idlista_anime),
fklista_manga INT,
FOREIGN KEY (fklista_manga) REFERENCES lista_manga (idlista_manga)
)AUTO_INCREMENT = 100;  

CREATE TABLE lista_anime (
idlista_anime INT PRIMARY KEY AUTO_INCREMENT,
ep_atual INT,
tem_atual INT,
sts_anime VARCHAR(10) 
CONSTRAINT chKSts_anime CHECK( sts_anime IN('Completo','Assistindo','Abandonado')),
fkanime INT,
FOREIGN KEY (fkanime) REFERENCES anime (idanime)
)AUTO_INCREMENT = 100;

CREATE TABLE anime (
idanime INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
qtd_episodio INT,
qtd_temporada INT,
sinopse varchar(200)
)AUTO_INCREMENT = 100;

CREATE TABLE lista_manga(
idlista_manga INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
vol_atual INT,
cap_atual INT,
sts_manga VARCHAR(10) 
CONSTRAINT chKSts_manga CHECK( sts_manga IN('Completo','Assistindo','Abandonado')),
fkmanga INT,
FOREIGN KEY (fkmanga) REFERENCES manga (idmanga)
);

CREATE TABLE manga (
idmanga INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
qtd_volumes  INT,
qtd_capitulos INT,
sinopse varchar(200)
)AUTO_INCREMENT = 100;

select * from cadastro;


