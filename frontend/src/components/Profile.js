import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import imgg from "./images/default_user.png";
// import b_cam from './images/black_camera.svg'
// import w_cam from './images/white_camera.svg'
// import edit_b from "./images/edit_b.svg";
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom";
// import axios from 'axios'
// import Edit_prfl from "./Edit_prfl";

function Profile(props) {

    
    
    
    props.handle_token()
    
    const [ussr, setussr] = useState([])
    const [ flag, setflag ] = useState(true)
    const [f_name, setf_name] = useState("")
    const [u_email, setu_email] = useState("")
    const [u_pass, setu_pass] = useState("")
    const [usr_img, setusrimg] = useState("")
    

    useEffect(() => {
        if(!localStorage.getItem('access_t')){
            return;
        }
        const fun = async ()=>{
            await props.handle_token();
            console.log("hello bro")
            fetch(`http://127.0.0.1:8000/api/user/${props.cred_dict['u_id']}`, {
                method: 'GET',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_t')
                }
                
            })
            .then(resp => resp.json()).then(resp => setussr(resp)).then(error => console.log(error))
        }
        fun()
    }, [flag, props])
    
    
    if(!localStorage.getItem('access_t')){
        return <Redirect to = "/"/>
    }
    
    
    const handle_submit= async ()=>{
        await props.handle_token()
        console.log("hello world")
        console.log(props.cred_dict['u_id'])
        console.log(f_name)
        console.log(u_email)
        console.log(u_pass)
        console.log(usr_img)
        var dict = {};
        dict['id'] = props.cred_dict['u_id']
        if(f_name!=="") dict['full_name'] = f_name
        if(u_email!=="") dict['email'] = u_email
        if(u_pass!=="") dict['password'] = u_pass
        if(usr_img!=="") dict['UserPhotoName'] = usr_img
        fetch(`http://127.0.0.1:8000/api/user/${props.cred_dict['u_id']}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_t')
            },
            
            body:JSON.stringify(dict)
        })
        .then(resp => resp.json())
        .then(
            resp=>{
                console.log(resp)
                setflag((flag === true)?false:true)
            }
        ).then(error => console.log(error))
    }

    const handleFileSelected=(e)=>{
        e.preventDefault();
        
        let extension = e.target.files[0].name.split('.').pop();
        console.log(extension)
        setusrimg("user"+props.cred_dict['u_id']+"."+extension)
        const formData = new FormData();
        formData.append(
            "myFile",
            e.target.files[0],
            e.target.files[0].name
        );

        fetch(`http://127.0.0.1:8000/api/user/SaveFile/${props.cred_dict['u_id']}`,{
            method:'POST',
            body:formData
        })

    }

    const TicketDetails = props.location
    console.log("print",TicketDetails);

    return (
        <div className="user-page">
            <div className="container-fluid bg-secondary text-light pt-3">
                {/* <div className="container bg-dark rounded-bottom w-75" style={{ height: "80%" }}> */}
                <div className="container profile-container bg-dark mb-3 py-3">
                    <div className="edit-and-pic">

                        <div className="profile-pic" >
                            <img src={ussr.UserPhotoName ? 'http://127.0.0.1:8000/api/media/' + ussr.UserPhotoName : imgg} alt="profile pic" />
                        </div>
                        <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            {/* <img src={edit_b} className="" alt="edit icon" /> */}
                            Edit Profile
                        </button>
                    </div>
                    <div>
                        <h1 className="font-monospace fw-normal">{ussr.full_name ? ussr.full_name : "Anonymous" + props.cred_dict['u_id']}</h1>

                        <div className="row">
                            <div className="col-sm-4">6 Events</div>
                        </div>
                    </div>
                </div>
                <div className="container bg-dark rounded">
                    <h1 className="text-center text-light py-2"> Events-History </h1>
                </div>
                {/* </div> */}
            </div>
            {/* // modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="center-object" >
                                <div className="profile-pic">

                                    {/* <img src={imgg} className="rounded-circle mx-auto d-block w-25 " alt="..." /> */}
                                    <img src={ussr.UserPhotoName ? 'http://127.0.0.1:8000/api/media/' + ussr.UserPhotoName : imgg} alt="profile pic" />
                                </div>

                            </div>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="inputname3" className="form-label">Full Name</label>
                                    <input type="text" placeholder={ussr.full_name ? ussr.full_name : "Anonymous" + props.cred_dict['u_id']} value={f_name} onChange={e => setf_name(e.target.value)} className="form-control" id="inputname3" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail3" className="form-label">Email</label>
                                    <input type="email" placeholder={ussr.email ? ussr.email : "Email"} value={u_email} onChange={e => setu_email(e.target.value)} className="form-control" id="inputEmail3" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputGroupFile01" className="form-label" >Profile Image</label>
                                    <input type="file" className="form-control" onChange={handleFileSelected} id="inputGroupFile01" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                                    <input type="password" value={u_pass} onChange={e => setu_pass(e.target.value)} className="form-control" id="inputPassword1" />
                                </div>

                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick = {handle_submit}>Update Changes</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
            {/* modal end */}

            <div className="container p-1 my-5">
                <table>
                    <thead>
                        <tr>
                            <td>Sr No</td>
                            <td>Event Name</td>
                            <td>Event Date</td>
                            <td>Event Cost Paid</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Stand Up</td>
                            <td>1/1/2022</td>
                            <td>1000 Rs</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Stand Up</td>
                            <td>1/1/2022</td>
                            <td>1000 Rs</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Stand Up</td>
                            <td>1/1/2022</td>
                            <td>1000 Rs</td>
                        </tr>
                        {/* <tr>
                            <td>{props.location.state}</td>
                            <td>{props.location.state}</td>
                            <td>{props.location.state}</td>
                            <td>{props.location.state}</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
// https://source.unsplash.com/200x200/?face
export default Profile;
        

Profile.prototype = {
    cred_dict : PropTypes.object.isRequired,
    handle_token : PropTypes.func.isRequired,
}
