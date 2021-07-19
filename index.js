const { restoreDefaultPrompts } = require('inquirer');
const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'gooby0611',
	database: 'employees_seedsDB'
});

const firstQuestion = [{
	name: 'firstQuestion',
	type: 'list',
	message: 'What would you like to do?',
	choices: ['Add an employee', 'View an employee', "Update an employee's role", 'Add a role', 'View a role', 'Add a department', 'View a department', 'End program']
}]

const askFirstQuestion = () => {
	console.log("Welcome to Santa's Workshop!");
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
			return;
		}
	}
)};

const askAnotherQuestion = () => {
	inquirer.prompt([{
		name: 'anotherOne',
		type: 'list',
		message: 'What else would you like to do?',
		choices: ['Add an employee', 'View an employee', "Update an employee's role", 'Add a role', 'View a role', 'Add a department', 'View a department', 'End program']
	}])
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
			return;
		}
	}
)};

const addEmployee = () => {
	inquirer.prompt([
		{
			name: 'first_name',
			type: 'input',
			message: "What is the employee's first name?"
		},
		{
			name: 'last_name',
			type: 'input',
			message: "What is the employee's last name?"
		},
		{
			name: 'role_id',
			type: 'list',
			message: "What is the employee's role?",
			choices: ['CEO', 'Manager', 'Sales elf', 'Toy Maker', 'Bag Loader', 'Reindeer Care Specialist', 'Sleigh Mechanic']
		},
		{
			name: 'department_id',
			type: 'list',
			message: "What department does the employee work in?",
			choices: ['Management', 'Sales', 'Production floor', 'Shipping & Receiving', 'Reindeer Care', 'Sleigh Maintenance']
		}
	])	
		.then((data) => {
			let determineRoleId = () => {
				if (data.role_id === 'CEO') {
					return role_id = 1;
				} else if (data.role_id === 'Manager') {
					return role_id = 2;
				} else if (data.role_id === 'Sales elf') {
					return role_id = 3;
				} else if (data.role_id === 'Toy Maker') {
					return role_id = 4;
				} else if (data.role_id === 'Bag Loader') {
					return role_id = 5;
				} else if (data.role_id === 'Reindeer Care Specialist') {
					return role_id = 6;
				} else {
					return role_id = 7;
				}
			};
			let determineDepartmentId = () => {
				if (data.department_id === 'Management') {
					return department_id = 1;
				} else if (data.department_id === 'Sales') {
					return department_id = 2;
				} else if (data.department_id === 'Production Floor') {
					return department_id = 3;
				} else if (data.department_id === 'Shipping & Receiving') {
					return department_id = 4;
				} else if (data.department_id === 'Reindeer Care') {
					return department_id = 5;
				} else {
					return department_id = 6;
				}
			};
			connection.query(
		'INSERT INTO employee SET ?',
		{
			first_name: data.first_name,
			last_name: data.last_name,
			role_id: determineRoleId(),
			manager_id: determineDepartmentId()
		},
		(err,res) => {
		if (err) throw err;
		askAnotherQuestion();
		}
		)}
	)
}

// const viewEmployee = (data) => {
// 	connection.query(
// 		'SELECT * FROM employee',
// 		(err,res) => {
// 			if(err) throw err;
// 			inquirer.prompt([{
// 				name: 'employee',
// 				type: 'rawlist',
// 				choices() {
// 					const managerName = `${employee.first_name} ${employee.last_name}`
// 					console.log(managerName);
// 					const choiceArray = [];
// 					results.forEach((managerName) => {
// 						choiceArray.push()
// 					});
// 					return choiceArray;
// 				}
// 			}]);
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
// 	let determineDepartmentId = () => {
// 		if (data.department_id === 'Management') {
// 			return department_id = 1;
// 		} else if (data.department_id === 'Sales') {
// 			return department_id = 2;
// 		} else if (data.department_id === 'Production Floor') {
// 			return department_id = 3;
// 		} else if (data.department_id === 'Shipping & Receiving') {
// 			return department_id = 4;
// 		} else if (data.department_id === 'Reindeer Care') {
// 			return department_id = 5;
// 		} else {
// 			return department_id = 6;
// 		}
// 	};
// 	inquirer.prompt([
// 		{
// 			name: 'title',
// 			type: 'list',
// 			message: "What is the employee's title?"
// 		},
// 		{
// 			name: 'salary',
// 			type: 'input',
// 			message: "What is the employee's salary?"
// 		},
// 		{
// 			name: 'department_id',
// 			type: 'list',
// 			message: "What department does the employee work in?",
// 			choices: ['Management', 'Sales', 'Production floor', 'Shipping & Receiving', 'Reindeer Care', 'Sleigh Maintenance']
// 		}
// 	])
// 	.then((data) => {
// 	connection.query(
// 		`SELECT ? FROM department WHERE`,
// 		{
// 			title: `${data.title}`,
// 			salary: `${data.salary}`,
// 			department_id: determineDepartmentId()
// 		},
// 		(err,res) => {
// 			console.table(res)
// 		})
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

askFirstQuestion();

connection.connect((err) => {
	if(err) throw err;
	console.log(`connected as id ${connection.threadId}\n`)
})