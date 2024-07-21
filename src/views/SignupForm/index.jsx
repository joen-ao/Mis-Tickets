import { useForm } from "react-hook-form";
import styles from './Signup.module.css';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";

const USER_DATA = 'userData';

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

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
            localStorage.setItem(USER_DATA, JSON.stringify(data)); //guardar la data en el local storage
            alert('Usuario actualizado');
        } catch (error) {
            alert('ha ocurrido un error');
        }
    };

    console.log(errors);

    return (
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                <label className={styles.label}>
                    Nombre
                    <input {...register('name', { required: true })} className={styles.input} />
                    <span className={styles.highlight}></span>
                    <span className={styles.bar}></span>
                </label>
                <label className={styles.label}>
                    Email
                    <input {...register('email', { required: true, minLength: 1, maxLength: 120 })} className={styles.input} />
                    <span className={styles.highlight}></span>
                    <span className={styles.bar}></span>
                </label>
                <label className={styles.label}>
                    Edad
                    <input {...register('age', { required: true, valueAsNumber: true })} className={styles.input} type="number" />
                    <span className={styles.highlight}></span>
                    <span className={styles.bar}></span>
                </label>
                <label className={styles.label}>
                    ZipCode
                    <input {...register('zipcode', { required: true })} className={styles.input} />
                    <span className={styles.highlight}></span>
                    <span className={styles.bar}></span>
                </label>
                <label className={styles.label}>
                    Telefono
                    <input {...register('phone', { required: true })} className={styles.input} />
                    <span className={styles.highlight}></span>
                    <span className={styles.bar}></span>
                </label>
                <div>
                    <button type='submit' className={styles.submitButton}>Registrarse</button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;