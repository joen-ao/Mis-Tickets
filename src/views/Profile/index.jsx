import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from './Profile.module.css';

const Profile = ()=>{

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const handleTabClick = (path) =>{
        navigate(`/profile/${path}`); //useNavigate para navegar de una pagina a otra
    }

    return(
        <div>
            <Link to='/' className={styles.homeLink} >Inicio</Link>
            <div className={styles.tabsContainer}>
                <span className={`${pathname.includes('my-info') ? styles.active: '' } ${styles.tab} `}
                onClick={()=> handleTabClick('my-info') }
                style={{marginRight : 8}}
                >
                    Mi informacion
                </span>
                <span className={`${pathname.includes('liked-events') ? styles.active: '' } ${styles.tab} `} 
                onClick={()=> handleTabClick('liked-events') }
                >
                    Eventos favoritos
                </span>
            </div>
            <Outlet/> {/*componente para crear rutas anidadas*/ }
        </div>
    )
}
export default Profile;