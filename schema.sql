DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;


CREATE TABLE department (
  id INT AUTO_INCREMENT,
  department_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * from role;
SELECT * from employee; 