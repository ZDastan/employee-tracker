# Employee Tracker

## Description

This project is to build a solution for managing a company's employee database using Node, Inquirer and MySQL to be able to view, add and update employees, departments and roles.


## Installation

Make sure to have mysql server downloaded and running.

Since Node.js applications don't have a front end, clone or download the repository to your own local machine and run it from your command line.

Then, make sure that your repo includes a package.json with the required dependencies. You can create one by running npm init in your command line.

Run npm i or npm install in order to download all the dependencies.

Here are the MySQL instructions to create your tables:

Enter mysql -u root -p in the CLI to enter mysql.
Enter your mysql password (it is the same as the one in the db/connection.js file).
Create your database by entering CREATE DATABASE employees; and enter.
Make sure it was created successfully by entering SHOW databases;.
Tell your database to use the employees database by entering USE employees;.
Tell your database to use your db and schema files by entering source db/db.sql; and enter, then type source db/schema.sql; and enter.
Exit MySQL by entering quit;.
Your are done!
Run node server.js or npm start in your terminal to launch the application.

## Usage

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ``
    
    https://github.com/ZDastan/employee-tracker

