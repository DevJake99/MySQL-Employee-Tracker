const inquirer = require('inquirer');
const dbConnect = require('./dbConnection');
const query = require('./querys');

// Prompts for main tasks
let tasks = [
    {
        type: 'List',
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
// Prompt to update am employee rolle
updateEmployeeList = [
    {
        type: 'input',
        mame: 'updateEmployeeRole',
        message: 'What is their new role?'
    }

];

const departmentList = [];
const roleList = [];
const employeeList = [];


async function init() {
    // Establish connection connection to database
    await dbConnect();

    // Prompt questions
    inquirer.prompt(tasks).then((answers) => {
        if (answers === 'View All Departments') {
            query.viewAllDepartments();
        }
        if (answers === 'View All Roles') {
            query.viewAllRoles();
        }
        if (answers === 'View All Employees') {
            query.viewAllEmployees();
        }
        if (answers === 'Add Department') {

            let response = addDepList.addDepartment;
            inquirer.promt(response).then((answers) => {
                depName = answers.addDepartment;
                query.addDepartment(depName);
                departmentList.push(depName);
            })

        }
        if (answers === 'Add Role') {
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
                            addDepList.push(roleDept);
                        } else {
                            return
                        }
                    })
                }
                roleList.push(roleTitle);
                query.addRole(roleTitle, roleSalary, roleDept);

            })
        }
        if (answers === 'Add an Employee') {
            inquirer.promt(addEmployeeList).then((answers) => {
                var first_name = answers.first_name;
                var last_name = answers.last_name;
                query.addEmployee()

            })

        }
        if (answers === 'Update Employee Role') {

        }
    })
};

