import React from 'react'
import './Employee.css'

import {AiFillEdit,AiFillDelete} from 'react-icons/ai'

function Employee({employee, deleteEmployee, setEditEmployee}) {
  return (

    <div className='employee-item-container'>
        <div className='employee-item-field'>
            {employee.name}
        </div>
        <div className='employee-item-field'>
            {employee.dob}
        </div>
        <div className='employee-item-field'>
            {employee.role}
        </div>
        <div className={`employee-item-field ${employee?.active? 'active' : 'inactive'}`}>
            {employee.active? 'ACTIVE':'INACTIVE'}
        </div>
        <div className='employee-item-field'>
            <span className='employee-item-field-edit' onClick={() => setEditEmployee(employee)}>
                <AiFillEdit color = 'rgb(102, 102, 153)' fontSize= '1.5em'/>
            </span>
            <span className='employee-item-field-delete' onClick={() => deleteEmployee(employee._id)}>
                <AiFillDelete color = 'rgb(255, 80, 80)' fontSize= '1.5em'/>
            </span>           
        </div>
        
    </div>
  )
}

export default Employee