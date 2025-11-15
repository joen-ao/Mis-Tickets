import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

const Navbar = forwardRef(({ onSearch }, ref) => {
  const [search, setSearch] = useState('');
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

  return (
    <header className="flex items-center justify-between border-b border-solid border-slate-200 dark:border-slate-800 px-2 sm:px-4 md:px-6 py-2 sm:py-3 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm z-10 gap-2 sm:gap-4 w-full overflow-hidden">
      <a className="flex items-center gap-1.5 sm:gap-2 text-slate-900 dark:text-slate-50 cursor-pointer flex-shrink-0" onClick={handleHomeClick}>
        <div className="size-5 sm:size-6 text-primary flex-shrink-0">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-slate-900 dark:text-slate-50 text-sm sm:text-base md:text-lg font-bold leading-tight tracking-[-0.015em] whitespace-nowrap">Mis Tickets</h2>
      </a>
      
      {isHomePage && (
        <div className="flex-1 max-w-md mx-2 sm:mx-4 min-w-0">
          <div className="flex w-full items-stretch rounded-full h-9 sm:h-10">
            <div className="text-slate-500 dark:text-slate-400 flex border-none bg-slate-200/60 dark:bg-slate-800/60 items-center justify-center pl-2 sm:pl-3 rounded-l-full border-r-0 flex-shrink-0">
              <span className="material-symbols-outlined text-lg sm:text-xl">search</span>
            </div>
            <input 
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-0 border-none bg-slate-200/60 dark:bg-slate-800/60 focus:border-none h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-2 sm:px-3 rounded-l-none border-l-0 pl-1 sm:pl-2 text-xs sm:text-sm font-normal leading-normal" 
              placeholder="Buscar..."
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              value={search}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <div className="hidden md:flex items-center gap-4">
          <NavLink 
            to='/profile/my-info'
            className={({ isActive }) => 
              isActive 
                ? "text-primary text-sm font-medium leading-normal transition-colors whitespace-nowrap" 
                : "text-slate-900 dark:text-slate-50 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors whitespace-nowrap"
            }
          >
            Mi perfil
          </NavLink>
          <NavLink 
            to='/sign-up'
            className={({ isActive }) => 
              isActive 
                ? "text-primary text-sm font-medium leading-normal transition-colors whitespace-nowrap" 
                : "text-slate-900 dark:text-slate-50 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors whitespace-nowrap"
            }
          >
            Iniciar Sesión
          </NavLink>
        </div>
        <NavLink to='/profile/my-info' className="md:hidden text-slate-900 dark:text-slate-50 flex-shrink-0">
          <span className="material-symbols-outlined text-xl">person</span>
        </NavLink>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 sm:size-9 border-2 border-slate-200 dark:border-slate-700 flex-shrink-0" style={{backgroundImage: 'url("https://cdn-icons-png.flaticon.com/512/3135/3135715.png")'}}></div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
