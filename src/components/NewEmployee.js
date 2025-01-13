import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewEmployee from './ViewEmployee';

const NewEmployee = () =>{

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [empNo, setEmpNo] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      first_name: firstName,
      last_name: lastName,
      designation: designation,
      emp_no: empNo,
    };

    try {
        const response = await fetch(`${appLocalizer.apiUrl}/wprk/v1/add_employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': appLocalizer.nonce,
        },
        body: JSON.stringify(employeeData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage('Employee added successfully!');
        setFirstName('');
        setLastName('');
        setDesignation('');
        setEmpNo('');
      } else {
       
      }
      } catch (error) {
        setResponseMessage(`Request failed: ${error.message}`);
      }
  };

  return (
    <div>
      <h2>Add New Employee</h2> 
     {/*  <Link to="/ViewEmployee">View Employee</Link> */}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input  type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div>
          <label>Designation:</label>
          <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required/>
        </div>
        <div>
          <label>Employee Number:</label>
          <input type="number" value={empNo} onChange={(e) => setEmpNo(e.target.value)} required />
        </div>
        <button type="submit">Add Employee</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );

  /*  return (
       <div>
         <div class="row"> <div class="col-6"> <h2>Add New Employee</h2> </div> <div class="col-6"> Back </div> </div>

            <div class="container">
            <div class="row">
                <div class="col-sm-4">First Name </div>
                <div class="col-sm-8"> <input type="text" name="firstname" id="firstname" placeholder='First Name'/> </div>     
            </div>
            <div class="row">
                <div class="col-sm-4">Last Name </div>
                <div class="col-sm-8"> <input type="text" name="lastname" id="lastname" placeholder='Last Name'/> </div>     
            </div>
            <div class="row">
                <div class="col-sm-4">Designation</div>
                <div class="col-sm-8"> 
                <select name="Designation" id="Designation">
                    <option selected>--Select--</option>
                    <option value="sr.wp developer">Senior WordPress Developer</option>
                    <option value="UI/UX">UI/UX Designer</option>
                    <option value="Software">Software Developer</option>
                </select>

                </div>     
            </div>
            <div class="row">
                <div class="col-sm-4">Employee No:</div>
                <div class="col-sm-8"> <input type="text" name="empNo" id="empNo" placeholder='Last Name'/> </div>     
            </div>
            <div class="row">
                <div class="col-sm-4"><button type="submit" name="submit" id="submit">Submit</button></div>
                <div class="col-sm-8"> </div>     
            </div>
            </div> 
       </div>
   ); */
}

export default NewEmployee;