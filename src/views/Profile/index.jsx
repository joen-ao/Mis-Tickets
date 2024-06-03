import { Outlet } from "react-router-dom";

const Profile = ()=>{
    return(
        <div>
            Profile
            <Outlet/> {/*componente para crear rutas anidadas*/ }
        </div>
    )
}
export default Profile;