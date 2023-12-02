import React from "react";

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
      <nav className="navbar navbar-expand-lg" style={{backgroundColor: 'lightgray'}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/vote">
            Hostel Mess
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/vote" ? "active" : ""}`} to="/vote">Vote</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/menu" ? "active" : ""}`} to="/menu">Menu</Link>
              </li>
              
            </ul>
            {/* <form className="d-flex" role="search"> */}
            {/* <Link className="btn btn-primary mx-2" to="/login" >Logout</Link> */}
            <Link className={`mx-2 nav-link ${location.pathname === "/editmenu" ? "active" : ""}`} to="/editmenu" >EditMenu</Link>
            <Link className={`mx-2 nav-link ${location.pathname === "/signup" ? "active" : ""}`} to="/signup" >Signup</Link>
            <Link className={`mx-1 nav-link ${location.pathname === "/account" ? "active" : ""}`} to="/account" >Account</Link>
            {/* </form> */}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
