const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "process.env.PASS",
    database: "employee_DB",
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected");
    init();
  });



function init() {
    inquirer
      .prompt({
        name: "choice",
        type: "list",
        message: "Please select an action:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee roles",
        ],
      })
    
  
    .then(({ choice }) => {
        switch (choice) {
          case "View all departments":
            viewDep();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmp();
            break;
          case "Add a department":
            addDep();
            break;
          case "Add a role":
            addRole();
            break;
          case "Add an employee":
            addEmp();
            break;
          case "Update employee roles":
            update();
            break;
          default:
            connection.end();
        }
      });
  }
  
  function viewDep() {
    connection.query("SELECT * FROM department", (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    });
  }
  
  function viewRoles() {
    connection.query("SELECT * FROM role", (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    });
  }
  function viewEmp() {
    connection.query("SELECT * FROM employee", (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    });
  }
  
  function addDept() {
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "What would you like to name this department?",
        },
      ])
      .then((answer) => {
        const query = "INSERT INTO department SET ? ";
        connection.query(
          query,
          {
            name: answer.department,
          },
          (err) => {
            if (err) throw err;
            console.log(`${answer.department} added`);
            init();
          }
        );
      });
  }
  
  function addRole() {
    const sql = "SELECT * FROM department";
    connection.query(sql, (err, res) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What is the title for the new role?",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                console.log("ENTER ROLE");
              }
            },
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary for the new role?",
            validate: (value) => {
              if (isNaN(value) === false) {
                return true;
              } else {
                console.log("ENTER SALARY");
              }
            },
          },
          {
            name: "department",
            type: "list",
            choices: () => {
              let roles = [];
              for (let i = 0; i < res.length; i++) {
                roles.push(res[i].name);
              }
              return roles;
            },
            message: "What department is this role in?",
          },
        ])
        .then((answer) => {
          let choice;
          for (let i = 0; i < res.length; i++) {
            if (res[i].name === answer.department) {
              choice = res[i];
            }
          }
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id: choice.id,
            },
            (err) => {
              if (err) throw err;
              console.log(`${answer.title} added`);
              init();
            }
          );
        });
    });
  }
  
  function addEmp() {
    const sql = "SELECT * FROM employee, role";
    connection.query(sql, (err, res) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "Enter a first name:",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                console.log("ENTER FIRST NAME");
              }
            },
          },
          {
            name: "lastName",
            type: "input",
            message: "Enter a last name:",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                console.log("ENTER LAST NAME");
              }
            },
          },
          {
            name: "role",
            type: "list",
            choices: () => {
              let roles = [];
              for (let i = 0; i < res.length; i++) {
                roles.push(res[i].title);
              }
              let choiceArr = [...new Set(roles)];
              return choiceArr;
            },
            message: "What is their role?",
          },
        ])
        .then((answer) => {
          let roleChoice;
  
          for (let i = 0; i < res.length; i++) {
            if (res[i].title === answer.role) {
              roleChoice = res[i];
            }
          }
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: roleChoice.id,
            },
            (err) => {
              if (err) throw err;
              console.log(
                `${answer.firstName} ${answer.lastName} has been added as a ${answer.role}`);
              init();
            }
          );
        });
    });
  }
  
  
  function update() {
    connection.query("SELECT * FROM employee, role", (err, res) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            choices: () => {
              let roles = [];
              for (let i = 0; i < res.length; i++) {
                roles.push(res[i].title);
              }
              let choiceArr = [...new Set(roles)];
              return choiceArr;
            },
            message: "Which employee are you updating?",
          },
          {
            name: "role",
            type: "list",
            choices: () => {
              let roles = [];
              for (let i = 0; i < res.length; i++) {
                roles.push(res[i].title);
              }
              let choiceArr = [...new Set(roles)];
              return choiceArr;
            },
            message: "What is the employee's new role?",
          },
        ])
        .then((answer) => {
          let updEmp;
          let updRole;
  
          for (let i = 0; i < res.length; i++) {
            if (res[i].last_name === answer.employee) {
              updEmp = res[i];
            }
          }
          for (let i = 0; i < res.length; i++) {
            if (res[i].title === answer.role) {
              updRole = res[i];
            }
          }
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: updRole,
              },
              {
                last_name: updEmp,
              },
            ],
            (err) => {
              if (err) throw err;
              console.log("ROLE UPDATED");
              init();
            }
          );
        });
    });
  }