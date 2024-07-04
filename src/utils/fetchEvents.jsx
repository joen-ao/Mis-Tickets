import wrapPromise from "./wrapPromise";

const fetchEventsDetail = async (eventId) => {
    try {
        const response =await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=mgnrCDj1lDC7OAQkXfBmNIzdkO4OBcGH`);
        const data = await response.json();
       
        return data;
    } catch (error) {
        console.log(error);
    }
}

const fetchData = (eventId) =>{
    return {
        eventDetail: wrapPromise(fetchEventsDetail(eventId))
    }
}

export default fetchData;