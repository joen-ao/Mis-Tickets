import wrapPromise from "./wrapPromise";

const fetchEventsDetail = async (eventId) => {
    try {
        const response =await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/${eventId}?apikey=${import.meta.env.VITE_API_KEY}&embed=venues`);
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