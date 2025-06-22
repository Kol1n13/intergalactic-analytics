import { useEffect } from "react";
import { useStore } from "../../store/store";
import styles from './Statistics.module.css'
import { ProcessDate } from "./processDate";

export function Statistics(){
    const currData = useStore(state => state.currData);
    return (
        <>
            {useStore(state => state.analyticLoading) === 'notLoaded' || !currData
            ? <span className={styles.not_loaded_info}>Здесь появятся хайлайты</span>
            :
            <> 
            <ul className={styles.stats}>
                <li className={styles.stat}>
                    <h3 className={styles.stat_info} >{Math.round(currData.total_spend_galactic)}</h3>
                    <h4 className={styles.stat_title}>общие расходы в галактических кредитах</h4>
                </li>
                <li className={styles.stat}>
                    <h3 className={styles.stat_info}>{currData.less_spent_civ}</h3>
                    <h4 className={styles.stat_title}>цивилизация с минимальными расходами</h4>
                </li>
                <li className={styles.stat}>
                    <h3 className={styles.stat_info} >{currData.rows_affected}</h3>
                    <h4 className={styles.stat_title}>количество обработанных записей</h4>
                </li>
                <li className={styles.stat}>
                    <h3 className={styles.stat_info} >{ProcessDate(currData.big_spent_at)}</h3>
                    <h4 className={styles.stat_title}>день года с максимальными расходами</h4>
                </li>
                <li className={styles.stat}>
                    <h3 className={styles.stat_info} >{ProcessDate(currData.less_spent_at)}</h3>
                    <h4 className={styles.stat_title}>день года с минимальными расходами</h4>
                </li>
                <li className={styles.stat}>
                    <h3 className={styles.stat_info} >{Math.round(currData.big_spent_value)}</h3>
                    <h4 className={styles.stat_title}>максимальная сумма расходов за день</h4>
                </li>
                <li className={styles.stat}>
                    <h3 className={styles.stat_info} >{currData.big_spent_civ}</h3>
                    <h4 className={styles.stat_title}>цивилизация с максимальными расходами</h4>
                </li>
                <li className={styles.stat}>
                    <h3 className={styles.stat_info} >{Math.round(currData.average_spend_galactic)}</h3>
                    <h4 className={styles.stat_title}>средние расходы в галактических кредитах</h4>
                </li>
            </ul>
            </>}
        </>
    )
}