import { useForm } from "react-hook-form";
import styles from './Myinfo.module.css';
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
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
            <label className={styles.label}>
                Name
                <input {...register('name', { required: true, minLength: 1, maxLength: 120 })} className={styles.input} />
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
                Age
                <input {...register('age', { required: true, min: 18, max: 100, valueAsNumber: true })} className={styles.input} type="number" />
                <span className={styles.highlight}></span>
                <span className={styles.bar}></span>
            </label>
            <label className={styles.label}>
                ZipCode
                <input {...register('zipcode', { required: true, min: 18, max: 100, valueAsNumber: true })} className={styles.input}  />
                <span className={styles.highlight}></span>
                <span className={styles.bar}></span>
            </label>
            <label className={styles.label}>
                Telefono
                <input {...register('phone', { required: true, min: 18, max: 100, valueAsNumber: true })} className={styles.input}  />
                <span className={styles.highlight}></span>
                <span className={styles.bar}></span>
            </label>
            <button type="submit" className={styles.submitButton}>Actualizar</button>
        </form>
    );
};

export default MyInfo;
