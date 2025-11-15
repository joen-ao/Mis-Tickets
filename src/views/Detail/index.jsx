import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
                    `${import.meta.env.VITE_API_BASE_URL}/events/${eventId}?apikey=${import.meta.env.VITE_API_KEY}&embed=venues`
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
        return (
            <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
                <div className="layout-container flex h-full grow flex-col">
                    <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
                        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                            <Navbar ref={containerRef} />
                            <div className="flex justify-center items-center py-16">
                                <div className="text-slate-500 dark:text-slate-400 text-lg">Cargando Evento...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
                <div className="layout-container flex h-full grow flex-col">
                    <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
                        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                            <Navbar ref={containerRef} />
                            <div className="flex justify-center items-center py-16">
                                <div className="text-red-500 text-lg">Ha ocurrido un error: {error}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const genres = eventData.classifications?.[0] || {};

    // Intentar obtener el mapa de asientos de diferentes ubicaciones
    const getSeatmapUrl = () => {
        // Opción 1: seatmap.staticUrl (más común)
        if (eventData.seatmap?.staticUrl) {
            return eventData.seatmap.staticUrl;
        }

        // Opción 2: _embedded.venues[0].images (algunos eventos lo tienen aquí)
        const venueImages = eventData._embedded?.venues?.[0]?.images;
        if (venueImages && venueImages.length > 0) {
            // Buscar una imagen que parezca ser un seatmap
            const seatmapImage = venueImages.find(img =>
                img.url && (img.fallback === false || img.ratio === '3_2')
            );
            if (seatmapImage) {
                return seatmapImage.url;
            }
        }

        return null;
    };

    const seatmapUrl = getSeatmapUrl();

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col w-full max-w-5xl flex-1">
                        <Navbar ref={containerRef} />
                        
                        <main className="flex-1 px-4 sm:px-8 py-8 space-y-12">
                            {/* Hero Section */}
                            <div 
                                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-lg min-h-[70vh]" 
                                style={{backgroundImage: `url("${eventData.images?.[0]?.url}")`}}
                                alt={eventData.name}
                            />

                            {/* Information Header Section */}
                            <section className="space-y-6">
                                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter text-[#101922] dark:text-background-light">
                                    {eventData.name}
                                </h1>

                                {eventData.info ? (
                                    <p className="text-base font-normal leading-relaxed text-[#101922] dark:text-gray-300 max-w-4xl">
                                        {eventData.info}
                                    </p>
                                ) : (
                                    <p className="text-base font-normal leading-relaxed text-gray-500 dark:text-gray-500 max-w-4xl italic flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">info</span>
                                        Para más información sobre este evento, haz clic en "Ir por tus boletos"
                                    </p>
                                )}

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                    {eventData.dates?.start?.dateTime && (
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary text-2xl">calendar_month</span>
                                            <p className="text-base font-medium text-[#101922] dark:text-background-light">
                                                {format(new Date(eventData.dates.start.dateTime), "EEEE, d 'de' MMMM - HH:mm 'hrs'", { locale: es })}
                                            </p>
                                        </div>
                                    )}
                                    
                                    <div className="flex flex-wrap items-center gap-3">
                                        {genres.segment?.name && genres.segment.name !== 'Undefined' && (
                                            <div className="px-4 py-1.5 bg-primary/20 text-primary rounded-full">
                                                <span className="text-sm font-bold">{genres.segment.name}</span>
                                            </div>
                                        )}
                                        {genres.genre?.name && genres.genre.name !== 'Undefined' && (
                                            <div className="px-4 py-1.5 bg-primary/20 text-primary rounded-full">
                                                <span className="text-sm font-bold">{genres.genre.name}</span>
                                            </div>
                                        )}
                                        {genres.subGenre?.name && genres.subGenre.name !== 'Undefined' && (
                                            <div className="px-4 py-1.5 bg-primary/20 text-primary rounded-full">
                                                <span className="text-sm font-bold">{genres.subGenre.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <div className="border-t border-gray-200 dark:border-gray-800"></div>

                            {/* Seating Map Section */}
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-[#101922] dark:text-background-light">Mapa del evento</h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                    {seatmapUrl ? (
                                        <div className="w-full bg-white dark:bg-background-dark p-4 rounded-lg shadow-sm">
                                            <div
                                                className="w-full bg-center bg-no-repeat bg-contain aspect-video"
                                                style={{backgroundImage: `url("${seatmapUrl}")`}}
                                                alt="Mapa de asientos del evento"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full bg-gray-100 dark:bg-gray-800/50 p-8 rounded-lg shadow-sm flex flex-col items-center justify-center aspect-video">
                                            <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">
                                                event_seat
                                            </span>
                                            <p className="text-gray-600 dark:text-gray-400 text-center">
                                                Mapa no disponible
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-500 text-center mt-2">
                                                Consulta más detalles en el sitio oficial
                                            </p>
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        {eventData.pleaseNote ? (
                                            <div className="p-6 bg-white dark:bg-gray-800/50 rounded-lg">
                                                <h3 className="text-xl font-bold mb-2 text-[#101922] dark:text-background-light">Notas Importantes</h3>
                                                <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                                    {eventData.pleaseNote}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                                                <h3 className="text-xl font-bold mb-2 text-[#101922] dark:text-background-light">Notas Importantes</h3>
                                                <p className="text-sm font-normal text-gray-500 dark:text-gray-500 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-base">info</span>
                                                    Para más información haz clic en "Ir por tus boletos"
                                                </p>
                                            </div>
                                        )}

                                        {eventData.priceRanges?.[0] && (
                                            <div className="p-6 bg-white dark:bg-gray-800/50 rounded-lg">
                                                <h3 className="text-xl font-bold mb-2 text-[#101922] dark:text-background-light">Rango de Precios</h3>
                                                <p className="text-2xl font-bold text-primary">
                                                    ${eventData.priceRanges[0].min} - ${eventData.priceRanges[0].max} {eventData.priceRanges[0].currency}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <div className="border-t border-gray-200 dark:border-gray-800"></div>

                            {/* CTA Section */}
                            {eventData.url && (
                                <section className="text-center py-8">
                                    <a 
                                        href={eventData.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-w-[240px] h-14 cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-8 text-white text-lg font-bold leading-normal tracking-wide shadow-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <span>Ir por tus boletos</span>
                                        <span className="material-symbols-outlined">open_in_new</span>
                                    </a>
                                </section>
                            )}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Detail;
