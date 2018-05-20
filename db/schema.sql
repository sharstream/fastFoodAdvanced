### Schema DB SETUP
CREATE DATABASE food_db;
USE food_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NULL,
    devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);