DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL,
  employee_name VARCHAR(30) NOT NULL,
 
);

CREATE TABLE role (
  title VARCHAR(30) NOT NULL,,
  salary DECIMAL,
  department_id INT 
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT ,
  manager_id INT,
  
);