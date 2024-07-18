import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from './Detail.module.css';
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import Navbar from "../../components/Navbar";

const Detail = () => {
    const { eventId } = useParams();
    const [eventData, setEventData] = useState({});
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const contaninerRef = useRef();

    const handleNavbarOnSearch = (term) => {
        setEventData(term);
        fetchEvents(`&keyword=${term}`);
    };

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=mgnrCDj1lDC7OAQkXfBmNIzdkO4OBcGH`);
                const data = await response.json();
                setEventData(data);
                setIsLoading(false);
            } catch (error) {
                setEventData({});
                setError(error);
                setIsLoading(false);
            }
        };
        fetchEventData();
    }, [eventId]);

    if (isLoading && Object.keys(eventData).length === 0) {
        return <div className={styles.loading}>Cargando Evento...</div>;
    }

    if (Object.keys(error).length > 0) {
        return <div className={styles.error}>Ha ocurrido un error...</div>;
    }

    return (
        <div className={styles.container}>
            <Navbar onSearch={handleNavbarOnSearch} ref={contaninerRef} />

            <div className={styles.mainInfoContainer}>
                <img src={eventData.images?.[0].url} className={styles.eventImage} alt={eventData.name} />
                <h4 className={styles.eventName}>{eventData.name}</h4>
                <p className={styles.infoParagraph}>{eventData.info}</p>
                {eventData.dates?.start.dateTime && (
                    <p className={styles.dateParagraph}>
                        {format(new Date(eventData.dates?.start.dateTime), 'd LLLL yyyy H:mm', { locale: es })} hrs
                    </p>
                )}
            </div>

            <div className={styles.seatInfoContainer}>
                <h6 className={styles.seatMapTitle}>Mapa del evento</h6>
                <div className={styles.seatInfoContainer2}>
                    <img src={eventData.seatmap?.staticUrl} alt='Seatmap Event' className={styles.eventMap} />
                    <div className={styles.seatInfoText}>
                        <p className={styles.pleaseNoteLegend}>{eventData.pleaseNote}</p>
                        <p className={styles.priceRangeLegend}>
                            Rango de precios: {eventData.priceRanges?.[0].min} - {eventData.priceRanges?.[0].max} {eventData.priceRanges?.[0].currency}
                        </p>
                    </div>
                </div>
            </div>

            <a href={eventData.url} className={styles.eventUrl}>
                Ir por tus boletos
            </a>
        </div>
    );
};

export default Detail;
