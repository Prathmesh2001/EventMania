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

    // ########## user details ############
    const [ussr, setussr] = useState([])
    const [flag, setflag] = useState(true)
    const [f_name, setf_name] = useState("")
    const [u_email, setu_email] = useState("")
    const [u_pass, setu_pass] = useState("")
    const [usr_img, setusrimg] = useState("")



    // ########## event history ###########
    const [myHistory, setHistory] = useState([])

    const [myEvent, setEvent] = useState([])



    // ###### data fetch ################
    useEffect(() => {
        if (!localStorage.getItem('access_t')) {
            return;
        }
        const fun = async () => {
            await props.handle_token();
            console.log("hello bro")
            fetch(`http://127.0.0.1:8000/api/user/${props.cred_dict['u_id']}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_t')
                }

            })
                .then(resp => resp.json()).then(resp => setussr(resp)).then(error => console.log(error))


            // ######### history fetch ##########
            fetch(`http://127.0.0.1:8000/api/${props.cred_dict['u_id']}/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(resp => resp.json()).then(resp => setHistory(resp)).then(error => console.log(error))


            // ######### events fetch ##########
            fetch('http://127.0.0.1:8000/api/event', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(resp => resp.json()).then(resp => setEvent(resp)).then(error => console.log(error))

        }
        fun()
    }, [flag, props])


    if (!localStorage.getItem('access_t')) {
        return <Redirect to="/" />
    }

    // ########### function on edit profile ###########
    const handle_submit = async () => {
        await props.handle_token()
        console.log("hello world")
        console.log(props.cred_dict['u_id'])
        console.log(f_name)
        console.log(u_email)
        console.log(u_pass)
        console.log(usr_img)
        var dict = {};
        dict['id'] = props.cred_dict['u_id']
        if (f_name !== "") dict['full_name'] = f_name
        if (u_email !== "") dict['email'] = u_email
        if (u_pass !== "") dict['password'] = u_pass
        if (usr_img !== "") dict['UserPhotoName'] = usr_img
        fetch(`http://127.0.0.1:8000/api/user/${props.cred_dict['u_id']}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_t')
            },

            body: JSON.stringify(dict)
        })
            .then(resp => resp.json())
            .then(
                resp => {
                    console.log(resp)
                    setflag((flag === true) ? false : true)
                }
            ).then(error => console.log(error))
    }


    // ########### image file updating ###########
    const handleFileSelected = (e) => {
        e.preventDefault();

        let extension = e.target.files[0].name.split('.').pop();
        console.log(extension)
        setusrimg("user" + props.cred_dict['u_id'] + "." + extension)
        const formData = new FormData();
        formData.append(
            "myFile",
            e.target.files[0],
            e.target.files[0].name
        );

        fetch(`http://127.0.0.1:8000/api/user/SaveFile/${props.cred_dict['u_id']}`, {
            method: 'POST',
            body: formData
        })

    }


    return (
        <div className="user-page bg-secon">
            <div className="container-fluid bg-secondary text-light pt-3">

                <div className="container profile-container bg-dark mb-3 py-3">
                    <div className="edit-and-pic">

                        <div className="profile-pic" >
                            <img src={ussr.UserPhotoName ? 'http://127.0.0.1:8000/api/media/' + ussr.UserPhotoName : imgg} alt="profile pic" />
                        </div>
                        <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Edit Profile
                        </button>
                    </div>
                    <div>
                        <h1 className="font-monospace fw-normal myBorder">{ussr.full_name ? ussr.full_name : "Anonymous" + props.cred_dict['u_id']}</h1>

                        <div className="row">
                            <div className="col-sm-4">{myHistory.length} Events</div>
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
                                {/* <div className="mb-3">
                                    <label htmlFor="inputEmail3" className="form-label">Email</label>
                                    <input type="email" placeholder={ussr.email ? ussr.email : "Email"} value={u_email} onChange={e => setu_email(e.target.value)} className="form-control" id="inputEmail3" />
                                </div> */}
                                <div className="mb-3">
                                    <label htmlFor="inputGroupFile01" className="form-label" >Profile Image</label>
                                    <input type="file" className="form-control" onChange={handleFileSelected} id="inputGroupFile01" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                                    <input type="password" value={u_pass} onChange={e => setu_pass(e.target.value)} className="form-control" id="inputPassword1" />
                                </div>

                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={handle_submit}>Update Changes</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            {/* modal end */}


                <div className="container p-1 py-5">
                    <table>
                        <thead>
                            <tr>
                                <td>Sr No</td>
                                <td>Event Name</td>
                                <td>Event Date</td>
                                <td>Event Time</td>
                                <td>Seats</td>
                                <td>Cost Paid</td>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                myHistory.map((oneElem, index) => {
                                    let eventName, totalCost, eventDate, eventTime;
                                    for (let i of Object.values(myEvent)) {
                                        console.log(i, oneElem['EventId'])
                                        if (i['EventId'] === oneElem['EventId']) {
                                            console.log("Match")
                                            eventName = i['EventName']
                                            totalCost = (oneElem.Seats) * (i['EventCost'])
                                            let dateObj = new Date(i['DateOfEvent'])
                                            let date = dateObj.getDate()
                                            let month = dateObj.getMonth()
                                            let year = dateObj.getFullYear()
                                            let hours = dateObj.getHours()
                                            let minutes = dateObj.getMinutes()
                                            let suffix;
                                            if (hours >= 12) {
                                                suffix = "P.M."
                                                if (hours > 12) {
                                                    hours -= 12
                                                }
                                            }
                                            else {
                                                suffix = "A.M."
                                                if (hours === 0) {
                                                    hours = 12
                                                }
                                            }

                                            eventDate = date + "/" + month + "/" + year
                                            eventTime = hours + ":" + minutes + " " + suffix
                                        }
                                    }
                                    return (
                                        <tr key={oneElem.HistoryId}>
                                            <td>{index + 1}</td>
                                            <td>{eventName}</td>
                                            <td>{eventDate}</td>
                                            <td>{eventTime}</td>
                                            <td>{oneElem.Seats}</td>
                                            <td>{totalCost}</td>
                                        </tr>
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>

            
        </div>
    );
}
// https://source.unsplash.com/200x200/?face
export default Profile;


Profile.prototype = {
    cred_dict: PropTypes.object.isRequired,
    handle_token: PropTypes.func.isRequired,
}
