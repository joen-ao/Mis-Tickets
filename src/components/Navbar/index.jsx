import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = forwardRef(({ onSearch }, ref) => {
  const [search, setSearch] = useState('');
  const location = useLocation();

  useEffect(() => {}, [search, onSearch]);

  const handleInputChange = (evt) => {
    setSearch(evt.target.value);
  };

  const handleInputKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSearch(search);
    }
  };

  useImperativeHandle(ref, () => ({
    search,
    setSearch,
  }));

  const isHomePage = location.pathname === '/';

  return (
    <div ref={ref} className={styles.navbar}>
      <div className={styles.navbarTitleContainer}>
        
        <Link to='/' className={styles.navbarTitle} >Mis Tickets</Link>
      </div>

      {isHomePage && (
        <input
          placeholder="Busca tu evento favorito"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          value={search}
          className={styles.input}
        />
      )}
      <Link to='/profile/my-info' className={styles.profile}>Mi perfil</Link>
      <Link to='/sign-up' className={styles.signup}>Inicio de Sesion</Link>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;

