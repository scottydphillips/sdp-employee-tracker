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
	type: 'rawlist',
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
			chooseEmployee();
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
			message: "What is the employee's department?",
			choices: ['Management', 'Sales', 'Production Floor', 'Shipping & Receiving', 'Reindeer Care', 'Sleigh Maintenance']
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
		'INSERT INTO employee SET ?',
		{
			first_name: data.first_name,
			last_name: data.last_name,
			role_id: determineRoleId(),
			manager_id: determineDepartmentId()
		},
		(err,res) => {
		if (err) throw err;
		askFirstQuestion();
		}
		)}
	)
}

const viewEmployee = () => {
	connection.query(
		'SELECT * FROM employee',
		(err,res) => {
			if (err) throw err;
		console.table(res);
		askFirstQuestion();
		}	
	)
}

const chooseEmployee = () => {
	connection.query(
	'SELECT * from EMPLOYEE', (err, res) => {
		if (err) throw err;
		inquirer.prompt({
			name: 'employeeName',
			type: 'rawlist',
			message: 'Select an employee to update',
			choices() {
				let choiceArray = []
				res.forEach(({ first_name }) => {
					choiceArray.push(first_name);
				});
				return choiceArray;
			}
		}
		).then((data) => {
			updateEmployeeRole(data);
		}
		)}
	)
}

const updateEmployeeRole = (employee) => {
	connection.query(
		'SELECT * FROM role',
		(err, results) => {
			if(err) throw err;
		inquirer.prompt([
		{
			name: 'role_id',
			type: 'list',
			message: "What is the employee's role?",
			choices() {
				let banana = [];
				results.forEach(({ title }) => {
					banana.push(title) 
				}); return banana;
			}
		},
	])
		.then((data) => {
			let chosenRole;
			results.forEach((role) => {
				if (role.title === data.role_id) {
					chosenRole = role;
				}
			})
		connection.query(
		'UPDATE employee SET ? WHERE ?',
		[{
			role_id: chosenRole.id,
		},
		{
			first_name: employee.employeeName,
		}],
		(err,res) => {
			if(err) throw err;
			console.table(res);
			askFirstQuestion();
		}
	)
})
})
}

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
      ); askFirstQuestion();
    });
}

const viewRole = () => {
	connection.query(
		'SELECT * FROM role',
		(err,res) => {
			if (err) throw err;
		console.table(res);
		askFirstQuestion();
		}	
	)
}

const addDepartment = () => {
	inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What is the new department's name?",
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
      ); askFirstQuestion();
    });
}

const viewDepartment = () => {
	connection.query(
		'SELECT * FROM department',
		(err,res) => {
			if (err) throw err;
		console.table(res);
		askFirstQuestion();
		}	
	)
}

askFirstQuestion();

connection.connect((err) => {
	if(err) throw err;
	console.log(`connected as id ${connection.threadId}\n`)
})