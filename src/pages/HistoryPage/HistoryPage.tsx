import { useEffect } from "react";
import { useStore } from "../../store/store";
import styles from "./HistoryPage.module.css";
import { NavLink } from "react-router-dom";
import type { RecordType } from "../../types/recordType";
import { Record } from "../../components/Record/Record";

export function HistoryPage() {
  const updatePage = useStore((state) => state.updatePage);
  const aggregatedStat = localStorage.getItem("aggregated_statistics");
  useStore((state) => state.history);
  const setHistory = useStore((state) => state.setHistory);

  const clearHistory = useStore((state) => state.clearHistory);

  useEffect(() => {
    updatePage("HistoryPage");
  }, [updatePage]);

  useEffect(() => {
    const stored = localStorage.getItem("aggregated_statistics");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, [setHistory]);
  return (
    <>
      <ul className={styles.records}>
        {aggregatedStat &&
          JSON.parse(aggregatedStat).map((record: RecordType) => {
            return <Record record={record} key={record.id} />;
          })}
      </ul>
      <div className={styles.button_container}>
        <NavLink to="/generate" className={styles.generate_more}>
          Сгенерировать больше
        </NavLink>
        <button className={styles.clear_all} onClick={clearHistory}>
          Очистить всё
        </button>
      </div>
    </>
  );
}
