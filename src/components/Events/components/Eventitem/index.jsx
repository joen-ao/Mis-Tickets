import styles from './EventItem.module.css'
import useLikeEvents from '../../../../hooks/useLikeEvents'
import HearthFilled from '../../../../assets/hearth-filled.png'
import HearthUnfilled from '../../../../assets/hearth-unfilled.png'
import { format } from 'date-fns';
import { es } from 'date-fns/locale'

const EventItem = ({info, id, name, image, date, city, onEventClick}) => {

    const { isEventLiked, toggleEventLike } = useLikeEvents(id);

    const handleSeeMoreClick = (evt) => {
        onEventClick(id)
        evt.stopPropagation();
    }

    const handleHearthClick = () => {
        toggleEventLike();
    }

    return (
        <div className={styles.evenItemContainer}>
            <div className={styles.imageContainer}>
                <img src={isEventLiked ? HearthFilled : HearthUnfilled} alt='Hearth Button' className={styles.hearthImage} onClick={handleHearthClick} />
                <img src={image} alt={name} className={styles.eventImage}/>
            </div>
            <div className={styles.eventInfoContainer}>
                <h4 className={styles.eventName}>{name}</h4>
                {date && (
                    <p className={styles.eventDate}>
                        {format(new Date(date), 'd LLLL yyyy H:mm', {locale: es})}
                    </p>
                )}
                <p className={styles.eventCity}>{city}</p>
                <button onClick={handleSeeMoreClick} className={styles.seeMoreBtn} >
    
                    Ver más
                </button>
            </div>
        </div>
    )
}

export default EventItem;
