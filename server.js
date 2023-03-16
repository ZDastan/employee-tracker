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
                'Update an Employee Role',
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
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add  Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
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
                  let sql = `INSERT INTO department (name) VALUES ("${input.title}, ${input.salary}, ${list.department_name}");`;
          
                  db.query(sql, (err, row) => {
                    if (err) throw err;
                    startPrompt();
                  });
                }
              });
}
//   function addRole() { 
//     db.query("SELECT role.title AS Title, role.salary AS Salary,role.department AS Department FROM role",   function(err, res) {
//       inquirer.prompt([
//           {
//             name: "title",
//             type: "input",
//             message: "What is the name of the role?"
//           },
//           {
//             name: "salary",
//             type: "input",
//             message: "What is the salary of the role?"
  
//           },
//           {
//             type: 'list',
//             name: 'department',
//             message: "Which department does the role belong to?",
//             choices: [
//                 ('Marketing'),
//                 ('Customer Service'), 
//                 ('Accounting'), 
//                 ('Sales'), 
//                 ('Finance')
//             ] 
//         }
//       ]).then(function(res) {
//           db.query(
//               "INSERT INTO role SET ?",
//               {
//                 title: res.Title,
//                 salary: res.Salary,
//               },
//               function(err) {
//                   if (err) throw err
//                   console.table(res);
//                   startPrompt();
//               }
//           )
  
//       });
//     });
//     }

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
          db.query("INSERT INTO employee SET ?", 
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
    

       