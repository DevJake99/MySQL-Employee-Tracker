const dbConnect = require('./dbConnection');
class Query {
    constructor(connection) {
        this.connection = connection;

    }
    viewAllDepartments() {
        return dbConnect.query("SELECT * FROM departments");
    }
    ViewAllRoles() {
        return dbConnect.query('SELECT * FROM roles');
    }
    viewAllEmployees() {
        return dbConnect.query('SELECT * FROM employees');
    }
    addRole(roleTitle, roleSalary, roleDept) {
        let job_title = roleTitle;
        let salary = roleSalary;
        let Dept = roleDept; // add query for joining dept into role table
        function roleDept() {
            let roleQuery = `INSERT INTO roles (job_title, salary) VALUEs ('${job_title}', '${salary}')`;
            return dbConnect.query(roleQuery,)
        }
        function Deptfunc(depName) {
            const query = `INSERT INTO departments (department) VALUE ('${depName}')`
            return dbConnect.query(query)
        }
        function joinRoleDept() { // function to link dept id to role

        }
        roleDept();
        Deptfunc();
    }
    addDept(deptName) {
        const query = `INSERT INTO departments (department) VALUE ('${deptName}')`
        return dbConnect.query(query)
    }
    async addEmployee(firstName, lastName, manager, role) {
        const query = `
        INSERT INTO employees 
        first_name, 
        last_name, 
        manager_first_name 
        VALUES (
            '${firstName}',
            '${lastName}',
            '${manager}'
            )`; //add role when you learn more about the joins
        const [newEmployee, _] = await dbConnect.execute(query)
        return newEmployee
        //dbConnect.query(query)
    }
    updateEmployee() {

        return this.connection.promise().query()
    }
}

module.exports = Query;