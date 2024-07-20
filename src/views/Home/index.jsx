import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Events from '../../components/Events';
import Navbar from '../../components/Navbar';
import ReactPaginate from 'react-paginate';
import styles from './Home.module.css';
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

  const renderEvents = () => {
    if (isLoading) {
      return <div>Cargando resultados...</div>;
    }

    if (error) {
      return <div>Ha ocurrido un error: {error.message}</div>;
    }

    if (events.length === 0) {
      return <div>No se encontraron eventos</div>;
    }

    return (
      <div className={styles.containerHome}>
        <Events searchTerm={searchTerm} events={events} />
        {page.totalPages > 1 && (
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
            forcePage={currentPage}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    );
  };

  return (
    <div className={styles.containerHome}>
      <Navbar onSearch={handleNavbarOnSearch} ref={containerRef} />
      <div className={styles.content}>
        {renderEvents()}
      </div>
    </div>
  );
};

export default Home;
