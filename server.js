const express = require('express');
const mysql = require('mysql2');

const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Zehra@birmingham22',
      database: 'staff_db'
    },
    console.log(`Connected to the staff_db database.`)
  );
  

  db.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + db.threadId)
    startPrompt();
});



  function startPrompt () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: "What would you like to do?",
            choices: [
                'View All Departments', 
                'View All Roles', 
                'View All Employees',
                'View Employee by Manager',
                'View Employee by Department', 
                'Add a Department', 
                'Add Role', 
                'Add Employee', 
                'Update an Employee Role',
                'Update Employee Manager',
                'Delete Department',
                'Delete Employee',
                'Delete Role',
                'Quite'
            ] 
        }
    ]).then( answer => {
        switch (answer.menu) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View Employee by Manager':
                viewEmployeeByManager();
                break;
            case 'View Employee by Department':
                viewEmployeeByDepartment();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            case 'Delete Department':
                deleteDepartment();
                break;
            case 'Delete Role':
                deleteRole();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Quite':
                console.log('Thank you for using the employee database!');
                db.end();
                break;
         
        }
    })
  }; 
  
  function viewAllDepartments() {
    const sql = `SELECT department.id, department.name FROM department`;
    db.promise().query(sql).then(([data]) =>{
        let departments = data
    const options = departments.map(({ id, name }) => ({value: id, name: name}))
    console.table(options);
    startPrompt();
    })};
    
    
function viewAllRoles() {
    const sql = `SELECT role.id, role.title, role.department_id, role.salary FROM role`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startPrompt();
    });
};

function viewAllEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startPrompt();
    });
};

function viewEmployeeByManager() {
    const sql = `SELECT employee.manager_id, employee.first_name FROM employee`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startPrompt();
    });
};

function viewEmployeeByDepartment() {
    const sql = `SELECT employee.first_name, employee.role_id FROM employee`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startPrompt();
    });
};




const addDepartment = () => {
    inquirer
      .prompt({
        name: "department_name",
        type: "input",
        message: "What is the name off the department?",
      })
      .then((input) => {
        if (input) {
          console.log(input);
          let sql = `INSERT INTO department (name) VALUES ("${input.department_name}");`;
  
          db.query(sql, (err, row) => {
            if (err) throw err;
            startPrompt();
          });
        }
      });
  };

  
const addRole =() => {
    inquirer.prompt([
                  {
                    name: "title",
                    type: "input",
                    message: "What is the name of the role?"
                  },
                  {
                    name: "salary",
                    type: "input",
                    message: "What is the salary of the role?"
          
                  },
                  {
                    type: 'list',
                    name: 'department_name',
                    message: "Which department does the role belong to?",
                    choices: [
                        ('Marketing'),
                        ('Customer Service'), 
                        ('Accounting'), 
                        ('Sales'), 
                        ('Finance')
                    ] 
                }
              ]) 
              .then((input) => {
                if (input) {
                  console.log(input);
                  let sql = `INSERT INTO department (name) VALUES ("${input.title}, ${input.salary}, ${input.department_name}");`;
                  //let sql = `INSERT INTO role (department_id, title, salary) VALUES ("${id}", "${title}", "${salary}");`;
          
                  db.query(sql, (err, row) => {
                    if (err) throw err;
                    console.log("Role added");
                    startPrompt();
                  });
                }
              });
};


const addEmployee =() => {
    inquirer.prompt([
                  {
                    name: "first_name",
                    type: "input",
                    message: "What is first name for new Employee?"
                  },
                  {
                    name: "last_name",
                    type: "input",
                    message: "What is last name of new employee?"
          
                  },
                  {
                    name: "title",
                    type: "input",
                    message: "What is the name of the role new employee belong to?"
                  },
                  {
                    type: 'list',
                    name: 'department_name',
                    message: "Which department does the new employee belong to?",
                    choices: [
                        ('Marketing'),
                        ('Customer Service'), 
                        ('Accounting'), 
                        ('Sales'), 
                        ('Finance')
                    ] 
                }
              ]) 
              .then((input) => {
                if (input) {
                  console.log(input);
                  let sql = `INSERT INTO employee (name) VALUES ("${input.first_name}, ${input.last_name}, ${input.title}, ${input.name}");`;
                  
                  db.query(sql, (err, row) => {
                    if (err) throw err;
                    console.table("New employee added");
                    startPrompt();
                  });
                }
              });
};

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Which employee's role do you want to update?"
        },
        {
            name: "role_id",
            type: "number",
            message: "Which role do you want to assign the selected employee? Enter ONLY role id numbers."
        }
    ]).then(function (response) {
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.first_name], function (err, data) {
            if (err) throw err;
            console.log('The new role entered has been added successfully to the database.');

            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
});
};

function updateEmployeeManager() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Which employee's manager do you want to update?"
        },
        {
            name: "manager_id",
            type: "number",
            message: "Which manager do you want to update for selected employee? Enter ONLY role id numbers."
        }
    ]).then(function (response) {
        db.query("UPDATE employee SET manager_id = ? WHERE first_name = ?", [response.manager_id, response.first_name], function (err, data) {
            if (err) throw err;
            console.log('The new role entered has been added successfully to the database.');

            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
});
};

const deleteDepartment = () => {
    inquirer
      .prompt({
        name: "department_name",
        type: "input",
        message: "What is the name off the department you like to delete?",
      })
      .then((input) => {
        if (input) {
          console.log(input);
          let sql = `DELETE FROM department WHERE name = "${input.department_name}";`
      
  
          db.query(sql, (err, row) => {
            if (err) throw err;
            console.log("The department entered has been deleted successfully from the database.");
            startPrompt();
          });
        }
      });
  };


  const deleteRole = () => {
    inquirer
      .prompt({
        name: "role_id",
        type: "input",
        message: "which role you like to delete?Pls enetr id number.",
      })
      .then((input) => {
        if (input) {
          console.log(input);
          let sql = `DELETE FROM role WHERE id = "${input.role_id}";`
      
  
          db.query(sql, (err, row) => {
            if (err) throw err;
            console.log("The role entered has been deleted successfully from the database.");
            startPrompt();
          });
        }
      });
  };

  const deleteEmployee = () => {
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "Pls enter employee id that you like to delete.",
      })
      .then((input) => {
        if (input) {
          console.log(input);
          let sql = `DELETE FROM employee WHERE id = "${input.id}";`
      
  
          db.query(sql, (err, row) => {
            if (err) throw err;
            console.log("The employee entered has been deleted successfully from the database.");
            startPrompt();
          });
        }
      });
  };
      