USE staff_db;

INSERT INTO department (name) 
VALUES  ('Marketing'),
        ('Customer Service'), 
        ('Accounting'), 
        ('Sales'), 
        ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Manager', 2000, 1),
        ('Customer Service operator', 1500, 2),
        ('Accounter', 3000, 3),
        ('Sales Lead', 2500, 4),
        ('Finace administration',4000, 5);



INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES ('Zehra', 'Dastan', 1, NULL),
       ('Mila', 'Ugras', 2, 1),
       ('Alp', 'Kohan', 3, 2),
       ('Arshan','Brown', 4, NULL),
       ('Emily', 'Lourd',5, 3);
     