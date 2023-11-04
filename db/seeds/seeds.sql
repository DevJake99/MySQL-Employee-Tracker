INSERT INTO departments(department)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO roles(job_title, salary, department_id)
VALUES("Engineer", 85000, 1), ("Senior Engineer", 125000, 1), ("CFO", 350000, 3), ("Chief Counsel", 300000, 4);

INSERT INTO employees(first_name, last_name, manager_first_name, role_id, department_id)
VALUES 
('Johnnie', 'Random', 'Jacob', 1, 1), 
('James', 'Smith', 'Jacob' 1, 1), 
('Ronnie', 'Manning', 'Jacob' 2, 1), 
('Jimmy', 'Jones', 'Jacob' 2, 1), 
('Larry', 'Legal', 'Jacob' 4, 4)
('Chad', 'Bro', 'Lary', 3,3);

