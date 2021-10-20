import React from 'react'
import { Link } from 'react-router-dom'

function EventCards(props) {

    let dateObj = new Date(props.eventdate);
    let month = dateObj.getMonth();
    let date = dateObj.getDate();
    let year = dateObj.getFullYear();
    let combinedDate = date + "/" + month + "/" + year;
    let hours = dateObj.getHours();
    let mins = dateObj.getMinutes();
    let time = hours + ":" + mins;

    return (
        <>
            <div className="event-card">
                <div className="card">
                    <Link to={'/' + props.id}>
                        <div className="img-container">
                            <img src={'http://127.0.0.1:8000/api/media/' + props.photoName} alt={props.photoName} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{props['name']}</h5>
                            {/* <p className="card-text">{props.desc}</p> */}
                            <p className="card-text"><small className="text-muted">{props.venue}<br />{combinedDate} at {time}</small></p>

                            {/* <Link  to={'/'+props.id} className="btn btn-primary">Book Now</Link> */}
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default EventCards
