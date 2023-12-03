import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const StaffLogin = () => {
  const [credentials, setCredentials] = useState({ Uname: "", Upasswd: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/loginstaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Sname: credentials.Uname,
        Spasswd: credentials.Upasswd,
      }),
    });
    const json = await response.json();

    if (json.success) {
      console.log(json);
      localStorage.setItem("token", json.authtoken);
      // localStorage.setItem("user", json.data);
      localStorage.setItem("user", JSON.stringify(json.data));

      navigate("/vote");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="full-screen bg-login">
        <div className="login-container ">
          <div className="row justify-content-center">
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <h2 className="text-center my-4">STAFF  LOGIN</h2>
                <div className="md-3">
                  <label htmlFor="Uname" className="form-label">
                    {/* Username */}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={credentials.Uname}
                    onChange={onChange}
                    id="Uname"
                    name="Uname"
                    placeholder="Enter StaffID"
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="Upasswd" className="form-label">
                    {/* Password */}
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
                <div className="text-center my-3">
                  <button type="submit" className="btn btn-light my-3">
                    SUBMIT
                  </button>
                  <button type="button" className="btn btn-light my-3" onClick={()=>{navigate('/')}}>
                    STUDENT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffLogin;