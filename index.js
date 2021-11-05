// Dependencies 
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');

// MySQL Connection Info 
// Change credentials per user 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeetrackerDB"
  });

// MySQL Initialize 
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startApp();
});

// MENU Prompt 
function startApp() {
    inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
                  "View All Departments", 
                  "View All Roles",
                  "View All Employees", 
                  "Add a Department",
                  "Add a Role",
                  "Add an Employee",
                  "Update Employee Role",
                  "Exit"
                ]
        }
}

// VIEW ALL DEPARTMENTS function


// VIEW ALL ROLES function 


// VIEW ALL EMPLOYEES function 


// ADD DEPARTMENT function 


// ALL ROLE function 


// ADD EMPLOYEE function 


// UPDATE EMPLOYEE ROLE function 