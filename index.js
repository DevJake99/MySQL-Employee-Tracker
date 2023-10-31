const inquirer = require('inquirer');
const dbConnect = require('./dbConnection');
const query = require('./querys');

let tasks = [
    {
        type: 'List',
        name: 'task',
        message: 'What would you like to do?',
        choices:
            [
                'View All Departments', 'view all roles',
                'view all employees', 'add a department',
                'add a role', 'add an employee', 'update an employee role'
            ]
    },
];
const optionsList = [
    {
        type: 'input',
        name: 'addDepartment',
        message: 'Enter department name'
    },

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
    },
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
    {
        type: 'input',
        mame: 'newEmployeeRole',
        message: 'What is their new role?'
    }

]

const departmentList = [];
const roleList = [];
const employeeList = [];


async function init() {
    // Establish connection connection to database
    await dbConnect();

    // Prompt questions
    inquirer.prompt(questions).then((answers) => {
        let userChoice = answers.task;
        if (userChoice === 'View All Departments') {

        }

    });


}

