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
    ]).then(function(val) {
        switch (val.choice) {
          case "View All Departments":
              allDepartments();
            break;
          case "View All Roles":
              allRoles();
            break;
          case "View All Employees":
              allEmployees();
            break;
          case "Add a Department":
              addDepartment();
            break;
          case "Add an Employee":
              addEmployee();
            break;
          case "Add Role?":
              addRole();
            break;
          case "Update Employee Role":
              updateEmployee();
            break;
          case "Exit":
              process.exit();
            }
    })
}

// VIEW ALL DEPARTMENTS function


// VIEW ALL ROLES function 


// VIEW ALL EMPLOYEES function 


// ADD DEPARTMENT function 


// ALL ROLE function 


// ADD EMPLOYEE function 


// UPDATE EMPLOYEE ROLE function 