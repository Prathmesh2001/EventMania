import React, { useEffect, useState } from 'react'
import Carousel from './Carousel';
import EventCards from './EventCards';

function Home() {

    //event card api fetch
    const [myEvent, setEvent] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/event', {
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

                <Carousel/>
                
                <div className="trending-section text-center my-5">
                    <h3>Trending</h3>
                    <div className="all-events">
                        {
                            myEvent.map((oneElem) => {
                                console.log(oneElem.EventPhotoName)
                                return (
                                    <div key={oneElem.EventId}>
                                        <EventCards id={oneElem.EventId} photoName={oneElem['EventPhotoName']} name={oneElem['EventName']} desc={oneElem.EventDescription} eventdate={oneElem["DateOfEvent"]} venue={oneElem.EventVenue} cost={oneElem.EventCost} />
                                    </div>
                                )
                            }
                            )
                        }
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Home;