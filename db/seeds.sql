-- this is where you have to add in the values and things like that, where the information actually is 
-- This uses the employees_db database

INSERT INTO department
-- making up the different jobs and roles
VALUES
    ('Engineering'),
    ('Finance'),
    ('Human Resources'),
    ('Legal'),
    ('Sales');

INSERT INTO role
    (title, salary departmen_id) -- these are the values that are going to be shown in the table
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

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Brancato', 1, 1),
    ('Richard', 'Whitehead', 2, 0),
    ('Andi', 'Bracia', 3, 0),
    ('Kurtus', 'Rose', 5, 0),
    ('Brenna', 'Calderara', 6, 1),
    ('Erin', 'Flanagan', 8, 2),
    ('Brian', 'ODonnell', 9, 1),
    ('Cindy', 'Mascolo', 10, 0),
    ('Chris', 'Choinere', 11, 0),
    ('Jen', 'Eagleson', 12, 0);
