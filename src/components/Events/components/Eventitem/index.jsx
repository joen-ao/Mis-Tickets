import useLikeEvents from '../../../../hooks/useLikeEvents';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const EventItem = ({ id, name, image, date, city, genres, onEventClick}) => {
    const { isEventLiked, toggleEventLike } = useLikeEvents(id);

    const handleSeeMoreClick = (evt) => {
        onEventClick(id);
        evt.stopPropagation();
    }

    const handleHearthClick = (evt) => {
        evt.stopPropagation();
        toggleEventLike();
    }

    return (
        <div className="flex flex-col gap-4 pb-3 rounded-lg bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover relative">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
                    style={{backgroundImage: `url("${image}")`}}
                    alt={name}
                />
                <button 
                    onClick={handleHearthClick}
                    className={`absolute top-3 right-3 backdrop-blur-sm rounded-full p-2 transition-all ${
                        isEventLiked 
                            ? 'bg-white/90' 
                            : 'bg-black/30 hover:bg-primary/80'
                    }`}
                >
                    {isEventLiked ? (
                        <span 
                            className="text-lg font-bold"
                            style={{
                                fontFamily: 'Material Symbols Outlined',
                                fontVariationSettings: "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 24",
                                color: '#ef4444',
                                fontSize: '20px'
                            }}
                        >
                            favorite
                        </span>
                    ) : (
                        <span className="material-symbols-outlined text-lg text-white">
                            favorite
                        </span>
                    )}
                </button>
            </div>
            <div className="px-4 pb-4 flex flex-col gap-4">
                <div>
                    <div className="flex gap-2 mb-2 flex-wrap">
                        {genres.segment?.name && genres.segment.name !== 'Undefined' && (
                            <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded-full">
                                {genres.segment.name}
                            </span>
                        )}
                        {genres.genre?.name && genres.genre.name !== 'Undefined' && (
                            <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded-full">
                                {genres.genre.name}
                            </span>
                        )}
                        {genres.subGenre?.name && genres.subGenre.name !== 'Undefined' && (
                            <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded-full">
                                {genres.subGenre.name}
                            </span>
                        )}
                    </div>
                    <p className="text-slate-900 dark:text-slate-50 text-lg font-bold leading-normal line-clamp-2">{name}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                    {date && (
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            <span>{format(new Date(date), "d 'de' MMMM, yyyy - h:mm a", {locale: es})}</span>
                        </div>
                    )}
                    {city && (
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">location_on</span>
                            <span>{city}</span>
                        </div>
                    )}
                </div>
                <button 
                    onClick={handleSeeMoreClick}
                    className="mt-2 w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                >
                    <span className="truncate">Ver más</span>
                </button>
            </div>
        </div>
    )
}

export default EventItem;
