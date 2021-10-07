import React from 'react'
import { Link } from 'react-router-dom'

function EventCards(props) {

    return (
        <>
                <div className="card">
                        <div className="img-container">
                            <img src={'http://127.0.0.1:8000/api'+props.photoName} alt={props.photoName} />
                        </div>
                            <div className="card-body">
                                <h5 className="card-title">{props['name']}</h5>
                                {/* <p className="card-text">{props.desc}</p> */}
                                <p className="card-text"><small className="text-muted">{props.eventdate} | {props.venue} | {props.cost}</small></p>
                                <Link  to={'/'+props.id} className="btn btn-primary">Book Now</Link>
                            </div>

                </div>
        </>
    )
}

export default EventCards
