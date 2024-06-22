import { useEffect, useState } from "react";
import {LIKED_EVENTS_STORAGE_KEY} from '../../../../utils/constant'
import EventItem from '../../../../components/Events/components/Eventitem'
import { useNavigate } from "react-router-dom";

const LikedEvents =()=>{
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchEventsDetails = async () => {
            try {
                setIsLoading(true);
                const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];
                console.log(likedEvents);

                const results=[];
                for (const eventId of likedEvents){
                    const response =await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=mgnrCDj1lDC7OAQkXfBmNIzdkO4OBcGH`);
                    const data = await response.json();

                    results.push(data);
                }
                setEvents(results);

            } catch (error) {
                setError(error);
            }
            finally{
                setIsLoading(false);
            }
        }
       
        fetchEventsDetails();
    },[]);

    if(Object.keys(error).length>0){
        return <div>Ha ocurrido un error</div>
    }

    if(isLoading){
        return <div>Cargando...</div>
    }

    const handleEvenItemClick = (eventId)=>{
        navigate(`/detail/${eventId}`);

    }

    return(
        <div>
            {events.map((event, index)=>(
                <EventItem
                    key={`liked-event-item-${event.id}-${index}`}
                    name={event.name}
                    info={event.info}
                    image={event.images[0].url}
                    onEventClick={handleEvenItemClick}
                    id={event.id}
                />
            ) )}
        </div>
    )

};
export default LikedEvents;