// Dependencies 
const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require('console.table');

// MySQL Connection Info 
// Change credentials per user 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // ** ENTER PASSWORD HERE ** 
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
          case "Add a Role":
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

// Department Array Function - For addRole
var departmentArr = [];
function selectDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      departmentArr.push(res[i].name);
    }

  })
  return departmentArr;
}

// Role Array Function - for addEmployee & updateEmployee
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}

// VIEW ALL DEPARTMENTS function
function allDepartments() {
    connection.query("SELECT department.name, department.id FROM department;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startApp()
    })
  }

// VIEW ALL ROLES function 
function allRoles() {
    connection.query("SELECT role.title, role.id, role.department_id, role.salary FROM role;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        startApp()
      })
}

// VIEW ALL EMPLOYEES function 
function allEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, department.name, role.salary FROM role JOIN employee ON employee.role_id = role.id JOIN department ON department.id = role.department_id;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        startApp()
      })
}

// ADD DEPARTMENT function 
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department being added?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                console.log("New Department Added");
                startApp();
            }
        )
    })
}

// ADD ROLE function 
function addRole() { 
    inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of this role?"
        },
        {
          name: "salary",
          type: "number",
          message: "What is the salary for this role?"
        },
        {
          name: "department",
          type: "list",
          message: "Which department is this role under?",
          choices: selectDepartment()
        }
    ]).then(function (val) {
      var departmentId = selectDepartment().indexOf(val.department) + 1
      connection.query("INSERT INTO role SET ?", 
      {
          title: val.title,
          salary: val.salary,
          department_id: departmentId,
          
      }, function(err){
          if (err) throw err
          console.table(val)
          console.log("New Role Added");
          startApp()
      })

  })
}

// ADD EMPLOYEE function 
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "Please enter employee first name:"
        },
        {
          name: "lastName",
          type: "input",
          message: "Please enter employee last name:"
        },
        {
          name: "role",
          type: "list",
          message: "Select a role for this employee:",
          choices: selectRole()
        },
        {
        name: "manager",
        type: "number",
        message: "Please enter the manager ID for their associated manager:",
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: val.firstName,
            last_name: val.lastName,
            role_id: roleId,
            manager_id: val.manager
            
        }, function(err){
            if (err) throw err
            console.table(val)
            startApp()
        })
  
    })
  }

// UPDATE EMPLOYEE ROLE function 
function updateEmployee() {
  connection.query("SELECT * FROM employee", (err, res) => {
  if (err) throw err;
  inquirer.prompt([
        {
          name: "lastName",
          type: "list",
          message: "Select the employees last name:",
          choices: function() {
            var lastNameArr = [];
            for (var i = 0; i < res.length; i++) {
              lastNameArr.push(res[i].last_name);
            }
            return lastNameArr;
            }
          },
          {
          name: "newRole",
          type: "rawlist",
          message: "What is the employees new title? ",
          choices: selectRole()
          }
        ])
        .then((answer) => {
            let query1 = "SELECT id FROM employee WHERE last_name = ?";
            connection.query(query1, [answer.lastName], (err, res) => {
                let query = "UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE id = ?";
                connection.query(query, [answer.newRole, res[0].id], (err, res) => {
                    if (err) throw err;
                    console.log("Employee role has been changed!");
                    startApp();
                })
            })

        })
  })

};
