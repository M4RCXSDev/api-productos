CREATE DATABASE tiendaperu;
USE tiendaperu;

-- NOTAS
CREATE TABLE IF NOT EXISTS productos
(
	id 			INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    marca		VARCHAR(100) 	NOT NULL,
    descripcion VARCHAR(200) 	NOT NULL,
    precio 		DECIMAL(10,2)	NOT NULL,
    stock 		INT UNSIGNED 	NOT NULL DEFAULT 0,
    create_at	DATETIME 		NOT NULL DEFAULT NOW(),
    update_at	DATETIME 		NULL
)ENGINE = INNODB;

INSERT INTO productos 
	(marca, descripcion, precio, stock)
    VALUES
    ('Samsung', 'TV 55', 2500, 10),
    ('LG', 'Lavadora', 1200, 3),
    ('Sony', 'Playstation 5', 3200, 2);

SELECT * FROM productos;

CREATE TABLE clientes
(
	id				INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    apellidos		VARCHAR(100) 	NOT NULL,
    nombres			VARCHAR(100) 	NOT NULL,
    telefono		VARCHAR(9)		NOT NULL,
    direccion 		VARCHAR(100) 	NOT NULL,
    email 			VARCHAR(100) 	NOT NULL,
    create_at		DATETIME 		NOT NULL DEFAULT NOW(),
    updated_at		DATETIME 		NULL
)ENGINE = INNODB;

INSERT INTO clientes 

	(apellidos, nombres, telefono, direccion,email)
    VALUES
    ('Felix ', 'Joaho',911222333 , 'Frente al pasaje Manche', 'joaho@gmail.com'),
    ('Yarleque Peña', 'Marcos Isaias', 922333444, 'Urb. "Los parque de Chincha Baja", Pedregal', 'marcos@gmail.com'),
    ('Tasayco Quispe', 'Paula Angelica', 933444555, 'Av. Unión', 'paula@gmail.com');

SELECT * FROM clientes;


CREATE TABLE proveedores 
(
	id 			INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    razonSocial VARCHAR(100) 	NOT NULL,
    contacto	VARCHAR(9)		NOT NULL,
    ruc			VARCHAR(11) 	NOT NULL UNIQUE,
    direccion   VARCHAR(100) 	NOT NULL,
    create_at	DATETIME 		NOT NULL DEFAULT NOW(),
    updated_at	DATETIME 		NULL
    
)ENGINE = INNODB;

INSERT INTO proveedores 

	(razonSocial, contacto, ruc, direccion)
	VALUES
	('Distribuidora San Juan SAC', '987654321', '20601234567', 'Chincha Alta'),
	('Comercial Peru EIRL', '956123478', '20602345678', 'Chincha Baja'),
	('Importaciones del Sur SAC', '912345678', '20603456789', 'Ica');

