import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LogIn from "./LogIn";
import Register from "./Register";


export default function Navbar(props) {
  const [entry, setentry] = useState("LogIn");
  const [ussr, setussr] = useState([])

  const showSignIn = () => {
    setentry("LogIn");
  };

  const showRegister = () => {
    setentry("Register");
  };

  const logged_out_nav = (
    <button
      className="btn btn-outline-warning"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Login
    </button>
  );

  const logged_in_nav = (
    <>
      {ussr['is_staff'] ? <Link to="/addevent"><li className="btn btn-outline-warning mx-3" > Add event</li></Link> : <></>}
      <Link to="/Profile"><li  className="btn btn-outline-warning mx-2" >
        User profile
      </li></Link>
      <li className="btn btn-outline-warning mx-2" onClick={props.handle_logout}>
        logout
      </li>
    </>
  );

  useEffect(() => {
    if (!localStorage.getItem('access_t')) {
      return;
    }
    console.log("hello")
    const fun = async () => {
      await props.handle_token();
      fetch(`http://127.0.0.1:8000/api/user/${props.cred_dict['u_id']}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_t')
        }

      })
        .then(resp => resp.json())
        .then(resp => {
          setussr(resp)
          console.log(resp.data)
        })
        .then(error => console.log(error))
    }
    fun()
    // console.log(ussr)
  }, [props])


  return (
    <nav className="px-5 navbar navbar-expand-lg navbar-dark bg-dark0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}<div className="logo-underline"></div>
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
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-warning mx-3" aria-current="page" to="/home">
                Home 
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li> */}
          </ul>

          {/* {props.cred_dict['authflag']&&ussr['is_staff'] ? <Link className="btn btn-primary mx-3" to="/addevent">Add event</Link> : <></>} */}
          {/* <!-- Button trigger modal --> */}

          <div>
            {props.cred_dict['authflag'] ? logged_in_nav : logged_out_nav}
          </div>
          {/* <button
            className="btn btn-outline-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Login
          </button>
          
          <Link className="btn btn-outline-success mx-2 text-success" to="/Profile">
                User profile
          </Link>
          </Link> */}

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-center">
                  <div className="row" style={{ width: 500 }}>
                    <button
                      className="btn btn-dark shadow-none authBtn col-6"
                      onClick={showSignIn}
                    >
                      Sign In
                    </button>
                    <button
                      className="btn btn-dark shadow-none authBtn col-6"
                      onClick={showRegister}
                    >
                      Register
                    </button>
                  </div>
                </div>

                <div className="modal-body p-4">
                  {entry === "LogIn" ? <LogIn handle_login={props.handle_login} cred_dict={props.cred_dict} /> : <Register handle_login={props.handle_login} cred_dict={props.cred_dict} />}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.prototype = {
  title: PropTypes.string.isRequired,
  handle_login: PropTypes.func.isRequired,
  cred_dict: PropTypes.object.isRequired
};

Navbar.defaultProps = {
  title: Navbar
};
