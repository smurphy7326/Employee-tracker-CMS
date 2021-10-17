  
// Adding in the const that was required in the challenge documentation
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');



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
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err; // errors 
        console.table(res); // the result will be shown in tables
        startQuestions();
    });
}

// View all Roles
function viewAllRoles() { // get the roles from the table
    connection.query('SELECT * FROM roles;', function (err, res, fields) {
        if (err) throw err; // this will just throw an err
        console.table(res);
        startQuestions();
    })
 }

// View All Employees
function viewAllEmployees() { // W3 schools article was helpful, to get the specific things that i needed. Also AskBCS helped a lot with the LEFT JOIN part
    let query = `SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, concat(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    LEFT JOIN roles ON e.role_id = roles.id 
    LEFT JOIN departments on roles.department_id = departments.id 
    LEFT JOIN employees m ON m.id = e.manager_id`
     // this prompt is going to ask for all the different things specifically rather than just the employee table
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
            message: 'What is the name of the new Department?', // coming up from the name of the department 
        }   
]).then(function(res) {
        var query = connection.query( 
            'INSERT INTO departments SET ? ', // this inserts into the department table
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
            name: 'newRoleTitle', //the new role title
            message: 'Enter the new roles title:',
        },
        {
            type: 'input',
            name: 'newRoleSalary', //the new salary was entered
            message: 'Please enter the salary for the new role! (Cannot be longer than 10 numbers, even though that would be great)' 
            // There can be a way to validate it using isNAN
        },
        {
            type: 'input', // So they can type in a response and not have to choose from a list
            name: 'newRoleDepartment', // the new variable that the question will go under
            message: 'What is the department ID of the new employee? (Please make sure the Department is real):', // We could in the future make a list as well for this 
        },
      ])
      // the answers to the questions above then goes down to a prompt
      .then(function(answer) { // I think department ID is correct but check that out just in case
        connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDepartment], function (err, res) {
          if (err) throw err;
          console.table("A new role was added for the growing company!");
          startQuestions();
      });
    })
};

// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
function addEmployee() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err; // if there is an error it will pop up
        let roleList = []; 
    
        res.forEach(role => {
            roleList.push({ name: role.title, value: role.id }); // Gives you a list of the roles that you can choose from 

    }); 
    inquirer.prompt([
        {
            type: 'input',
            name: 'newEmployeeFirstName', // enter a new first name 
            message: 'What is the first name of the new employee?'
        },
        {
            type: 'input',
            name:'newEmployeeLastName', // enter a new lat name 
            message: 'What is the last name of the new employee?'
        },
        {
            type: 'list',
            name: 'newEmployeeRole', // Gives you a list of the roles that you can choose from
            message: 'What is the new employees role in the company?',
            choices: roleList
        },
        {
            type: 'input',
            name: 'newEmployeeManager', // Asks the who the manager of the employee will be and trying to keep it limited to the employees that were already there at the beginning of the list
            message: 'What is the ID of the Manager who they will work under? (Please enter an ID 1-10)',
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.newEmployeeFirstName, answer.newEmployeeLastName, answer.newEmployeeRole, answer.newEmployeeManager], function (err, res) { // this will show the name of the people in the list first last and the role which will get the salary of the role etc. 
            if (err) throw err;
            console.table("New Employee is added to the business!"); // message that will appear after it is completed
            startQuestions(); // prompt to ge back to the beginning
        });
    });
});
}

// Update an Employee Role
// WHEN I am prompted to select an employee to update and their new role and this information is updated in the database 

function updateEmployeeRole() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        let roleList = [];
        // let employeeList = [];
        

        // res.forEach(employee => {
        //     employeeList.push ({ name: employee.title, value: employee.id });
        // });
        // work on the list for employees some other time

        res.forEach(role => {
            roleList.push({ name: role.title, value: role.id });
    });
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateEmployeeId',
            message: 'What is the ID of the employee you are trying to change?', // Easier to ask for the ID of the employee since if it was the first name and there are multiple it would change. for later uses another list could be added to choose from that set list of people
            // choices: employeeList
        },
        {
            type: 'list',
            name: 'updateNewEmployeeRole', // you can choose the new role from the list and it will be changed in the table
            message: 'What is the new role of the employee?',
            choices: roleList
        }
    ])
    .then(function(answer) {
        console.log(answer)
        connection.query("UPDATE employees SET role_id=? WHERE id =?", [answer.updateNewEmployeeRole, answer.updateEmployeeId], function (err, res) { // it takes your answers and changes them in the tables, just hit view employees and that will change
        if (err) throw err; // if there is an error it will pop up
            console.log('Updated Employee Role!!') // message when an employee is updated
            startQuestions();
        });
    });
});
}