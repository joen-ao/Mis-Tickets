import styles from './EventItem.module.css'
import useLikeEvents from '../../../../hooks/useLikeEvents'
import HearthFilled from '../../../../assets/hearth-filled.png'
import HearthUnfilled from '../../../../assets/hearth-unfilled.png'

const EventItem = ({info, id, name, image, onEventClick})=>{

    const {isEventLiked, toggleEventLike} = useLikeEvents(id);

    const handleSeeMoreClick = (evt)=>{
        onEventClick(id)
        evt.stopPropagation();
    }

    const handleHearthClick = () =>{
        toggleEventLike();
    }

    return(
        <div className={styles.evenItemContainer}>
            <div className={styles.imageContainer}>
                <img src={isEventLiked? HearthFilled: HearthUnfilled} alt='Hearth Button' className={styles.hearthImage} onClick={handleHearthClick} />
                <img src={image} alt={name} width={200} height={200}/>
                
            </div>
            
            <div className={styles.eventInfoContainer}>
                <h4 className={styles.eventName}>{name}</h4>
                <p className={styles.eventInfo} >{info}</p>
                <button onClick={handleSeeMoreClick} className={styles.seeMoreBtn} >
    
                    Ver más
                </button>
            </div>
            
        </div>
    )
}

export default EventItem;