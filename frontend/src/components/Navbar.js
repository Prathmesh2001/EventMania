import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LogIn from './LogIn'
import Register from './Register'

export default function Navbar(props) {

  const [entry, setentry] = useState("LogIn");
  const showSignIn = () => {
    setentry("LogIn")
  }

  const showRegister = () => {
    setentry("Register")
  }

  return (
    <nav className="px-5 navbar navbar-expand-lg navbar-dark bg-dark0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>


          {/* <!-- Button trigger modal --> */}
          <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Login</button>

          {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
              <div className="modal-content">
                <div className="modal-header py-4">
                  <div className="column" style={{width:500}}>
                    <button className="btn btn-outline-secondary mx-2" onClick={showSignIn}>Sign In</button>
                    <button className="btn btn-outline-secondary mx-5" onClick={showRegister}>Register</button>
                  </div>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">
                  {entry === "LogIn" ? <LogIn /> : <Register />}
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}

Navbar.prototype = {
  title: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
  title: Navbar
}