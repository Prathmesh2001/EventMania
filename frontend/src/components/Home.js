import React, { useEffect, useState } from 'react'
import EventCards from './EventCards';

function Home() {

    //event card api fetch
    const [myEvent, setEvent] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/event', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(resp => resp.json()).then(resp => setEvent(resp)).then(error => console.log(error))
    }, [])
    // end event card api fetch

    return (
        <>
            <div className="home-container">

                <div className="carousel-container">
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://source.unsplash.com/1600x900/?entertainment" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/1400x900/?entertainment" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/1200x700/?entertainment" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button> */}
                        </div>
                    </div>
                </div> {/*carousel-container*/}

                <div className="my-container">
                    <h3>Trending</h3>
                    <div className="all-events">
                        {
                            myEvent.map((oneElem) => {
                                return (
                                    <div key={oneElem.EventId}>
                                        <EventCards photoName={oneElem.EventPhotoName} name={oneElem.EventName} desc={oneElem.EventDescription} eventdate={oneElem["DateOfEvent"]} venue={oneElem.EventVenue} cost={oneElem.EventCost} />
                                    </div>
                                )
                            }
                            )
                        }

                        {/* <EventCards/>
                        <EventCards/> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;