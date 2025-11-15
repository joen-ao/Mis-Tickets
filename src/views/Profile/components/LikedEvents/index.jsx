import { useEffect, useState } from "react";
import { LIKED_EVENTS_STORAGE_KEY } from '../../../../utils/constant';
import EventItem from "../../../../components/Events/components/Eventitem";
import { useNavigate } from "react-router-dom";

const LikedEvents = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventsDetails = async () => {
            try {
                setIsLoading(true);
                const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];

                if (likedEvents.length === 0) {
                    setEvents([]);
                    setIsLoading(false);
                    return;
                }

                const results = [];
                for (const eventId of likedEvents) {
                    const response = await fetch(
                        `${import.meta.env.VITE_API_BASE_URL}/events/${eventId}?apikey=${import.meta.env.VITE_API_KEY}`
                    );
                    const data = await response.json();
                    results.push(data);
                }
                setEvents(results);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
       
        fetchEventsDetails();
    }, []);

    const handleEvenItemClick = (eventId) => {
        navigate(`/detail/${eventId}`);
    }

    if (Object.keys(error).length > 0) {
        return (
            <div className="flex justify-center items-center py-16">
                <div className="text-red-500 text-lg">Ha ocurrido un error al cargar tus eventos favoritos</div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <div className="text-slate-500 dark:text-slate-400 text-lg">Cargando tus eventos favoritos...</div>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="flex flex-col px-4 py-16">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-primary">
                        <span className="material-symbols-outlined" style={{fontSize: '80px'}}>favorite_border</span>
                    </div>
                    <div className="flex max-w-[480px] flex-col items-center gap-2">
                        <p className="text-slate-900 dark:text-slate-50 text-xl font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                            No tienes eventos favoritos
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal max-w-[480px] text-center">
                            Explora eventos y marca tus favoritos haciendo clic en el corazón
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate('/')}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                    >
                        <span className="truncate">Explorar eventos</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {events.map((event, index) => (
                <EventItem
                    key={`liked-event-item-${event.id}-${index}`}
                    name={event.name}
                    info={event.info}
                    image={event.images[0].url}
                    date={event.dates?.start?.dateTime}
                    city={event._embedded?.venues[0]?.city?.name}
                    genres={event.classifications[0]}
                    onEventClick={handleEvenItemClick}
                    id={event.id}
                />
            ))}
        </div>
    );
};

export default LikedEvents;