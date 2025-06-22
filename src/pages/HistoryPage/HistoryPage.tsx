import { use, useEffect } from "react";
import { useStore } from "../../store/store";
import styles from "./HistoryPage.module.css"
import { Link } from "react-router-dom";
import type { StatisticType } from "../../types/statisticType";
import type { RecordType } from "../../types/recordType";
import { Record } from "../../components/Record/Record";

export function HistoryPage() {
  const updatePage = useStore((state) => state.updatePage);
  const aggregatedStat = localStorage.getItem('aggregated_statistics');
  const history = useStore((state) => state.history);
  const setHistory = useStore((state) => state.setHistory);

  const clearHistory = useStore((state) => state.clearHistory)

  useEffect(() => {
    updatePage("HistoryPage");
  }, [updatePage]);

  useEffect(() => {
    const stored = localStorage.getItem('aggregated_statistics');
    if (stored) {
        setHistory(JSON.parse(stored));
    }
    }, []);
  return (
  <>
    <ul className={styles.records}>
        {
            aggregatedStat && (
                JSON.parse(aggregatedStat).map((record : RecordType) => {
                    return (
                        <Record record={record} key={record.id}/>
                    )
                })
            )
        }
    </ul>
    <div className={styles.button_container}>
        <Link to='/generate' className={styles.generate_more}>Сгенерировать больше</Link>
        <button className={styles.clear_all} onClick={clearHistory}>Очистить всё</button>
    </div>
  </>);
}
