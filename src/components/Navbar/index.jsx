import { useState, useEffect, forwardRef, useImperativeHandle} from "react";
import styles from './Navbar.module.css'
import { Link } from "react-router-dom";

const Navbar = forwardRef(({onSearch}, ref) => {

  const [search, setSearch] = useState('');
  

  useEffect(()=>{
    console.log('1010 efect');
  },[search, onSearch]);

  const handleInputChange = (evt)=>{
    setSearch(evt.target.value);
  }

  const handleInputKeyDown = (evt) =>{
    if(evt.key ==='Enter'){
      onSearch(search);
    }
  }

  useImperativeHandle(ref, ()=>({
    search,
    setSearch,
  }))


  return (
    <div ref={ref} className={styles.navbar} >
      <div className={styles.navbarTitleContainer}>
        <p className={styles.navbarTitle}>Mis Tickets</p>
      </div>
      
      <input 
        placeholder="Busca tu evento favorito" 
        onChange={handleInputChange} 
        onKeyDown={handleInputKeyDown}
        value={search}
        className={styles.input}
        />
       <Link to='/profile/my-info' className={styles.profile} >Mi perfil</Link>
    </div>
  );
});

Navbar.displayName='Navbar';

export default Navbar;
