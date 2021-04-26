INSERT INTO department (id, department_name) VALUES (1, "Engineering");
INSERT INTO department (id, department_name) VALUES (2, "Accounting");
INSERT INTO department (id, department_name) VALUES (3, "Marketing");


INSERT INTO role (id, title, salary, department_id) VALUES (1, "Engineer", 125000.00, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (2, "Engineer", 95000.00, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (3, "Junior Engineer", 70000.00, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (4, "Accountant", 950000.00, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (5, "Fundraising", 48000.00, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (6, "Online Marketing", 65000.00, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (7, "Marketing Coordinator", 74000.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Tianna", "Radomski", 2, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, "Gia", "Bosco", 3, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, "Jonathan", "Rodney", 5,3;
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, "Keeko", "Kaur", 6, 2);