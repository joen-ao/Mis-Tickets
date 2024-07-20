import { useForm } from "react-hook-form";
import styles from './Signup.module.css';
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
            <Link to='/' className={styles.homeLink}>Inicio</Link>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
                <label className={styles.label}>
                    Name
                    <input {...register('name', { required: true })} className={styles.input} />
                </label>
                <label className={styles.label}>
                    Email
                    <input {...register('email', { required: true, minLength: 1, maxLength: 120 })} className={styles.input} />
                </label>
                <label className={styles.label}>
                    Age
                    <input {...register('age', { required: true, valueAsNumber: true })} className={styles.input} type="number" />
                </label>
                <label className={styles.label}>
                    ZipCode
                    <input {...register('zipcode', { required: true })} className={styles.input} />
                </label>
                <label className={styles.label}>
                    Phone
                    <input {...register('phone', { required: true })} className={styles.input} />
                </label>
                <div>
                    <button type='submit' className={styles.submitButton}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;