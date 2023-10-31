const connect = require('./dbConnection');

class Query{
    constructor(connection){
        this.connection = connection;

    }
    viewAllDepartments(){
        return this.connection.promise().query("SELECT * FROM department")
    }
}

module.exports=Query;