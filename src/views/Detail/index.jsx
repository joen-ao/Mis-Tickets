import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './Detail.module.css'
import { format } from "date-fns";
import {es} from 'date-fns/locale'

const Detail = () => {
    //hay que saber cuando crear un hook, en este caso no vale la pena crear un hook porque se puede hacer un llamado a la api porque solamente se llamara aqui
    const {eventId} = useParams();
    const [eventData, setEventData] = useState({});
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    

    useEffect(()=>{
        const fetchEventData = async()=>{
            try {
                const response =await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=mgnrCDj1lDC7OAQkXfBmNIzdkO4OBcGH`);
                const data = await response.json();
                setEventData(data);
                setIsLoading(false)
            } catch (error) {
                setEventData({});
                setError(error);
                setIsLoading(false)
            }
        }
        fetchEventData();
    },[])

    if(isLoading && Object.keys(eventData)===0){
        return <div>Cargando Evento</div>
    }

    if(Object.keys(error) > 0){
        return <div>Ha ocurrido un error...</div>
    }



    console.log(eventData);

     // eventData.ssss?(?) => cuando se accede a la info directo de la API para que no marque undefinded a los valores
    return(
        <div className={styles.container}>
            
            <div className={styles.mainInfoContainer}>
                <img src={eventData.images?.[0].url} className={styles.eventImage} alt={eventData.name}/>
                <h4 className={styles.eventName} >{eventData.name}</h4>
                <p className={styles.infoParagraph} >{eventData.info}</p>
                {eventData.dates?.start.dateTime ? <p className={styles.dateParagraph} >{format(new Date(eventData.dates?.start.dateTime),'d LLLL yyyy H:mm', {locale: es})} hrs</p> : null }
                
            </div>
            <div className={styles.seatInfoContainer}>
                <h6 className={styles.seatMapTitle} >Mapa del evento</h6>
                <img src={eventData.seatmap?.staticUrl} alt='Seatmap Event'/>
                <p className={styles.pleaseNoteLegend}>{eventData.pleaseNote}</p>
                <p className={styles.priceRangeLegend} >Rango de precios: {eventData.priceRanges?.[0].min}-{eventData.priceRanges?.[0].max} {eventData.priceRanges?.[0].currency}</p>
            </div>
            <a href={eventData.url}>
            Ir por tus boletos
            </a>
        </div>
        
    )
}
export default Detail;