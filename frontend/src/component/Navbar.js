import React from "react";
import PropTypes from "prop-types";
import {Link, Outlet} from "react-router-dom";

export default function Navbar(props) {
  return (
    <>
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-3 mb-lg-0 mx-2">
            <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" to='/allCodes'>CODES</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" to='/login'>LOGIN</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" to='/register'>REGISTER</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" to='/contact'>CONTACT US</Link>
            </li>
          </ul>
          <div
            className={`form-check form-switch mx-4 text-${props.mode==="light"?"dark":"light"} `}
            style={{right: 8,position: 'fixed'}}
            >
            
            <input
              className="form-check-input"
              type="checkbox"
              onClick={props.toggleMode}
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label htmlFor="flexSwitchCheckDefault" className={`form-check-label text-light`}>
              Dark Mode
            </label>
          </div>
        </div>
      </div>
    </nav>
    <Outlet/>
    </>
  );
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string,
};
Navbar.defaultProps = {
  title: "MyCodeExecuter",
  mode: "light",
};
