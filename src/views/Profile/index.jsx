import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Profile = ()=>{
    const {pathname} = useLocation();
    const navigate = useNavigate();
    
    const handleTabClick = (path) =>{
        navigate(`/profile/${path}`);
    }

    return(
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        <Navbar/>
                        
                        <main className="flex flex-col gap-8 mt-8">
                            <div className="flex flex-wrap justify-between gap-4 px-6">
                                <div className="flex min-w-72 flex-col gap-2">
                                    <p className="text-slate-900 dark:text-slate-50 text-4xl font-black leading-tight tracking-[-0.033em]">
                                        Mi Perfil
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                                        Gestiona tu información personal y eventos favoritos
                                    </p>
                                </div>
                            </div>
                            
                            {/* Tabs */}
                            <div className="flex border-b border-slate-200 dark:border-slate-800 px-6">
                                <button
                                    onClick={() => handleTabClick('my-info')}
                                    className={`px-4 py-3 text-base font-semibold transition-colors relative ${
                                        pathname.includes('my-info')
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                                    }`}
                                >
                                    Mi información
                                </button>
                                <button
                                    onClick={() => handleTabClick('liked-events')}
                                    className={`px-4 py-3 text-base font-semibold transition-colors relative ${
                                        pathname.includes('liked-events')
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                                    }`}
                                >
                                    Eventos favoritos
                                </button>
                            </div>
                            
                            {/* Content */}
                            <div className="px-6">
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Profile;