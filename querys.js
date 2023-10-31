
class Query {
    constructor(connection) {
        this.connection = connection;

    }
    viewAllDepartments() {
        return this.connection.promise().query("SELECT * FROM departments");
    }
    ViewAllRoles() {
        return this.connection.promise().query('SELECT * FROM roles');
    }
    viewAllEmployees() {
        return this.connection.promise().query('SELECT * FROM employees');
    }
    addRole(roleTitle, roleSalary, roleDept) {
        let job_title = roleTitle;
        let salary = roleSalary;
        let Dept = roleDept;
        function roleDept() {
            let roleQuery = `INSERT INTO roles (${job_title}, ${salary}) VALUES (?, ?)`;
            return this.connection.promise.query(roleQuery)
        }
        function Dept() {
            let deptQuery = `INSERT INTO departments (${Dep}) VALUES (?)`;
            return this.connection.promise().query(deptQuery)
        }
        roleDept();
        Dept();
        }
    addEmployee(first_name, last_name, role, manager){
        const query = 'INSERT INTO employees SET ?';
        return this.connection.promise().query( )
    }
    updateEmployee(){

        return this.connection.promise().query( )
    }
}

module.exports = Query;