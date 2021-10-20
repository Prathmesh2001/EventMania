import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Payment() {

    const [theEvent, setTheEvent] = useState("")

    const { id } = useParams();


    useEffect(() => {
        const getTheEvent = async () => {
            const theData = await axios.get(`http://127.0.0.1:8000/api/event/${id}`);
            console.log(theData['data']);
            setTheEvent(theData['data']);

        }
        getTheEvent();
    }, [id])

    const [seats, setSeats] = useState(1);
   
    
    const increment=()=>{
        setSeats(seats+1)
    }
    const decrement=()=>{
        setSeats(seats===1?seats:seats-1)
        
    }

    const handlePay=()=>{
        alert("Payment Success. Ticket Booked!!!",theEvent)
    }

    return (
        <div className="container">

            <Link className="btn btn-primary mt-3 ms-5" to={'/' + theEvent['EventId']}>Go Back</Link>
            <div className="payment-section">

                <div className="card p-3 rounded mb-3 horizontal-card">
                    <div className="">
                        <img src={'http://127.0.0.1:8000/api' + theEvent['EventPhotoName']} alt={theEvent.EventPhotoName} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{theEvent['EventName']}</h5>
                        <p>Cost per person: INR {theEvent['EventCost']}</p>
                        <div className="quantity">
                            <i className="fa fa-minus" onClick={decrement} aria-hidden="true"></i>
                                <input type="text" onChange={(e)=>console.log(e.target.value)} value={seats}/>
                            <i className="fa fa-plus" onClick={increment} aria-hidden="true"></i>
                        </div>
                        <p>Total Cost: {theEvent['EventCost']*seats} Rs</p>
                    </div>

                </div>

                {/* ### Payment ### */}
                <div className="card p-3 rounded">


                    <div className="info">
                        <label htmlFor="cardholdername">Name</label>
                        <input placeholder="e.g. Richard Bovell" id="cardholdername" type="text" />
                    </div>


                    <div className="info">
                        <label htmlFor="cardnumber">Card number</label>
                        <input id="cardnumber" type="text" pattern="[0-9]{16,19}" maxLength="19" placeholder="8888-8888-8888-8888" />
                    </div>


                    <div className="sensitive">

                        <div className="left">
                            <label htmlFor="expiry-date">Expiry</label>
                            <select id="expiry-date">
                                <option>MM</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <span> / </span>
                            <select id="expiry-date">
                                <option>YYYY</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                            </select>
                        </div>
                        <div className="right">
                            <label htmlFor="cvv">CVC/CVV</label>
                            <input type="text" maxLength="4" placeholder="123" />
                        </div>
                    </div>


                    <Link to={{pathname:"/Profile"}}>Profile<button className="paybtn btn btn-success form-control" onClick={handlePay} type="submit">Confirm and Pay</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Payment
