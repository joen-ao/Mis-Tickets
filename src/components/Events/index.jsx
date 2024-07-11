import { useNavigate } from "react-router-dom";
import { memo } from "react";

import EventItem from "./components/Eventitem";

const Events = ({ searchTerm, events }) => {
    
    
    const navigate = useNavigate();

    const handleEvenItemClick = (id) =>{
        navigate(`/detail/${id}`)
    }


    const renderEvents = () =>{
        let eventsFiltered = events;

        if(searchTerm.length > 0){
            eventsFiltered = eventsFiltered.filter((item)=> item.name.toLocaleLowerCase().includes(searchTerm))
        }

        return eventsFiltered.map((evenItem)=> (
            <EventItem 
                key={`event-item-${evenItem.id}`}
                name={evenItem.name}
                info={evenItem.info}
                image={evenItem.images[0].url}
                onEventClick={handleEvenItemClick}
                id={evenItem.id}
                date={evenItem.dates?.start?.dateTime} 
            />
        ))
    }

    

    return(
        <div>
            {renderEvents()}
        </div>
    );
}
export default memo(Events); //para evitar el rerendereo, solo usar en listas