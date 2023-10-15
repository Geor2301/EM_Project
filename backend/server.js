const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors());


const CONNECTION_URL = 'mongodb+srv://george_iro_proj:iroproj123@cluster0.uijqpa3.mongodb.net/iro_project?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
//const CONNECT_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT} `)))
    .catch((error) => console.log(error.message));


const Employee = require('./models/Employee');

app.get('/employees', async (req, res) => {
    const employees = await Employee.find();

    res.json(employees);
});

app.get('/employees/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    res.json(employee);
});

app.post('/employee/new', (req, res) => {
    const employee = new Employee({...req.body})

    employee.save();

    res.json(employee);
});


app.put('/employee/update/:id', async (req, res) => {

    const id = req.params.id;
    const { name, dob, role, active } = req.body;
    
    const updatedEmployee = { name, dob, role, active, _id: id};
    console.log(updatedEmployee);
	await Employee.findByIdAndUpdate(id,updatedEmployee);

	res.json(updatedEmployee);
});

app.delete('/employee/delete/:id', async (req, res) => {

    const { id } = req.params.id;
    await Employee.findByIdAndRemove(req.params.id);

    res.json({ message: "Post deleted successfully." });
});













