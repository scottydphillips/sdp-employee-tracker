const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'gooby0611',
	database: 'employee_seedsDB'
});

const firstQuestion = [{
	name: 'firstQuestion',
	type: 'list',
	message: 'What would you like to do?',
	choices: ['Add an employee', 'View an employee', "Update an employee's role", 'Add a role', 'View a role', 'Add a department', 'View a department', 'End program']
}]

const askFirstQuestion = () => {
	inquirer.prompt(firstQuestion)
	.then((data) => {
		if(data.firstQuestion === 'Add an employee') {
			addEmployee();
		} else if (data.firstQuestion === 'View an employee') {
			viewEmployee();
		} else if (data.firstQuestion === "Update an employee's role") {
			updateEmployeeRole();
		} else if (data.firstQuestion === 'Add a role') {
			addRole();
		} else if (data.firstQuestion === 'View a role') {
			viewRole();
		} else if (data.firstQuestion === 'Add a department') {
			addDepartment();
		} else if (data.firstQuestion === 'View a department') {
			viewDepartment();
		} else {
			break;
		}
	}
)};

// const addEmployee = (data) => {
// 	connection.query(
// 		'SELECT * FROM employee', (err,res) => {
// 		if (err) throw err;
// 		console.table(`${this.table}`);
// 		inquirer.prompt(res)
// 	}
// 	)
// }

// const viewEmployee = (data) => {
// 	connection.query(
// 		'SELECT * FROM employee WHERE ?',
// 		{

// 		},
// 		(err,res) => {
// 			if(err) throw err;
// 			console.table(`${this.table}`);
// 		}
// 	)
// }

// const updateEmployeeRole = (data) => {
// 	connection.query(
// 		'SELECT ? FROM employee WHERE ? UPDATE employee SET ? WHERE ?',
// 		{

// 		},
// 		(err,res) => {
// 			if(err) throw err;
// 			console.table(`${this.table}`)
// 		}
// 	)
// }

// const addRole = (data) => {
// 	connection.query(
// 		`SELECT FROM WHERE`,
// 		{

// 		},
// 		(err,res) => {
// 			console.table(`${this.table}`)
// 		}
// 	)
// }

// const viewRole = (data) => {
// 	connection.query(
// 		`SELECT * FROM role WHERE`,
// 		{

// 		},
// 		(err,res) => {
// 			if(err) throw err;
// 			console.table(`${this.table}`)
// 		}
// 	)
// }

// const addDepartment = (data) => {
// 	connection.query(
// 		`INSERT INTO department VALUES ?`,
// 		{

// 		},
// 		(err,res) => {
// 			if(err) throw err;
// 			console.table(`${this.table}`)
// 		}
// 	)
// }

// const viewDepartment = (data) => {
// 	connection.query(
// 		`SELECT ? FROM department WHERE`,
// 		{

// 		},
// 		(err,res) => {
// 			if(err) throw err;
// 			console.table(`${this.table}`)
// 		}
// 	)
// }

// const readTable = () => {
// 	connection.query(
// 		'SELECT * FROM ?',
// 		{
// 			table: `${this.table}`
// 		},
// 		 (err,res) => {
// 			if (err) throw err;
// 			console.table(`${this.table}`);
// 			connection.end();
// 		} 
// 	) 
// }

// const init = () => {
// 	askFirstQuestion()
// }

// connection.connect((err) => {
// 	if(err) throw err;
// 	console.log(`connected as id ${connection.threadId}\n`)
// })