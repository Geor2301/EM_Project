const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: String,
    dob: String,
    role: String,
    active: Boolean,    
})

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;