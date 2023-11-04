const connection = require('./connection');



class Query {
    constructor(connection) {
        this.connection = connection;

    }
    viewAllDepartments() {
        const query = "SELECT * FROM departments";
        return this.connection.promise().query("SELECT * FROM departments")
    }
    viewAllRoles() {
        return this.connection.promise().query('SELECT * FROM roles');
    }
    viewAllEmployees() {
        return this.connection.promise().query('SELECT * FROM employees');
    }
    addRole(title, salary, department_id) {
        const query = "INSERT INTO roles (job_title, salary, department_id) VALUES (?,?,?)";
        let salaryString = String(salary);
        return this.connection.promise().query(query, [title, salaryString, department_id])
    }
    addDept(deptName) {
        const query = 'INSERT INTO departments SET ?'
        return this.connection.promise().query('INSERT INTO departments (department) VALUES (?)', deptName)
    }
    addEmployee(firstName, lastName, manager, role, department_id) {
        const query = `
        INSERT INTO employees 
        (first_name, last_name, manager_first_name, role_id, department_id) 
        VALUES ('${firstName}','${lastName}','${manager}','${role}','${department_id}')`; //add role when you learn more about the joins
        //const [newEmployee, _] = this.connection.promise.query(query)
        return this.connection.promise().query(query)
        //dbConnect.query(query)
    }
    updateEmployee(newRoleId, employee) {
        let query = `UPDATE employees SET role_id = ${newRoleId} WHERE id = ${employee}`
        return this.connection.promise().query(query)
    }
}

module.exports = new Query(connection)

