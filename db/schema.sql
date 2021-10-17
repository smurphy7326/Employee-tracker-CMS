DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, -- Makes sure the id is real and exists
    name VARCHAR(30) NOT NULL -- there has to be a name and be only 30 character
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,-- Makes sure it is real
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER, -- makes sure the role is real and exists
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NUll
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,  -- makes sure it is real
    title VARCHAR(30) NOT NULL, -- 30 characters max
    salary DECIMAL (10,2) NOT NULL, -- the salary will show that there can be up to 10 numbers with 2 coming after the decimal point
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);
