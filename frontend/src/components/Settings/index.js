import React, { useState } from 'react';
import './style.css';
const Settings = ({userId, userName, userLastName, userEmail, userPassword}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); 
  const [user_Password, setPassword] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const editUser = async (userId, firstName, lastName, email, password) => {
    const response = await fetch(`http://127.0.0.1:8000/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstName, lastName, email, password}),
    });  
    return await response.json();
};
const handleEditUser = async (e) => {
  e.preventDefault();
  // TODO: Handle deposit form submissiona
  try {
    const response = await editUser(userId, firstName, lastName, email, user_Password);
    console.log(response);
    setEditPopup(false);
  } catch (error) {
    console.error(error);
    // Show an error message to the user if necessary
  }
};

  const deleteUser = async (userId) => {
    const response = await fetch(`http://127.0.0.1:8000/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });  
    return await response.json();
};

const handleDeleteUser = async (e) => {
  e.preventDefault();
  // TODO: Handle deposit form submissiona
  try {
    const response = await deleteUser(userId);
    console.log(response);
    setDeleteUserPopup(false);
    window.location.reload(false);
  } catch (error) {
    console.error(error);
    // Show an error message to the user if necessary
  }
};

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const password = showPassword ? userPassword : "*".repeat(userPassword.length);


  const [showEditPopup, setEditPopup] = useState(false);
  const [showDeleteUserPopup, setDeleteUserPopup] = useState(false);





  return (
    <section>
      <div>
        <p>First Name: {userName}</p>
        <p>Last Name: {userLastName}</p>
        <p>Email: {userEmail}</p>
        <div>
          <p>Password: {password}</p>
          <button onClick={toggleShowPassword}>
            {showPassword ? "Hide Password" : "View Password"}
          </button>
        </div>
        <div>
        <button onClick={() => setEditPopup(true)}>Edit Details</button>
          <button onClick={() => setDeleteUserPopup(true)}>Delete User</button>
        </div>
      </div>

      {showEditPopup && (
        <div className="editScreen">
          <div className="test">
            <form onSubmit={handleEditUser}>
              <p>Edit Details Pop Up</p>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" onChange={handleFirstNameChange} required/>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" onChange={handleLastNameChange} required/>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" onChange={handleEmailChange} required/>
              <label htmlFor="password">Password:</label>
              <input type="text" id="password" name="password" onChange={handlePasswordChange} required/>
              <button type="submit">Confirm Edit</button>
              <button type="button" onClick={() => setEditPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {showDeleteUserPopup && (
        <div className="editScreen">
          <div className="test">
            <form onSubmit={handleDeleteUser}>
              <p>Confirm Account Deletion</p>
              <p>All account details and information will be lost.</p>
              <button type="submit">Delete Account</button>
              <button type="button" onClick={() => setDeleteUserPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Settings;