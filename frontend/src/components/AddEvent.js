import React,{useState} from 'react'
import axios from 'axios'

export default function AddEvent() {

    const [EventName, setEventName] = useState('')
    const [EventDescription, setEventDescription] = useState('')
    const [Date1, setDate1] = useState('')
    const [Time, setTime] = useState('')
    const [EventVenue, setEventVenue] = useState('')
    const [EventCost, setEventCost] = useState('')
    const [EventPhotoName, setEventPhotoName] = useState(null)
    
    const createEvent=async()=>{
        console.log(EventName)
        console.log(EventDescription)
        console.log(new Date(Date1+" "+Time+':00'))
        console.log(Time)
        console.log(EventVenue)
        console.log(EventCost)
        console.log(EventPhotoName.name)

        // const formField=new FormData()
        // formField.append('EventName',EventName)
        // formField.append('EventDescription',EventDescription)
        // formField.append('DateOfEvent',new Date(Date1+" "+Time+':00'))
        // formField.append('EventVenue',EventVenue)
        // formField.append('EventCost',EventCost)
        // formField.append('EventPhotoName',EventPhotoName.name)

        let data={
            EventName:EventName,
            EventDescription:EventDescription,
            DateOfEvent:new Date(Date1+" "+Time+':00'),
            EventVenue:EventVenue,
            EventCost:EventCost,
            EventPhotoName:EventPhotoName.name,
        }
        await axios.post('http://127.0.0.1:8000/api/event/',data)
        .then((res)=>{
            console.log(res.data)
        })

        const img=new FormData()
        img.append('myFile',EventPhotoName,EventPhotoName.name)
        await axios.post('http://127.0.0.1:8000/api/event/SaveFile',img)
        .then((res)=>{
            console.log(res.data)
        })

        setEventName('');        
        setEventDescription('');        
        setDate1('');        
        setTime('');        
        setEventVenue('');        
        setEventCost('');        
        setEventPhotoName(null);        

    }

    return (
        <div>
            <div className="container">
                <form>
                    <div className="row flex justify-content-center my-3">
                        <div className="col-2">
                            <label htmlFor="EventName" className="col-form-label">Event Name:</label>
                        </div>
                        <div className="col-8">
                            <input type="text" id="EventName" className="form-control" placeholder="Title of your event" value={EventName} onChange={e=>setEventName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row flex justify-content-center my-3">
                        <div className="col-2">
                            <label htmlFor="EventDescription" className="col-form-label">Event Description:</label>
                        </div>
                        <div className="col-8">
                            <textarea className="form-control" placeholder="Give a brief description about your event..." id="EventDescription" style={{ resize: 'none', height: 100 }} aria-describedby="1" value={EventDescription} onChange={e=>setEventDescription(e.target.value)}></textarea>
                            <span id="1" className="form-text">
                                Must be upto 500 words
                            </span>
                        </div>
                    </div>
                    <div className="row flex justify-content-center my-3">
                        <div className="col-2">
                            <label htmlFor="DateOfEvent" className="col-form-label">Date Of Event:</label>
                        </div>
                        <div className="col-8">
                            <label className="col-form-label" htmlFor="Date">Date:</label>
                            <input className="form-control" type="date" id="Date" name="Date" value={Date1} onChange={e=>setDate1(e.target.value)}/>
                            <label className="col-form-label" htmlFor="Time">Time:</label>
                            <input className="form-control" type="time" id="Time" name="Time" value={Time} onChange={e=>setTime(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row flex justify-content-center my-3">
                        <div className="col-2">
                            <label htmlFor="EventVenue" className="col-form-label">Event Venue:</label>
                        </div>
                        <div className="col-8">
                            <input type="text" id="EventVenue" className="form-control" placeholder="city" value={EventVenue} onChange={e=>setEventVenue(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row flex justify-content-center my-3">
                        <div className="col-2">
                            <label htmlFor="EventCost" className="col-form-label">Event Cost:</label>
                        </div>
                        <div className="col-8">
                            <input type="text" id="EventCost" className="form-control" placeholder="price" value={EventCost} onChange={e=>setEventCost(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row flex justify-content-center my-3">
                        <div className="col-2">
                            <label htmlFor="EventPhotoName" className="col-form-label">Event Photo:</label>
                        </div>
                        <div className="col-8">
                            <input type="file" id="EventPhotoName" onChange={e=>setEventPhotoName(e.target.files[0])}/>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={createEvent}>Submit</button>
                </form>
            </div>
        </div>
    )
}
