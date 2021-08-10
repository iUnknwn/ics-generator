import {useRef, useState} from 'react';
import {createEvent, DateArray } from 'ics'
import dayjs from 'dayjs';
import { TextField, Button } from '@material-ui/core';
import "./EventInfo.css"

export interface CalendarEventType {
    eventStart: dayjs.Dayjs,
    eventStop: dayjs.Dayjs,
    description: string,
    title: string,
    location: string
}

function GetICS(eventInfo: CalendarEventType){
    
    const icsEvent = {
        start: eventInfo.eventStart.format('YYYY-M-D-H-m').split("-").map(x => parseInt(x)) as DateArray,
        end: eventInfo.eventStop.format('YYYY-M-D-H-m').split("-").map(x => parseInt(x)) as DateArray,
        title: eventInfo.title,
        description: eventInfo.description
    }

    return createEvent(icsEvent)
}

export default function EventInfo() {
    const [state, setState] = useState<CalendarEventType>({
        eventStart: dayjs(),
        eventStop: dayjs().add(1, 'hour'),
        description: "",
        title: "",
        location: ""
    })
    const downloadLinkRef = useRef(null)
    
    const generateIcs = () => {
        const {error, value} = GetICS(state)
        if (error) {
            console.log(`Error occurred`)
            console.log(error)
            return null
        }
        else if (value){
            const elem = document.createElement("a")
            const file = new Blob([value])
            elem.href = URL.createObjectURL(file)
            elem.setAttribute("download", "event.ics")
            document.body.appendChild(elem)
            elem.click()
            document.body.removeChild(elem)
        }
    }

    const extraStyle = {
        marginTop: "1em",
    }

    // <Button variant="contained" onClick={generateIcs}>Generate ics</Button>
    return (
            <div className="EventInfo">
                <TextField label="Event Title" fullWidth value={state.title} 
                    onChange={(v) => setState({...state, title: v.target.value})} />
                <TextField type="datetime-local" fullWidth label="Event Start" value={state.eventStart.format("YYYY-MM-DDTHH:mm")} 
                    style={extraStyle} onChange={(d) => setState({...state, eventStart: dayjs(d.target.value)})} />
                <TextField type="datetime-local" fullWidth label="Event End" value={state.eventStop.format("YYYY-MM-DDTHH:mm")} 
                    style={extraStyle} onChange={(d) => setState({...state, eventStop: dayjs(d.target.value)})} />
                <TextField multiline rows={4} label="Description" fullWidth value={state.description} 
                    style={extraStyle} onChange={v => setState({...state, description: v.target.value})} />
                <Button variant="contained" style={{marginTop:"2em"}} onClick={generateIcs}>Generate ics</Button>
                
            </div>
    )
}