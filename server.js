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
      password: '',
      database: 'staff_db'
    },
    console.log(`Connected to the staff_db database.`)
  );
  

  function menuOption () {
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
            case 'Update An Employee Manager':
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
        }
    })
  };       
       