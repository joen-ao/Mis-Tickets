import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Events from '../../components/Events';
import Navbar from '../../components/Navbar';
import ReactPaginate from 'react-paginate';
import styles from './Home.module.css';
import useEventsResults from '../../state/events-results';

const Home = () => {
  const {data, isLoading, error, fetchEvents} = useEventsResults();
  const events = useMemo(() => data?._embedded?.events || [], [data?._embedded?.events]);
  const page = data?.page || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual
  const contaninerRef = useRef();

  const fetchMyEventsRef = useRef();
  fetchMyEventsRef.current = fetchEvents;

  useEffect(() => {
    fetchMyEventsRef.current();
  }, []);

  const handleNavbarOnSearch = (term) => {
    setSearchTerm(term);
    fetchEvents(`&keyword=${term}`);
    setCurrentPage(0); // Resetea la página actual cuando se hace una nueva búsqueda
  }

  const handlePageClick = useCallback(({ selected }) => {
    setCurrentPage(selected); // Actualiza el estado de la página actual
    fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
  }, [searchTerm, fetchEvents]);

  const renderEvents = () => {
    if (isLoading) {
      return <div>Cargando resultados</div>;
    }
    
    if (error) {
      return <div>Ha ocurrido un error</div>;
    }
    
    return (
      
      <div className={styles.containerHome}>
        <Events searchTerm={searchTerm} events={events} />
        <ReactPaginate
          className={styles.pagination}
          nextClassName={styles.next}
          previousClassName={styles.previous}
          pageClassName={styles.page}
          activeClassName={styles.activePage}
          disabledClassName={styles.disabledPage}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={page.totalPages}
          forcePage={currentPage} // Asegura que ReactPaginate muestre la página correcta
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }
  
  return (
    <>
    <div className={styles.containerHome}>
      <Navbar onSearch={handleNavbarOnSearch} ref={contaninerRef} />
      <div className={styles.content}>
        {renderEvents()}
      </div>
    </div>
    </>
  );
}

export default Home;
