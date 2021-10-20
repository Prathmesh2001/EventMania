import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'

function EventDetail() {

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

    if (theEvent !== '404') {
        return (
            <>
                <div className="center-object">

                <div className="my-container">
                    <Link className="btn btn-primary" to='/home'>Go Back</Link>
                    <div className="card my-5">
                        <div className="big-img-container">
                            <img src={'http://127.0.0.1:8000/api' + theEvent['EventPhotoName']} alt={theEvent.EventPhotoName} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{theEvent['EventName']}</h5>
                            <p className="card-text">{theEvent['EventDescription']}</p>
                            <p className="card-text"><small className="text-muted">{theEvent['DateOfEvent']} | {theEvent['EventVenue']}</small></p>
                            <p>Cost per person: INR {theEvent['EventCost']}</p>
                            <Link to={'/'+theEvent['EventId']+'/payment'} className="btn btn-primary">Checkout</Link>
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <h3 className='text-center' style={{ height: '70vh' }}>404</h3>
            </>
        )
    }

}

export default EventDetail
