import styles from './EventItem.module.css';
import useLikeEvents from '../../../../hooks/useLikeEvents';
import HearthFilled from '../../../../assets/hearth-filled.png';
import HearthUnfilled from '../../../../assets/hearth-unfilled.png';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const EventItem = ({ id, name, image, date, city, genres, onEventClick}) => {
    const { isEventLiked, toggleEventLike } = useLikeEvents(id);

    const handleSeeMoreClick = (evt) => {
        onEventClick(id);
        evt.stopPropagation();
    }

    const handleHearthClick = () => {
        toggleEventLike();
    }

    return (
        <div className={styles.eventItemContainer} >
            <div className={styles.imageContainer}>
                <img src={isEventLiked ? HearthFilled : HearthUnfilled} alt='Hearth Button' className={styles.hearthImage} onClick={handleHearthClick} />
                <img src={image} alt={name} className={styles.eventImage}/>
            </div>
            <div className={styles.eventInfoContainer}>
                <h4 className={styles.eventName}>{name}</h4>
                <div className={styles.genresContainer}>
                    {genres.segment?.name && <span className={styles.genreTag}>{genres.segment.name}</span>}
                    {genres.genre?.name && <span className={styles.genreTag}>{genres.genre.name}</span>}
                    {genres.subGenre?.name && <span className={styles.genreTag}>{genres.subGenre.name}</span>}
                </div>
                {date && (
                    <p className={styles.eventDate}>
                        <i className="fa fa-calendar"></i> {format(new Date(date), 'd MMMM, yyyy', {locale: es})}
                    </p>
                )}
                {date && (
                    <p className={styles.eventTime}>
                        <i className="fa fa-clock"></i> {format(new Date(date), 'h:mm a', {locale: es})}
                    </p>
                )}
                <p className={styles.eventCity}><i className="fa fa-map-marker"></i> {city}</p>
                <button className={styles.seeMoreBtn} onClick={handleSeeMoreClick}>
                    Ver más
                </button>
            </div>
        </div>
    )
}

export default EventItem;
