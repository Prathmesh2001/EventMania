import React from 'react'

function EventCards(props) {

    return (
        <>
                <div className="card m-5">
                        <div className="img-container">
                            <img src={'http://127.0.0.1:8000'+props.photoName} alt={props.photoName} />
                        </div>
                            <div className="card-body">
                                <h5 className="card-title">{props.name}</h5>
                                <p className="card-text">{props.desc}</p>
                                <p className="card-text"><small className="text-muted">{props.eventdate} | {props.venue} | {props.cost}</small></p>
                                <button className="btn btn-primary">Book Now</button>
                            </div>
                        </div>
        </>
    )
}

export default EventCards
