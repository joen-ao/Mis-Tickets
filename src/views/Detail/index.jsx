import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from './Detail.module.css';
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import Navbar from "../../components/Navbar";

const Detail = () => {
    const { eventId } = useParams();
    const [eventData, setEventData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef();

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/events/${eventId}?apikey=${import.meta.env.VITE_API_KEY}`
                );
                if (!response.ok) {
                    throw new Error(`Error fetching event data: ${response.statusText}`);
                }
                const data = await response.json();
                setEventData(data);
            } catch (error) {
                setError(error.message);
                setEventData({});
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventData();
    }, [eventId]);

    if (isLoading) {
        return <div className={styles.loading}>Cargando Evento...</div>;
    }

    if (error) {
        return <div className={styles.error}>Ha ocurrido un error: {error}</div>;
    }

    const genres = eventData.classifications?.[0] || {};

    return (
        <div className={styles.container}>
            <Navbar ref={containerRef} />

            <div className={styles.mainInfoContainer}>
                {eventData.images?.[0]?.url && (
                    <img src={eventData.images[0].url} className={styles.eventImage} alt={eventData.name} />
                )}
                <h4 className={styles.eventName}>{eventData.name}</h4>
                <p className={styles.infoParagraph}>{eventData.info}</p>
                {eventData.dates?.start?.dateTime && (
                    <p className={styles.dateParagraph}>
                        {format(new Date(eventData.dates.start.dateTime), 'd LLLL yyyy H:mm', { locale: es })} hrs
                    </p>
                )}
                <div className={styles.genresContainer}>
                    {genres.segment?.name && <span className={styles.genreTag}>{genres.segment.name}</span>}
                    {genres.genre?.name && <span className={styles.genreTag}>{genres.genre.name}</span>}
                    {genres.subGenre?.name && <span className={styles.genreTag}>{genres.subGenre.name}</span>}
                </div>
            </div>

            <div className={styles.seatInfoContainer}>
                <h6 className={styles.seatMapTitle}>Mapa del evento</h6>
                <div className={styles.seatInfoContainer2}>
                    {eventData.seatmap?.staticUrl && (
                        <img src={eventData.seatmap.staticUrl} alt='Seatmap Event' className={styles.eventMap} />
                    )}
                    <div className={styles.seatInfoText}>
                        <p className={styles.pleaseNoteLegend}>{eventData.pleaseNote}</p>
                        {eventData.priceRanges?.[0] && (
                            <p className={styles.priceRangeLegend}>
                                Rango de precios: {eventData.priceRanges[0].min} - {eventData.priceRanges[0].max} {eventData.priceRanges[0].currency}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {eventData.url && (
                <a href={eventData.url} className={styles.eventUrl}>
                    Ir por tus boletos
                </a>
            )}
        </div>
    );
};

export default Detail;
