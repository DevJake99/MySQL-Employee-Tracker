const inquirer = require('inquirer');
const dbConnect = require('./dbConnection');
const Query = require('./querys');
//const Sequelize = require('sequelize');
//require('dotenv').config();

// Prompts will be created in separate lists in order to provide 
// different menus for responses that require more complex input (such as creating new roles or employees)

// Prompts for main tasks
let tasks = [
    {
        type: 'list',
        name: 'task',
        message: 'What would you like to do?',
        choices:
            [
                'View All Departments', 'View All Roles',
                'View All Employees', 'Add A Department',
                'Add Role', 'Add an Employee', 'Update Employee Role', 'Exit'
            ]
    },
];

// Promts for adding a new Department 
const addDepList = [
    {
        type: 'input',
        name: 'addDepartment',
        message: 'Enter department name'
    }
];

// Prompts for adding a new role 
const addRoleList = [

    {
        type: 'input',
        name: 'addRole',
        message: "Enter the new Role's title"
    },
    {
        type: 'input',
        name: 'addSalary',
        message: "Enter the salary of this role",
    },
    {
        type: 'input',
        name: 'department',
        message: "Which Department does this role belong to?"
    }
];

// Promts for adding a new employee 
const addEmployeeList = [
    {
        type: 'input',
        name: 'addEmployee',
        message: 'Enter the employees first name'
    },
    {
        type: 'input',
        name: 'addEmployeeLast',
        message: 'Enter the employees last name'
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: 'what is their role?'
    },
    {
        type: 'input',
        name: 'employeeManager',
        message: 'Which manager will they report to?'
    },
];
// Prompt to update an employee role
const updateEmployeeList = [
    {
        type: 'input',
        mame: 'updateEmployeeRole',
        message: 'What is their new role?'
    }

];

const departmentList = [];
const roleList = [];
const employeeList = [];



function init() {
    // Prompt questions
    inquirer.prompt(tasks).then((answers) => {
        if (answers === 'View All Departments') {
            return dbConnect.query(Query.viewAllDepartments(), (err, results) => {
                if (err) {
                    throw err;
                }
                console.table(results);
            });
        }
        else if (answers === 'View All Roles') {
            dbConnect.query(Query.viewAllRoles());
        }
        else if (answers === 'View All Employees') {
            dbConnect.query(Query.viewAllEmployees());
        }
        else if (answers === 'Add Department') {
            inquirer.promt(addDepList).then((answers) => {
                depName = answers.addDepartment;
                departmentList.push(depName);
                dbConnect.query(Query.addDept(depName));
            })

        }
        else if (answers === 'Add Role') {
            inquirer.promt(addRoleList).then((answers) => {
                var roleTitle = answers.roleTitle;
                var roleSalary = answers.addSalary;
                var roleDept = answers.department;
                // Check for valid department entry 
                if (departmentList.includes(roleDept) === false) {

                    let noDept = [{
                        name: 'addDept',
                        type: confirm,
                        message: `The Department ${roleDept} does not exist, would you like to create one?`
                    }];
                    inquirer.prompt(noDept).then((answers) => {
                        if (answers.addDept == true) {
                            newDep = answers.addDept
                            departmentList.push(newDep);
                            roleList.push(roleTitle);
                            dbConnect.query(Query.addRole(roleTitle, roleSalary, roleDept));
                        } else {
                            let tryAgain = [{
                                name: 'addDeptTwo',
                                type: 'input',
                                message: 'Enter an Existing Department'
                            }];
                            inquirer.prompt(tryAgain).then((answers) => {
                                roleDept = answers.addDeptTwo;

                            })

                        }
                    })
                }

            })
        }
        /*if (answers === 'Add an Employee') {
            inquirer.promt(addEmployeeList).then((answers) => {
                var first_name = answers.first_name;
                var last_name = answers.last_name;
                query.addEmployee()
 
            })
 
        }
        if (answers === 'Update Employee Role') {
 
        }*/
    })
};

init();

