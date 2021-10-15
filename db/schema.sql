DROP DATABASE IF EXISTS employees_db;
-- This creates the database and is important when you have to put in the mysql prompts
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT NOT NULL,-- Makes sure it is real
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER (10) NOT NULL, -- makes sure the role is real and exists
    manager_id INTEGER (10) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT, -- Makes sure the id is real and exists
    name VARCHAR(30) NOT NULL, -- there has to be a name and be only 30 characters
    PRIMARY KEY (id)
);

CREATE TABLE role (
    ID INTEGER AUTO_INCREMENT,  -- makes sure it is real
    title VARCHAR(30) NOT NULL, -- 30 characters max
    salary DECIMAL (10,2) NOT NULL, -- the salary will show that there can be up to 10 numbers with 2 coming after the decimal point
    department_id INTEGER,
    PRIMARY KEY (id)
);