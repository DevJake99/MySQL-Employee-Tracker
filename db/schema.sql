DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    
);

CREATE TABLE employees (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(25) NOT NULL,
last_name VARCHAR(25) NOT NULL,
manager_first_name VARCHAR(25) NOT NULL,
role_id INT NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (department_id) REFERENCES roles(department_id) 
)