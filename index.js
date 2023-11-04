const inquirer = require('inquirer');
const query = require('./db')


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

// Create new instance of Query class and enter our SQL connection variable as the argument



// Start title function
const titleFunction = () => {
    console.log(`====================================================================================`);
    console.log(``);
    console.log('                           Employee Tracker');
    console.log(``);
    console.log(``);
    console.log(`====================================================================================`);
    //promptUser();
};



function init() {
    //initiate title 
    titleFunction();
    // Prompt questions
    inquirer.prompt(tasks).then((answers) => {
        switch (answers.task) {
            case "View All Departments":
                viewDepartment();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add A Department':
                AddADepartment();
                break;
            case 'Add Role':
                AddARole();
                break;
            case 'Add an Employee':
                AddAEmployee();
                break;
            case 'Update Employee Role':
                updateAEmployee();
                break;
            default:
                exit()
                break;



        }
    })
};

function viewDepartment() {
    query.viewAllDepartments().then(([rows]) => {
        console.table(rows)
        init()
    })
}

function AddADepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'addDepartment',
        message: 'Enter department name'
    })
        .then((department) => {
            console.log(department);
            let name = department.addDepartment
            query.addDept(name)
                .then((deptName) => {
                    console.log(`The ${deptName.addDepartment} department was successfully added!`);
                    init()
                })
        })
        .catch((err) => {
            console.error(err)
        })
}

function viewRoles() {
    query.viewAllRoles().then(([rows]) => {
        console.table(rows);
        init();
    })
}

function AddARole() {
    query.viewAllDepartments()
        .then(([rows]) => {
            let departments = rows.map((department) => ({
                name: department.department,
                value: department.id
            }))

            inquirer.prompt([

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
                    type: 'list',
                    name: 'department',
                    message: "Which Department does this role belong to?",
                    choices: departments
                }
            ]).then((role) => {
                query.addRole(role.addRole, role.addSalary, role.department)
                    .then((role) => {
                        console.log(`The role: ${role.addRole} was sucessfully added!`);
                        init();
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            })
        })
}

function AddAEmployee() {
    query.viewAllRoles().then(([rows]) => {
        let roles = rows.map((role) => ({
            name: role.job_title,
            value: role.id,
            dep: role.department_id
        }))
        console.log('roles: ', roles);
        console.log('rows: ', rows)
        inquirer.prompt([
            {
                type: 'input',
                name: 'employeeFirst',
                message: 'Enter the employees first name'
            },
            {
                type: 'input',
                name: 'employeeLast',
                message: 'Enter the employees last name'
            },
            {
                type: 'input',
                name: 'employeeManager',
                message: 'Which manager will they report to?'
            },
            {
                type: 'list',
                name: 'employeeRole',
                message: 'what is their role?',
                choices: roles
            }
        ])
            .then((employee) => {
                console.log(employee);
                let depId = 'placeHolder';
                for (i = 0; i < roles.length; i++) {
                    if (roles[i].value === employee.employeeRole) {
                        depId = roles[i].dep;
                    } else { console.log(depId) }
                }
                query.addEmployee(
                    employee.employeeFirst,
                    employee.employeeLast,
                    employee.employeeManager,
                    employee.employeeRole,
                    depId)
                    .then((employee) => {
                        console.log(`Employee: ${employee.employeeFirst} has been successfully created`);
                        init()
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            })
    })

}

function exit() {
    console.log("Goodbye!");
    process.exit()
}
init();

