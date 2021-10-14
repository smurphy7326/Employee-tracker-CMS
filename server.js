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
const startQuestions = () => { 
    inquirer.prompt( // ask questions for the first prompt that is out there
        {
            type: 'list', 
            name: 'firstQuestion', // this is the first question that they are going to ask
            message: 'What would you like to do?', // Prompt that will pop up
            choices: [ // the different choices that you can choose from that you can choose from a space bar
                'View All Departments',
                'View All Roles',
                'View All Departments',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit Application'
            ]
        })

        .then(answer => {
            switch(answer.firstQuestion) {
                case "View All Deapartmetns":
                    viewAllDepartments();
                    break; //
            }
        })
    }
    

// View all Departments 

function viewAllDepartments () {
    connection.query ('SELECT * FROM departments', function (err, res) {
        console.table(res)
        startQuestions();
    })
}
// listening on the port of a certain localhost

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });