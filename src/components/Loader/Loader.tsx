import styles from './Loader.module.css'

export function Loader({info} : {info : string}){
    return (
        <>
            <div className={styles.loader_box}>
                <span className={styles.loader}></span>
            </div>
            <p className={styles.additional_info}>{info}</p>
        </>
    )
}