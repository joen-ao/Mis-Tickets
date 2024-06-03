import EventItem from "./components/Eventitem";

import { useNavigate } from "react-router-dom";


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
            />
        ))
    }

    

    return(
        <div>
            Eventos
            {renderEvents()}
        </div>
    );
}
export default Events;