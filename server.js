// Adding in the const that was required in the challenge documentation
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const chalk = require('chalk');



//Connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    // the MYSQL username or or just the roo user since there was no username set up
    user: 'root',
    // the MySQL password
    password: 'Pass@7326',
    // connecting to the local database
    database: 'employees_db'
});

connection.connect(function(err) {
    if (err) throw err; // when there was an error it shows
    console.log('Connected as Id' + connection.threadId); // It should show what ID you are connected to
    startQuestions(); // brings to the main prompt with all the questions
});

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function startQuestions () { 
    inquirer.prompt( // ask questions for the first prompt that is out there
        {
            type: 'list', 
            name: 'firstQuestion', // this is the first question that they are going to ask
            message: 'What would you like to do with the team?', // Prompt that will pop up
            choices: [ // the different choices that you can choose from that you can choose with enter bar
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update Employee Role',
                'Exit Application'
            ]
        })

        .then(result => {
            switch(result.firstQuestion) {
                case "View All Departments":
                    viewAllDepartments(); // this will show that the answers that you have chosen is view all departments
                    break; // this will prompt to go back
                
                case "View All Roles":
                    viewAllRoles();
                    break; // show what they asked for 

                case "View All Employees":
                    viewAllEmployees();
                    break; // show what they asked for 

                case "Add a Department":
                    addDepartment();
                    break; // show what they asked for 

                case "Add a Role":
                    addRole();
                    break; // show what they asked for 

                case "Add an Employee":
                    addEmployee();
                    break; // show what they asked for 

                case "Update Employee Role":
                    updateEmployeeRole();
                    break; // show what they asked for 

                case 'Exit Application':
                    connection.end(); // Quit the application 
                    break;
            }
        });
    }
    

// View all Departments 

function viewAllDepartments() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err; // errors 
        console.table(res); // the result will be shown in tables
        startQuestions();
    });
}

// View all Roles
function viewAllRoles() { // get the roles from the table
    connection.query('SELECT * FROM role;', function (err, res, fields) {
        if (err) throw err; // this will just throw an err
        console.table(res);
        startQuestions();
    })
 }

// View All Employees
function viewAllEmployees() { // trying to view all the employees
    let query = 'SELECT * FROM employee'; // this prompt should show the all the employees and you can choose from them
    connection.query(query, function(err, res) {
        if (err) throw err; // throws an error if there is an incorrect prompt
        console.table(res); // results are shown in a table form
        startQuestions(); // goes back to the prompt from the first question
    })
}

// Function to add a department for the prompt
// adds the depart to the SELECT * FROM department table
function addDepartment() {
    inquirer.prompt([ // this is having a different prompt from the viewing because have the ability to input a new department in this particular case
        {
            type: 'input', // this response allows you to 
            name: 'newDepartmentName', // new name of the department
            message: 'What is the name of the new Department?', // coming up from the name of the dpartment 
        }   
]).then(function(res) {
        var query = connection.query( 
            'INSERT INTO department SET ? ', // this inserts into the department table
            { name: res.newDepartmentName}, // this takes the response that you typed in and make that the answer
            function(err){if (err) throw err; // if there is an error it will not allow you to put it in 
            console.table(res);
            startQuestions(); // goes back to the prompt at the beginning
            })
    })
}

// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

function addRole() {
    inquirer .prompt ([
        {
            type: 'input',
            name: 'newRoleTitle',
            message: 'Enter the new roles title:',
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: 'Please enter the salary for the new role' 
            // There can be a way to validate it using isNAN
        },
        {
            type: 'input', // So they can type in a response and not have to choose from a list
            name: 'newRoleDepartment', // the new variable that the question will go under
            message: 'What is the department ID of the new employee?',
        },
      ])
      // the answers to the questions above then goes down to a prompt
      .then(function(answer) { // I think department ID is correct but check that out just in case
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDepartment], function (err, res) {
          if (err) throw err;
          console.table(res);
          startQuestions();
      });
    })
};

// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        let roleList = [];
    
        res.forEach(role => {
            roleList.push({ name: role.title, value: role.ID });

    }); 
    inquirer.prompt([
        {
            type: 'input',
            name: 'newEmployeeFirstName',
            message: 'What is the first name of the new employee?'
        },
        {
            type: 'input',
            name:'newEmployeeLastName',
            message: 'What is the last name of the new employee?'
        },
        {
            type: 'list',
            name: 'newEmployeeRole',
            message: 'What is the new employees role in the company?',
            choices: roleList
        },
        {
            type: 'input',
            name: 'newEmployeeManager',
            message: 'Who is the manager of the new employee?',
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.newEmployeeFirstName, answer.newEmployeeLastName, answer.newEmployeeRole, answer.newEmployeeManager], function (err, res) {
            if (err) throw err;
            console.table(res);
            startQuestions();
        });
    });
});
}

// Update an Employee Role
// WHEN I am prompted to select an employee to update and their new role and this information is updated in the database 

function updateEmployeeRole() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        let roleList = [];
    
        res.forEach(role => {
            roleList.push({ name: role.title, value: role.ID });
        });
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateEmployeeFirstName',
            message: 'What is the first name of the employee you are changing?',
        },
        {
            type: 'input',
            name: 'updateEmployeeLastName',
            message: 'What is the last name of the employee you are changing?',
        },
        {
            type: 'list',
            name: 'updateNewEmployeeRole', // this is close to the other prompt but not sure what else it could go to
            message: 'What is the new role of the employee?',
            choices: roleList
        }
    ])
    .then(function(answer) {
        connection.query("UPDATE employees SET (first_name, last_name, role_id) VALUES (?, ?, ?)", [answer.updateEmployeeFirstName, answer.updateEmployeeLastName, answer.updateNewEmployeeRole], function (err, res) {
        if (err) throw err;
            console.table(res)
            startQuestions();
        });
    });
});
}