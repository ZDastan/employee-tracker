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
                'Add a Department', 
                'Add Role', 
                'Add an Employee', 
                'Update and Employee Role',
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
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployeeRole();
                break;
            case 'Quite':
                console.log('Thank you for using the employee database!');
                db.end();
                break;
         
        }
    })
  }; 
  
  function viewAllDepartments() {
    const sql = `SELECT employee.id, employee.name FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            answer.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startPrompt();
    });
};

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

function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name off the department?"
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
                startPrompt();
            }
        )
    })
  }

  function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary,role.department AS Department FROM role",   function(err, res) {
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
            name: 'department',
            message: "Which department does the role belong to?",
            choices: [
                ('Marketing'),
                ('Customer Service'), 
                ('Accounting'), 
                ('Sales'), 
                ('Finance')
            ] 
        }
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
  
      });
    });
    }

    function addEmployee() { 
        inquirer.prompt([
            {
              name: "firstname",
              type: "input",
              message: "What is the employee's firt name? "
            },
            {
              name: "lastname",
              type: "input",
              message: "What is the employee's last name? "
            },
            {
              name: "role",
              type: "list",
              message: "What is the employee's role? ",
              choices: selectRole()
            },
            {
                name: "choice",
                type: "rawlist",
                message: "Who is the employee's managers?",
                choices: selectManager()
            }
        ]).then(function (val) {
          var roleId = selectRole().indexOf(val.role) + 1
          var managerId = selectManager().indexOf(val.choice) + 1
          connection.query("INSERT INTO employee SET ?", 
          {
              first_name: val.firstName,
              last_name: val.lastName,
              manager_id: managerId,
              role_id: roleId
              
          }, function(err){
              if (err) throw err
              console.table(val)
              startPrompt()
          })
    
      })
    };

    

       