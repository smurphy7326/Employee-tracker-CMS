// Adding in the const that was required in the challenge documentation

const cTable = require('console.table');
const inquirer = require('inquirer');
const chalk = require('chalk');
const mysql = require('mysql2');
const db = require('./db/connection'); // making sure the route that you need goes through db/connection to get the literature that is needed to make the link work

// making the port the local 3001 to make sure that it works
const PORT = process.env.PORT || 3001;
const app = express();

