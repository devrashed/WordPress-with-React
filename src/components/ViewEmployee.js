/* import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEmployee = () =>{


   return (
       <div>
      <div class="row">   <div class="col-6"> <h2>User Information</h2> </div> <div class="col-6"> Add New Employee </div> </div>

      <div class="container">
         <div class="row row-cols-4">
            <div class="col">Column</div>
            <div class="col">Column</div>
            <div class="col">Column</div>
            <div class="col">Column</div>
         </div>
       </div>
      </div>
   );
}

export default ViewEmployee; */

/* import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${appLocalizer.apiUrl}/wprk/v1/get_employees`, {
          headers: {
            'X-WP-Nonce': appLocalizer.nonce,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${appLocalizer.apiUrl}/wprk/v1/delete/${id}`, {
        headers: {
          'X-WP-Nonce': appLocalizer.nonce,
        },
      });

      if (response.status === 200) {
        setEmployees(employees.filter((employee) => employee.id !== id));
        setResponseMessage('Employee deleted successfully!');
      } else {
        setResponseMessage('Failed to delete the employee.');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      setResponseMessage('An error occurred while deleting the employee.');
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Designation</th>
            <th>Employee Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.designation}</td>
              <td>{employee.emp_no}</td>
              <td>
            

              <span onClick={() => handleDelete(employee.id)} 
                  style={{ cursor: 'pointer', color: 'red', textDecoration: 'underline' }}
              >
                 Delete
               </span>  
                
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{responseMessage}</p>
    </div>
  );
};

export default ViewEmployee; */




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({
    first_name: '',
    last_name: '',
    designation: '',
    emp_no: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

    // Function to handle delete
    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`${appLocalizer.apiUrl}/wprk/v1/delete/${id}`, {
          headers: {
            'X-WP-Nonce': appLocalizer.nonce,
          },
        });

        if (response.status === 200) {
          setEmployees(employees.filter((employee) => employee.id !== id));
          setResponseMessage('Employee deleted successfully!');
        } else {
          setResponseMessage('Failed to delete the employee.');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        setResponseMessage('An error occurred while deleting the employee.');
      }
    };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${appLocalizer.apiUrl}/wprk/v1/get_employees`, {
        headers: {
          'X-WP-Nonce': appLocalizer.nonce,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee.id);
    setEditFormData({
      first_name: employee.first_name,
      last_name: employee.last_name,
      designation: employee.designation,
      emp_no: employee.emp_no
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleUpdate = async () => {
    //try {
      const response = await axios.put(`${appLocalizer.apiUrl}/wprk/v1/update/${selectedEmployee}`, editFormData, {
        headers: {
          'X-WP-Nonce': appLocalizer.nonce,
        },
      });
      

      if (response.status === 200) {
        setResponseMessage('Employee updated successfully!');
        setIsEditModalOpen(false);
        fetchEmployees(); // Refresh the list
      } else {
        setResponseMessage('Failed to update the employee.');
      }
    /* } catch (error) {
      console.error('Error updating employee:', error);
      setResponseMessage('An error occurred while updating the employee.');
    } */
  };

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Designation</th>
            <th>Employee Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.designation}</td>
              <td>{employee.emp_no}</td>
              <td>
                <span
                  onClick={() => handleEditClick(employee)}
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', marginRight: '10px' }}
                >
                  Edit
                </span>
                <span
                  onClick={() => handleDelete(employee.id)}
                  style={{ cursor: 'pointer', color: 'red', textDecoration: 'underline' }}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {responseMessage && <p>{responseMessage}</p>}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Employee</h3>
            <label>
              First Name:
              <input type="text" name="first_name" value={editFormData.first_name} onChange={handleInputChange} />
            </label>
            <label>
              Last Name:
              <input type="text" name="last_name" value={editFormData.last_name} onChange={handleInputChange} />
            </label>
            <label>
              Designation:
              <input type="text" name="designation" value={editFormData.designation} onChange={handleInputChange} />
            </label>
            <label>
              Employee Number:
              <input type="text" name="emp_no" value={editFormData.emp_no} onChange={handleInputChange} />
            </label>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Basic styling for modal */}
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
          max-width: 100%;
        }
        .modal-content label {
          display: block;
          margin: 10px 0;
        }
        .modal-content input {
          width: 100%;
          padding: 5px;
          margin-top: 5px;
        }
        .modal-content button {
          margin: 10px 5px 0 0;
          padding: 8px 12px;
        }
      `}</style>
    </div>
  );
};

export default ViewEmployee;
