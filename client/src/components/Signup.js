import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Signup.css';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    Uname: '',
    Upasswd: '',
    Mid: '',
  });

  // let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Uname: credentials.Uname, Upasswd: credentials.Upasswd, Mid: credentials.Mid }),
      });
      const json = await response.json();

      if (json.error) {
        alert(json.error);
      } else {
        alert('User added successfully');
        // navigate('/home'); //redirect to a different page after successful addition
      }
    } catch (error) {
      console.error(error.message);
      alert('An error occurred while adding the user');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-form">
          <h2>Add User</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                name="Uname"
                value={credentials.Uname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="Upasswd"
                value={credentials.Upasswd}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Mess
              <select type="number" name="Mid" value={credentials.Mid} onChange={handleChange} required
              >
                <option value="" disabled >Select</option>
                <option value="1">South</option>
                <option value="2">North</option>
              </select>
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
