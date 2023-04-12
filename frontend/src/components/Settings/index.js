import React, { useState } from 'react';
import './style.css';
const Settings = ({userName, userLastName, userEmail, userPassword}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const password = showPassword ? userPassword : "*".repeat(userPassword.length);


  const [showEditPopup, setEditPopup] = useState(false);
  const [showDeleteUserPopup, setDeleteUserPopup] = useState(false);

  const handleEditSubmit = (event) => {
    event.preventDefault();
    // handle form submit logic here
    setEditPopup(false);
  }

  const handleDeleteUser = (event) => {
    //delete user from the database
  }

  return (
    <section>
      <div>
        <p>This is where the settings will go</p>
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
            <form onSubmit={handleEditSubmit}>
              <p>Edit Details Pop Up</p>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" defaultValue={userName} />
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" defaultValue={userLastName} />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" defaultValue={userEmail} />
              <label htmlFor="password">Password:</label>
              <input type="text" id="password" name="password" defaultValue={userPassword} />
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