// Adding in the const that was required in the challenge documentation

const cTable = require('console.table');
const inquirer = require('inquirer');
const chalk = require('chalk');
const mysql = require('mysql2');
const db = require('./db/connection'); // making sure the route that you need goes through db/connection to get the literature that is needed to make the link work
const Connection = require('mysql2/typings/mysql/lib/Connection');


// making the port the local 3001 to make sure that it works
const PORT = process.env.PORT || 3001;
const app = express();


// Need to have a title sequence, or something to make the title pop

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function startQuestions () { 
    inquirer.prompt( // ask questions for the first prompt that is out there
        {
            type: 'list', 
            name: 'firstQuestion', // this is the first question that they are going to ask
            message: 'What would you like to do?', // Prompt that will pop up
            choices: [ // the different choices that you can choose from that you can choose from a space bar
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit Application'
            ]
        })

        .then(answer => {
            switch(answer.firstQuestion) {
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

                default:
                    quit(); // Quit the application 
            }
        });
    }
    

// View all Departments 

function viewAllDepartments() {
    let query = 'SELECT * FROM department'; // that will allow to show the different departments opr all departments
    connection.query(query, function(err, res) {
        if (err) throw err; // errors 
        console.table(res); // the result will be shown in tables
        startQuestions();
    });
}

// View all Roles
function viewAllRoles() { // get the roles from the table
    let query = 'SELECT * FROM role'; // it will show the different roles that are in the table
    connection.query(query, function(err, res) {
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
function addDepartment() {
    inquirer.prompt({ // this is having a different prompt from the viewing becasue have the oppertunity to input a new department in this particular case
        type: 'input', // this response allows you to 
    })
}

// listening on the port of a certain localhost

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });