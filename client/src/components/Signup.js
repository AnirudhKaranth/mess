import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Signup = () => {
  const [credentials, setCredentials] = useState({
    Uname: '',
    Upasswd: '',
    Mid: '',
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Uname: credentials.Uname, Upasswd: credentials.Upasswd, Mid: credentials.Mid}),
      });
      const json = await response.json();

      if (json.error) {
        alert(json.error);
      } else {
        alert('User added successfully');
        navigate('/home'); //redirect to a different page after successful addition
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Add User</h2>

            <div className="mb-3">
              <label htmlFor="Uname" className="form-label">
                {/* Username */}
              </label>
              <input
                type="text"
                className="form-control"
                value={credentials.Uname}
                onChange={handleChange}
                id="Uname"
                name="Uname"
                placeholder="Enter username"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Upasswd" className="form-label">
                {/* Password */}
              </label>
              <input
                type="password"
                className="form-control"
                value={credentials.Upasswd}
                onChange={handleChange}
                id="Upasswd"
                name="Upasswd"
                placeholder="Enter password"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Mid" className="form-label">
                {/* Mess ID */}
              </label>
              <input
                type="number"
                className="form-control"
                value={credentials.Mid}
                onChange={handleChange}
                id="Mid"
                name="Mid"
                placeholder="Enter Mess ID"
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
