import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = forwardRef(({ onSearch }, ref) => {
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleHomeClick = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div ref={ref} className={styles.navbar}>
      <div className={styles.navbarTitleContainer}>
        <p onClick={handleHomeClick} className={styles.navbarTitle}>Mis Tickets</p>
        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰
        </button>
      </div>

      
        
      <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
      {isHomePage && (
        <input
          placeholder="Busca tu evento favorito"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          value={search}
          className={styles.inputSearch}
        />
      )}
        
        <NavLink
          to='/profile/my-info'
          className={({ isActive }) => isActive ? `${styles.profile} ${styles.active}` : styles.profile}
        >
          Mi perfil
        </NavLink>
        <NavLink
          to='/sign-up'
          className={({ isActive }) => isActive ? `${styles.signup} ${styles.active}` : styles.signup}
        >
          Inicio de Sesion
        </NavLink>
      </div>

      
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
