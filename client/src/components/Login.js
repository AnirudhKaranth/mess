import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ Uname: '', Upasswd: '' });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Uname: credentials.Uname, Upasswd: credentials.Upasswd }),
    });
    const json = await response.json();

    if (json.success) {
      console.log(json);
      localStorage.setItem('token', json.authtoken);
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Login</h2>
            <div className="mb-3">
              <label htmlFor="Uname" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={credentials.Uname}
                onChange={onChange}
                id="Uname"
                name="Uname"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Upasswd" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={credentials.Upasswd}
                onChange={onChange}
                name="Upasswd"
                id="Upasswd"
                placeholder="Enter your password"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;

