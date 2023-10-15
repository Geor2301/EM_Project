import React,{ useState, useEffect } from 'react'
import './App.css'
import Employee from './Employee'
import logo from './hr_logo.png';


const api_base = 'http://localhost:5000';
function App() {

  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState({ name: undefined, dob: undefined, role: undefined, active:undefined, _id:undefined, _v:undefined });

 	useEffect(() => {
		GetEmployees();
	}, []);

	const GetEmployees = () => {
		fetch(api_base + '/employees')
			.then(res => res.json())
			.then(data => setEmployees(data))
			.catch((err) => console.error("Error: ", err));
	} 

  const createEmployee = async () => {
    
		const data = await fetch(api_base + "/employee/new", {
			method: "POST",
      headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify(editEmployee)
		}).then(res => res.json());

		setEmployees([...employees, data]);    
	}

  const updateEmployee = async id => {
   
    const data = await fetch(api_base + '/employee/update/' + id, {
			method: "PUT",
      headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify(editEmployee)
		}).then(res => res.json());

		setEmployees(employees => employees.map(employee => {
			if (employee._id === data._id) {
				employee = data
			}
			return employee;
		}));		
	}

  const deleteEmployee = async id => {
		const data = await fetch(api_base + '/employee/delete/' + id, { method: "DELETE" }).then(res => res.json());

    if(data.message === "Post deleted successfully." ){
      setEmployees(employees => employees.filter(employee => employee._id !== id));
    }		
	}

  const handleFormSubmit = function(){
    if(editEmployee?._id){
      updateEmployee(editEmployee?._id)
    }
    else{
      createEmployee()
    }
    
    clear()
    console.log(editEmployee)
  }

  const clear = () =>{
    setEditEmployee({ name: undefined, dob: undefined, role: undefined, active:undefined, _id:undefined, _v:undefined})
  }

  return (
    <div className='container'>
      <div className='navbar'>
      <img className='navbar-logo' src={logo} alt='<company logo>' height={'70px'} width={'85px'}/> 

        <div className='navbar-title'>
          Employee Management
        </div>                 
      </div>
      <div className='body-main'>
        
        <div className='employee-list-container'>
          <div className='employee-list-title'>
            <div className='employee-list-title-item'>
              Name
            </div>
            <div className='employee-list-title-item'>
              DOB
            </div>
            <div className='employee-list-title-item'>
              Role
            </div>
            <div className='employee-list-title-item'>
              Status
            </div>
            <div className='employee-list-title-item'>
              Modify Details
            </div>

          </div>
          {
            employees.map( (employee)=>(
              
              <Employee employee={employee} deleteEmployee={deleteEmployee} setEditEmployee={setEditEmployee}/>
            ))
          }

        </div>

        <div className='employee-input'>
          <div className='employee-input-form'>
            <div className='employee-input-form-title'>
              Create / Update Employee Details
            </div>
            <input className='employee-input-field' 
                   type='text' 
                   placeholder='Enter Name' 
                   value={editEmployee.name} 
                   onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}              
            />
            <input className='employee-input-field' 
                   type='text' 
                   placeholder='Enter DOB (dd/mm/yyy)' 
                   value={editEmployee.dob}
                   onChange={(e) => setEditEmployee({ ...editEmployee, dob: e.target.value })}
            />
            <input 
                   className='employee-input-field' 
                   type='text' 
                   placeholder='Enter Job Role' 
                   value={editEmployee.role}
                   onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })}
            />
            <div className='employee-input-field employee-input-status'
                 onClick={(e) => setEditEmployee({ ...editEmployee, active: editEmployee?.active? false : true })}
            >
              <span>{'Status :  '}</span>
              <span className={`${editEmployee?.active? 'active' : 'inactive'}`}>
                { editEmployee?
                  (editEmployee?.active? 'ACTIVE' : 'INACTIVE')
                  :''
                }
              </span>
            </div>
            <button className='employee-input-submit-btn' onClick = {handleFormSubmit}>Submit</button>            
          </div>
        </div>
      </div>

    </div>
  )
}

export default App