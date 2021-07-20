const { restoreDefaultPrompts } = require('inquirer');
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const password = require('./password')

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: password,
	database: 'employees_seedsDB',
});

let managerArray = []

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
			name: 'manager_id',
			type: 'list',
			message: "Who is the employee's manager?",
			choices: managerArray
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
			let determineManagerId = () => {
				connection.query(
					'SELECT * FROM employee WHERE role_id = 2',
					(err,res) => {
						if (err) throw err;
						for(let j=0; j=res.length; j++) {
							managerArray.push(`${res.first_name} ${res.last_name}`)
						}
					}
				)
			};
			connection.query(
		'INSERT INTO employee SET ?',
		{
			first_name: data.first_name,
			last_name: data.last_name,
			role_id: determineRoleId(),
			manager_id: determineManagerId()
		},
		(err,res) => {
		if (err) throw err;
		askAnotherQuestion();
		}
		)}
	)
}

const viewEmployee = () => {
	let choiceArray = [];
	connection.query(
		'SELECT * FROM employee',
		(err,res) => {
			if(err) throw err;
			for(let i=0; i<res.length; i++) {
				 choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);		 
			}
		inquirer.prompt([{
				name: 'employee',
				type: 'rawlist',
				choices: choiceArray,
				message: 'Choose an employee'
			}])
			.then((data) => {
				console.log(data);
				connection.query(
					'SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = employee.manager_id',
					(err,res) => {
						if(err) throw err;
						console.table(data);
					}
				); askAnotherQuestion();
			}).catch((err) => {
				console.error(err);
		})
	})
}

// const updateEmployeeRole = (data) => {
// 	connection.query(
// 		'SELECT FROM employee WHERE ? UPDATE employee SET ? WHERE ?',
// 		{

// 		},
// 		(err,res) => {
// 			if(err) throw err;
// 			console.table(`${this.table}`)
// 		}
// 	)
// }

const addRole = () => {
	inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the new role's title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the new employee's salary?",
      },
      {
        name: "department_id",
        type: "list",
        message: "What department does the employee work in?",
        choices: [
          "Management",
          "Sales",
          "Production floor",
          "Shipping & Receiving",
          "Reindeer Care",
          "Sleigh Maintenance",
        ],
      },
    ])
    .then((data) => {
      let determineDepartmentId = () => {
        if (data.department_id === "Management") {
          return (department_id = 1);
        } else if (data.department_id === "Sales") {
          return (department_id = 2);
        } else if (data.department_id === "Production Floor") {
          return (department_id = 3);
        } else if (data.department_id === "Shipping & Receiving") {
          return (department_id = 4);
        } else if (data.department_id === "Reindeer Care") {
          return (department_id = 5);
        } else {
          return (department_id = 6);
        }
      };
      connection.query(
        `INSERT INTO role SET ?`,
        {
          title: data.title,
          salary: data.salary,
          department_id: determineDepartmentId(),
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
        }
      ); askAnotherQuestion();
    });
}

const viewRole = () => {
	let choiceArray = [];
	connection.query(
		'SELECT * FROM role',
		(err,res) => {
			if(err) throw err;
			for(let i=0; i<res.length; i++) {
				 choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);		 
			}
		inquirer.prompt([{
				name: 'role',
				type: 'rawlist',
				choices: choiceArray,
				message: 'Choose a role'
			}])
			.then((data) => {
				console.log(data);
				connection.query(
					'SELECT * FROM role LEFT JOIN employee ON employee.role_id = role.id',
					(err,res) => {
						if(err) throw err;
						console.table('\n', res);
					}
				); askAnotherQuestion();
			}).catch((err) => {
				console.error(err);
		});
	})
}

const addDepartment = () => {
	inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the new department's title?",
      },
    ])
    .then((data) => {
      connection.query(
        `INSERT INTO department SET ?`,
        {
          name: data.name,
        },
        (err, res) => {
          if (err) throw err;
        }
      ); askAnotherQuestion();
    });
}


// const viewDepartment = () => {
// 	let choiceArray = [];
// 	connection.query(
// 		'SELECT * FROM department',
// 		(err,res) => {
// 			if(err) throw err;
// 			for(let i=0; i<res.length; i++) {
// 				 choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);		 
// 			}
// 		inquirer.prompt([{
// 				name: 'department',
// 				type: 'rawlist',
// 				choices: choiceArray,
// 				message: 'Choose a department'
// 			}])
// 			.then((data) => {
// 				console.log(data);
// 				// connection.query(
// 				// 	'SELECT * FROM department LEFT JOIN employee ON employee.manager_id = department.id',
// 				// 	(err,res) => {
// 				// 		if(err) throw err;
// 				// 		console.table(data);
// 				// 	}
// 				); askAnotherQuestion();
// 			}).catch((err) => {
// 				console.error(err);
// 		})
// 	})
// }



// const init = () => {
// 	askFirstQuestion()
// }

askFirstQuestion();

connection.connect((err) => {
	if(err) throw err;
	console.log(`connected as id ${connection.threadId}\n`)
})