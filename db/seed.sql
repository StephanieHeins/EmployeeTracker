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