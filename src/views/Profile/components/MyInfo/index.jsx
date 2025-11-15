import { useForm } from "react-hook-form";
import { useEffect } from "react";

const USER_DATA = 'userData';

const MyInfo = () => {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

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

    const handleSubmitForm = (data) => {
        try {
            localStorage.setItem(USER_DATA, JSON.stringify(data));
            alert('Información actualizada correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al guardar la información');
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">Información Personal</h2>
                
                <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                            Nombre completo
                        </label>
                        <input 
                            {...register('name', { required: true, minLength: 1, maxLength: 120 })} 
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Ingresa tu nombre"
                        />
                        {errors.name && <span className="text-sm text-red-500">El nombre es requerido</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                            Correo electrónico
                        </label>
                        <input 
                            {...register('email', { 
                                required: true, 
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                            })} 
                            type="email"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="correo@ejemplo.com"
                        />
                        {errors.email && <span className="text-sm text-red-500">Ingresa un correo válido</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                                Edad
                            </label>
                            <input 
                                {...register('age', { required: true, min: 18, max: 100, valueAsNumber: true })} 
                                type="number"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="18"
                            />
                            {errors.age && <span className="text-sm text-red-500">Edad: 18-100</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                                Código Postal
                            </label>
                            <input 
                                {...register('zipcode', { required: true, minLength: 4, maxLength: 10 })} 
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="12345"
                            />
                            {errors.zipcode && <span className="text-sm text-red-500">Requerido</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                                Teléfono
                            </label>
                            <input 
                                {...register('phone', { required: true, minLength: 10, maxLength: 15 })} 
                                type="tel"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="1234567890"
                            />
                            {errors.phone && <span className="text-sm text-red-500">Teléfono inválido</span>}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary text-white text-base font-bold hover:bg-primary/90 transition-colors shadow-lg"
                        >
                            <span className="material-symbols-outlined">save</span>
                            <span>Actualizar información</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyInfo;
