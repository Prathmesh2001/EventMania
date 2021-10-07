import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

export default function Register() {
    const [regInputs, setregInputs] = useState({
        full_name: '',
        email: '',
        password: '',
    })

    const history = useHistory();

    const registerUser=()=>{
        if(regInputs.full_name!==''&&regInputs.email!==''&&regInputs.password!=='')
        {
            axios.get(`http://127.0.0.1:8000/api/retrieve/${regInputs.email}`)
            .then((res) => {
                if (res.data['msg'] === 'invalid_user') {
                    axios.post('http://127.0.0.1:8000/api/create/',regInputs)
                    .then((res)=>{
                        setregInputs({
                            full_name:'',
                            email:'',
                            password:''
                        })
                    })
                    let path = `home`;
                    history.push(path);
                }
                else {
                    console.log("already a user")
                    let path = ``;
                    history.push(path);
                }
                
            })
            
        }
        setregInputs({
            full_name:'',
            email:'',
            password:''
        })
        
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full name</label>
                    <input type="text" className="form-control" id="fullname" value={regInputs.name} onChange={e=>setregInputs({full_name:e.target.value,email:regInputs.email,password:regInputs.password})} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={regInputs.email} onChange={e=>setregInputs({full_name:regInputs.full_name,email:e.target.value,password:regInputs.password})} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="password" value={regInputs.password} onChange={e=>setregInputs({full_name:regInputs.full_name,email:regInputs.email,password:e.target.value})} required/>
                </div>
                <button type="button" className="btn btn-success" onClick={registerUser} data-bs-dismiss='modal'>Submit</button>
            </form>
        </div>
    )
}
