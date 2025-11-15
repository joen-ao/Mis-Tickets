import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Events from '../../components/Events';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ReactPaginate from 'react-paginate';
import useEventsResults from '../../state/events-results';

const Home = () => {
  const { data, isLoading, error, fetchEvents } = useEventsResults();
  const events = useMemo(() => data?._embedded?.events || [], [data]);
  const page = data?.page || { totalPages: 0 };
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef();

  const fetchMyEventsRef = useRef();
  fetchMyEventsRef.current = fetchEvents;

  useEffect(() => {
    fetchMyEventsRef.current();
  }, []);

  const handleNavbarOnSearch = (term) => {
    setSearchTerm(term);
    fetchEvents(`&keyword=${term}`);
    setCurrentPage(0);
  };

  const handlePageClick = useCallback(({ selected }) => {
    setCurrentPage(selected);
    fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
  }, [searchTerm, fetchEvents]);

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchEvents('');
    setCurrentPage(0);
  };

  const renderEvents = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-16">
          <div className="text-slate-500 dark:text-slate-400 text-lg">Cargando resultados...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center py-16">
          <div className="text-red-500 text-lg">Ha ocurrido un error: {error.message}</div>
        </div>
      );
    }

    if (events.length === 0 && searchTerm.length > 0) {
      return (
        <div className="flex flex-col px-4 py-16">
          <div className="flex flex-col items-center gap-6">
            <div className="text-primary">
              <span className="material-symbols-outlined" style={{fontSize: '80px'}}>search_off</span>
            </div>
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-slate-900 dark:text-slate-50 text-xl font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                No se encontraron eventos
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal max-w-[480px] text-center">
                Prueba a cambiar tus términos de búsqueda o a borrar los filtros aplicados.
              </p>
            </div>
            <button 
              onClick={handleClearSearch}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="truncate">Borrar búsqueda</span>
            </button>
          </div>
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="flex justify-center items-center py-16">
          <div className="text-slate-500 dark:text-slate-400 text-lg">No hay eventos disponibles</div>
        </div>
      );
    }

    return (
      <>
        <Events searchTerm={searchTerm} events={events} />
        {page.totalPages > 1 && (
          <div className="flex items-center justify-center p-4">
            <ReactPaginate
              className="flex items-center justify-center gap-2"
              previousLinkClassName="flex size-10 items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
              nextLinkClassName="flex size-10 items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
              pageLinkClassName="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-900 dark:text-slate-50 rounded-full hover:bg-primary/20 transition-colors"
              activeLinkClassName="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-primary"
              disabledLinkClassName="cursor-not-allowed opacity-50"
              breakLabel="..."
              nextLabel={<span className="material-symbols-outlined">chevron_right</span>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={page.totalPages}
              forcePage={currentPage}
              previousLabel={<span className="material-symbols-outlined">chevron_left</span>}
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col w-full">
        <div className="flex flex-1 justify-center w-full">
          <div className="layout-content-container flex flex-col w-full max-w-[1400px] flex-1">
            <Navbar onSearch={handleNavbarOnSearch} ref={containerRef} />
            <main className="flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-6 px-2 sm:px-4 md:px-6 w-full">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-slate-900 dark:text-slate-50 text-xl sm:text-2xl md:text-3xl font-black leading-tight tracking-[-0.033em]">
                  Próximos Eventos
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm md:text-base font-normal leading-normal">
                  Descubre los mejores eventos cerca de ti
                </p>
              </div>
              {renderEvents()}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
