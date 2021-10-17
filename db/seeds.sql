-- this is where you have to add in the values and things like that, where the information actually is 
-- This uses the employees_db database

INSERT INTO departments (name)
-- making up the different jobs and roles
VALUES
    ('Engineering'),
    ('Finance'),
    ('Human Resources'),
    ('Legal'),
    ('Sales');

INSERT INTO roles 
    (title, salary, department_id) -- these are the values that are going to be shown in the table
VALUES
    ('Lead Engineer', 120000, 1),
    ('Engineer', 75000, 1), 

    ('Accountant', 84000, 2), 
    ('Financial Analyst', 67000, 2),

    ('HR Director', 120000, 3),
    ('HR Assistant', 40000, 3),

    ('Lawyer', 160000, 4),
    ('Paraleagl', 45000, 4),

    ('Sales Lead', 90000, 5),
    ('Salesperson', 30000, 5);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Brancato', 1, null),
    ('Richard', 'Whitehead', 2, 1),
    ('Andi', 'Bracia', 3, 1),
    ('Kurtus', 'Rose', 4, 2),
    ('Brenna', 'Calderara', 5, 1),
    ('Erin', 'Flanagan', 6, 1),
    ('Brian', 'ODonnell', 7, 1),
    ('Cindy', 'Mascolo', 8, 1),
    ('Chris', 'Choinere', 9, 1),
    ('Jen', 'Eagleson', 10, 1);