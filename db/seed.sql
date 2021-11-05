USE employeetrackerDB;

-- Department 
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("HR");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("IT");

-- Role
INSERT INTO role (title, salary, department_id)
VALUE ("Support Agent", 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Support Agent", 65000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Human Resources", 65000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Social Network Specialist", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Strategist", 75000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("IT Support", 70000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Security Analyst", 90000, 4);

-- Employee 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Smith", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("James", "Johnson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Rebecca", "Austins", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Helen", "Franks", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jim", "Rock", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Darlene", "Ma", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jerry", "Lonestar", 6, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Barb", "Zull", 7, 4);