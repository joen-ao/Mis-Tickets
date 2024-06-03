import { useEffect, useRef, useState } from 'react';
import Events from '../../components/Events';
import Navbar from '../../components/Navbar';
import ReactPaginate from 'react-paginate';
import styles from './Home.module.css';
import useEventsResults from '../../state/events-results';

const Home = () => {
  const {data, isLoading, error, fetchEvents} = useEventsResults();
  const events = data?._embedded?.events || [];
  const page = data?.page || {};
  const [searchTerm, setSearchTerm] = useState('');
  const contaninerRef = useRef();
  
  useEffect(()=>{
    fetchEvents();
  },[]);

  const handleNavbarOnSearch= (term) => {
    setSearchTerm(term);
    fetchEvents(`&keyword=${term}`);
  }
  const handlePageClick =({selected}) => {
    fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
  };


  const renderEvents =()=>{
    if(isLoading){
      return <div> Cargando resultados </div>
    }
    
    if(error){
      return ( <div>Ha ocurrido un error</div>)
    }
    return (
      <div>
        <Events searchTerm = {searchTerm} events={events} />
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
           previousLabel="<"
           renderOnZeroPageCount={null}
        />
      </div>
      
    )
  }
  
  return(
    <>
     <Navbar onSearch={handleNavbarOnSearch} ref={contaninerRef} />
     {renderEvents()}
    </>
  )
}
export default Home;