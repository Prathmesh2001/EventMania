import React, { useState } from 'react'
// import axios from 'axios'
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'

export default function LogIn(props) {

    const history = useHistory();
    if(!props.cred_dict['authflag']){
        history.push(``)
    }

    const [email, setemail] = useState('')
    const [password, setpass] = useState("")
    // const [signInfo, setsignInfo] = useState({
    //     email: '',
    //     password: '',
    // })


    const checkuser = async () => {
        var cred = {};
        cred['email'] = email;
        cred['password'] = password;
        console.log(cred)
        let r_data = await props.handle_login(cred)
        console.log(r_data)
        return history.push(`home`);
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="signinemail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="signinemail" placeholder="Enter email" value={email} onChange={e => setemail(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="signinpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="signinpassword" placeholder="Enter password" value={password} onChange={e => setpass(e.target.value)} required/>
                </div>
                <button type="button" className="btn btn-success form-control logbtn" onClick={checkuser} data-bs-dismiss="modal">Submit</button>
            </form>
        </div>
    )
}

LogIn.prototype = {
    cred_dict: PropTypes.object.isRequired,
    handle_login: PropTypes.func.isRequired,
    
};