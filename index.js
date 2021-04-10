const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

//connection with sql database

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
          "Exit".red,
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
  