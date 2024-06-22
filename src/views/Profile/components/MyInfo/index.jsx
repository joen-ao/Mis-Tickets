import { useForm } from "react-hook-form";
import styles from './Myinfo.module.css';
import { useEffect } from "react";

const USER_DATA = 'userData';

const MyInfo =()=>{

    const {handleSubmit, register, formState: {errors}, setValue} = useForm();


    useEffect(()=>{
        try {
            const userData = JSON.parse( localStorage.getItem(USER_DATA))||{} ;

            setValue('name,' , userData.name);
            setValue('email,' , userData.email);
            setValue('age,' , userData.age);
        } catch (error) {
            console.error(error);
        }
    },[])


    const handleFormSubmit = (data) =>{
        try {
            localStorage.setItem(USER_DATA, JSON.stringify(data)); //guardar la data en el local storage
            alert('Usuario actualizado');
        } catch (error) {
            alert('ha ocurrido un error');
        }

    };

    console.log(errors);

    return(
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
            <label className={styles.label}>
                Name
                <input {...register('name', {required: true, minLength:1, maxLength: 120 })} className={styles.input} />
            </label>
            <label className={styles.label}>
                Email
                <input {...register('email', {required: true, minLength:1, maxLength: 120})} className={styles.input} />
            </label>
            <label className={styles.label}>
                Age
                <input {...register('age', {required: true, min: 18, max:100, valueAsNumber: true})}
                 className={styles.input}
                  type="number" />
            </label>
            <button type="submit" className={styles.submitButton}>Save</button>
        </form>
    )
};
export default MyInfo;