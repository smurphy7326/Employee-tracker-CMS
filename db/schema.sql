-- The start of this would be the drop database
DROP DATABASE IF EXISTS employees_db;
-- This creates the database and is important when you have to put in the mysql prompts
CREATE DATABASE employees_db;

USE employees_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;

CREATE TABLE department;
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Makes sure the id is real and exists
    name VARCHAR(30) NOT NULL -- there has to be a name and be only 30 characters
);

CREATE TABLE employee;
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Makes sure it is real
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL, -- makes sure the role is real and exists
    manager_id INTEGER 
);

CREATE TABLE ROLE;
    ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- makes sure it is real
    title VARCHAR(30) NOT NULL, -- 30 characters max
    salary DECIMAL (10,2) NOT NULL, -- the salary will show that there can be up to 10 numbers with 2 coming after the decimal point
    department_id INTEGER
);