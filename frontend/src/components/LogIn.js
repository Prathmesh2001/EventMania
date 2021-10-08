import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

export default function LogIn() {

    const [signInfo, setsignInfo] = useState({
        email: '',
        password: '',
    })

    const history = useHistory();

    const checkuser = () => {
        if (signInfo.email !== '' && signInfo.password !== '') {
            axios.get(`http://127.0.0.1:8000/api/retrieve/${signInfo.email}`)
            .then((res) => {
                if (res.data['msg'] !== 'invalid_user') {
                    if (signInfo.password === res.data.password) {
                        let path = `home`;
                        history.push(path);
                    }
                    else {
                        let path = '';
                        history.push(path);
                    }
                }
                else {
                    let path = '';
                    history.push(path);
                }
            })
        }
        setsignInfo({
            email: '',
            password: '',
        })
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="signinemail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="signinemail" value={signInfo.email} onChange={e => setsignInfo({ email: e.target.value, password: signInfo.password })} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="signinpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="signinpassword" value={signInfo.password} onChange={e => setsignInfo({ email: signInfo.email, password: e.target.value })} required/>
                </div>
                <button type="button" className="btn btn-success" onClick={checkuser} data-bs-dismiss='modal'>Submit</button>
            </form>
        </div>
    )
}
