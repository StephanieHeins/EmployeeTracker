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
          startPrompt()
      })

  })
}

/*
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of this role?"
        },
        {
            type: "number",
            name: "salary",
            message: "What is the salary for this role?"
        },
        {
            type: "input",
            name: "department",
            message: "Please enter the department ID associated with this role:"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO role SET ? ",
            {
              name: res.title,
              salary: res.salary,
              department_id: res.department
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
*/

/*
function addRole() { 

    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        inquirer.prompt([
                {
                name: 'roleDepartment',
                type: 'list',
                message: 'Which department does this role belong to?',
                choices() {
                    const departmentArray = [];
                    res.forEach(({ department_name }) => {
                        departmentArray.push(department_name);
                    });
                    return departmentArray;
                    },
                },
                {
                    name: 'roleTitle',
                    type: 'input',
                    message: 'What is the name of the role you would like to add?',
                },
                {
                    name: 'roleSalary',
                    type: 'input',
                    message: 'What is the salary of the this role?',
                },
            ])
            .then((answer) => {
                let query2 = connection.query("SELECT id FROM department WHERE department_name = ?", [answer.roleDepartment], (err, res) => {
                    let query = "INSERT INTO role SET ?";
                    connection.query(query,
                        [
                            {
                                title: answer.roleTitle,
                                salary: answer.roleSalary,
                                department_id: res[0].id
                            },
                        ],
                        (err, res) => {
                            if (err) throw err;
                            console.table(res);
                            console.log("New Role Added");
                            startApp();
                        }
                    )
                });
            })
    })
};
*/

// ADD EMPLOYEE function 
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Please enter employee first name:"
        },
        {
          name: "lastname",
          type: "input",
          message: "Please enter employee last name:"
        },
        {
          name: "role",
          type: "list",
          message: "What is th",
          choices: selectRole()
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: val.firstName,
            last_name: val.lastName,
            role_id: roleId
            
        }, function(err){
            if (err) throw err
            console.table(val)
            startApp()
        })
  
    })
  }

// UPDATE EMPLOYEE ROLE function 