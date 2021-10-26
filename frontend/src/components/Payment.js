import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Payment(props) {

    const [ussr, setussr] = useState([])
    const [theEvent, setTheEvent] = useState("")

    const { id } = useParams();
    const historyPath = useHistory();

    useEffect(() => {
        // ########## get event #########
        const getTheEvent = async () => {
            const theData = await axios.get(`http://127.0.0.1:8000/api/event/${id}`);
            console.log(theData['data']);
            setTheEvent(theData['data']);

        }
        getTheEvent();
        // ######### get user ###############
        fetch(`http://127.0.0.1:8000/api/user/${props.cred_dict['u_id']}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_t')
                }

            })
                .then(resp => resp.json()).then(resp => setussr(resp)).then(error => console.log(error))
    }, [id])

    const [seats, setSeats] = useState(1);


    const increment = () => {
        setSeats(seats + 1)
    }
    const decrement = () => {
        setSeats(seats === 1 ? seats : seats - 1)

    }

    const handlePay = async() => {
        let formField = {}

        formField['User']=ussr['id'];
        formField['EventId']=theEvent['EventId']
        formField['Seats']= seats
        console.log("POST",formField)
        await fetch(`http://127.0.0.1:8000/api/${props.cred_dict['u_id']}/history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formField)
        }).then((resp)=>{
            console.log(resp.data)
            alert("Payment Success. Ticket Booked!!! (Check your Profile to confirm)", theEvent)
            historyPath.push("/Profile");
        })

        
    }

    const fullHeight = {
        height: "100vh"
    }
    return (
        <div className="bg-secon" style={{ minHeight: fullHeight.height}}>

            <Link className="btn btn-prim mt-5 ms-5" to={'/' + theEvent['EventId']}><i class="fas fa-arrow-left"></i>  Back</Link>
            <div className="payment-section my-5">

                <div className="card p-2 rounded">
                    <div className="checkout-details  horizontal-card">
                        <div className="small-img">
                            <img src={'http://127.0.0.1:8000/api/media/' + theEvent['EventPhotoName']} alt={theEvent.EventPhotoName} />
                        </div>
                        <div className="card-body ms-3">
                            <h3 className="card-title myBorder">{theEvent['EventName']}</h3>
                            <p>Cost per person: INR {theEvent['EventCost']}</p>
                            <div className="quantity mb-4">
                                <i className="fa fa-minus" onClick={decrement} aria-hidden="true"></i>
                                <input type="text" onChange={(e) => console.log(e.target.value)} value={seats} />
                                <i className="fa fa-plus" onClick={increment} aria-hidden="true"></i>
                            </div>
                            <p className="total-cost"> <strong>Total Cost: {theEvent['EventCost'] * seats} Rs</strong> </p>
                        </div>
                    </div>
                    <button className="form-control btn btn-prim text-light my-3" onClick={handlePay} type="submit">Proceed to Pay</button>

                </div>

                
            </div>
        </div>
    )
}

export default Payment
