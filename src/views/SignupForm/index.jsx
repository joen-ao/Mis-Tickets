import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const USER_DATA = 'userData';

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem(USER_DATA)) || {};
            setValue('name', userData.name);
            setValue('email', userData.email);
            setValue('age', userData.age);
            setValue('zipcode', userData.zipcode);
            setValue('phone', userData.phone);
        } catch (error) {
            console.error(error);
        }
    }, [setValue]);

    const handleFormSubmit = (data) => {
        try {
            localStorage.setItem(USER_DATA, JSON.stringify(data));
            alert('¡Registro exitoso! Bienvenido a Mis Tickets');
            navigate('/');
        } catch (error) {
            alert('Ha ocurrido un error al registrarte');
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        <Navbar/>
                        
                        <main className="flex flex-col items-center justify-center py-12 px-4">
                            <div className="w-full max-w-md">
                                <div className="text-center mb-8">
                                    <h1 className="text-slate-900 dark:text-slate-50 text-4xl font-black leading-tight tracking-[-0.033em] mb-2">
                                        Crear cuenta
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-base">
                                        Únete para descubrir los mejores eventos
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-lg p-8">
                                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                                                Nombre completo
                                            </label>
                                            <input 
                                                {...register('name', { 
                                                    required: 'El nombre es requerido',
                                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                                })} 
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                placeholder="Juan Pérez"
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-500 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">error</span>
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                                                Correo electrónico
                                            </label>
                                            <input 
                                                {...register('email', { 
                                                    required: 'El correo es requerido',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Correo inválido'
                                                    }
                                                })} 
                                                type="email"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                placeholder="correo@ejemplo.com"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-500 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">error</span>
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                                                    Edad
                                                </label>
                                                <input 
                                                    {...register('age', { 
                                                        required: 'Requerido',
                                                        min: { value: 18, message: 'Mín. 18' },
                                                        max: { value: 100, message: 'Máx. 100' },
                                                        valueAsNumber: true 
                                                    })} 
                                                    type="number"
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                    placeholder="18"
                                                />
                                                {errors.age && (
                                                    <p className="text-xs text-red-500">{errors.age.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                                                    Código Postal
                                                </label>
                                                <input 
                                                    {...register('zipcode', { 
                                                        required: 'Requerido',
                                                        minLength: { value: 4, message: 'Mín. 4' }
                                                    })} 
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                    placeholder="12345"
                                                />
                                                {errors.zipcode && (
                                                    <p className="text-xs text-red-500">{errors.zipcode.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                                                    Teléfono
                                                </label>
                                                <input 
                                                    {...register('phone', { 
                                                        required: 'Requerido',
                                                        minLength: { value: 10, message: 'Mín. 10' }
                                                    })} 
                                                    type="tel"
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                    placeholder="1234567890"
                                                />
                                                {errors.phone && (
                                                    <p className="text-xs text-red-500">{errors.phone.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button 
                                                type="submit" 
                                                className="w-full flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary text-white text-base font-bold hover:bg-primary/90 transition-colors shadow-lg"
                                            >
                                                <span className="material-symbols-outlined">person_add</span>
                                                <span>Registrarse</span>
                                            </button>
                                        </div>

                                        <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                ¿Ya tienes cuenta?{' '}
                                                <button 
                                                    type="button"
                                                    onClick={() => navigate('/profile/my-info')}
                                                    className="text-primary font-semibold hover:underline"
                                                >
                                                    Ver mi perfil
                                                </button>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SignupForm;