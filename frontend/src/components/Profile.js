import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import imgg from "./images/default_user.png";
// import b_cam from './images/black_camera.svg'
// import w_cam from './images/white_camera.svg'
import edit_b from "./images/edit_b.svg";
import axios from 'axios'
// import Edit_prfl from "./Edit_prfl";

function Profile(props) {

    console.log(`http://127.0.0.1:8000/api/user/${props.u_id}`)
    const [ussr, setussr] = useState([])

    const [f_name, setf_name] = useState("")
    const [u_email, setu_email] = useState("")
    const [u_pass, setu_pass] = useState("")
    const [usr_img, setusrimg] = useState("")

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/${props.u_id}`, {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }
            
        })
        .then(resp => resp.json()).then(resp => setussr(resp)).then(error => console.log(error))
    }, [props.u_id])

    const handle_submit=()=>{
        console.log("hello world")
        console.log(props.u_id)
        console.log(f_name)
        console.log(u_email)
        console.log(u_pass)
        console.log(usr_img)
        var dict = {};
        dict['user_id'] = props.u_id
        if(f_name!=="") dict['full_name'] = f_name
        if(u_email!=="") dict['email'] = u_email
        if(u_pass!=="") dict['password'] = u_pass
        if(usr_img!=="") dict['UserPhotoName'] = usr_img
        fetch(`http://127.0.0.1:8000/api/user/${props.u_id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dict)
        })
        .then(
            response=>{
                console.log(response.data)
            }
        )
        // fetch(`http://127.0.0.1:8000/api/user/${props.u_id}`,{
        //     method:'PUT',
        //     headers:{
        //         'Accept':'application/json',
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         user_id:props.u_id,
        //         full_name:f_name,
        //         email:u_email,
        //         password:u_pass,
        //         UserPhotoName:usr_img

        //     })
        // })

        // let formfield = new FormData()
        // formfield.append('user_id', props.u_id)
        // formfield.append('full_name', f_name)
        // formfield.append('email', u_email)
        // formfield.append('password', u_pass)
        // if(usr_img !== null){
        //     formfield.append('UserPhotoName', usr_img, usr_img.name)
        // }
        // axios.put(`http://127.0.0.1:8000/api/user/${props.u_id}`,formfield)
        // .then(response=>{
        //     console.log(response.data);
        // })
    }

    const handleFileSelected=(e)=>{
        e.preventDefault();
        // setusrimg(e.target.files[0].name)
        
        let extension = e.target.files[0].name.split('.').pop();
        console.log(extension)
        setusrimg("user"+props.u_id+"."+extension)
        const formData = new FormData();
        formData.append(
            "myFile",
            e.target.files[0],
            e.target.files[0].name
        );

        fetch(`http://127.0.0.1:8000/api/user/SaveFile/${props.u_id}`,{
            method:'POST',
            body:formData
        })
        
    }

  return (
    <div>
        <div
        className="container-fluid bg-secondary text-light"
        style={{ height: "350px" }}
        >
            <div className="container bg-dark rounded-bottom w-75 position-relative" style = {{height: "80%"}}>
                <div className = "position-absolute top-0 start-0 m-5" >
                <img src={ussr.UserPhotoName?'http://127.0.0.1:8000/api/media/'+ussr.UserPhotoName:imgg} className="rounded-circle mx-auto d-block" alt="..." />
                </div>
                <button type="button" className="position-absolute btn btn-light m-1 p-1 top-0 end-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <img src={edit_b} className="ms-0 me-1" alt="..." />
                    Edit Profile
                </button>
                <div className="position-absolute top-50 start-50 translate-middle w-50">
                <h1 className="font-monospace fw-normal">{ussr.full_name?ussr.full_name:"Anonymous"+props.u_id}</h1>

                <div className="row">
                    <div className="col-sm-4">6 Events</div>
                </div>
                </div>
            </div>
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
                        <div className = "top-0 start-50 m-2" >
                            <img src={imgg} className="rounded-circle mx-auto d-block w-25 " alt="..." />
                        </div>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="inputname3"  className="form-label">Full Name</label>
                                <input type="text" placeholder = {ussr.full_name?ussr.full_name:"Anonymous"+props.u_id} value = {f_name} onChange={e=>setf_name(e.target.value)} className="form-control" id="inputname3"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputEmail3"  className="form-label">Email</label>
                                <input type="email" placeholder = {ussr.email?ussr.email:"Email"} value = {u_email} onChange={e=>setu_email(e.target.value)} className="form-control" id="inputEmail3"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputGroupFile01"  className="form-label" >Profile Image</label>
                                <input type="file" className="form-control" onChange = {handleFileSelected} id="inputGroupFile01"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPassword1"   className="form-label">Password</label>
                                <input type="password" value = {u_pass} onChange={e=>setu_pass(e.target.value)} className="form-control" id="inputPassword1"/>
                            </div>
                            
                            <button type="submit" className="btn btn-primary" onClick = {handle_submit}>Update Changes</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="container bg-dark rounded w-75" style = {{transform: "translateY(-100%)"}}>
            <h1 className = "text-center text-light p-1"> Events-History </h1>
        </div>
    </div>
  );
}
// https://source.unsplash.com/200x200/?face
export default Profile;
