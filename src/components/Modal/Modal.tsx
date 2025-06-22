import { createPortal } from "react-dom";
import type { StatisticType } from "../../types/statisticType";
import { ProcessDate } from "../Statistics/processDate";
import styles from "./Modal.module.css";

export function Modal({
  isOpen,
  setModalState,
  data,
}: {
  isOpen: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  data: StatisticType;
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal_overlay}>
      <div
        className={styles.modal_content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          onClick={() => setModalState(false)}
          className={styles.close_button}
        >
          ×
        </button>
        <ul className={styles.stats}>
          <li className={styles.stat}>
            <h3 className={styles.stat_info}>
              {Math.round(data.total_spend_galactic)}
            </h3>
            <h4 className={styles.stat_title}>
              общие расходы в галактических кредитах
            </h4>
          </li>
          <li className={styles.stat}>
            <h3 className={styles.stat_info}>{data.less_spent_civ}</h3>
            <h4 className={styles.stat_title}>
              цивилизация с минимальными расходами
            </h4>
          </li>
          <li className={styles.stat}>
            <h3 className={styles.stat_info}>{data.rows_affected}</h3>
            <h4 className={styles.stat_title}>
              количество обработанных записей
            </h4>
          </li>
          <li className={styles.stat}>
            <h3 className={styles.stat_info}>
              {ProcessDate(data.big_spent_at)}
            </h3>
            <h4 className={styles.stat_title}>
              день года с максимальными расходами
            </h4>
          </li>
          <li className={styles.stat}>
            <h3 className={styles.stat_info}>
              {ProcessDate(data.less_spent_at)}
            </h3>
            <h4 className={styles.stat_title}>
              день года с минимальными расходами
            </h4>
          </li>
          <li className={styles.stat}>
            <h3 className={styles.stat_info}>
              {Math.round(data.big_spent_value)}
            </h3>
            <h4 className={styles.stat_title}>
              максимальная сумма расходов за день
            </h4>
          </li>
          <li className={styles.stat}>
            <h3 className={styles.stat_info}>{data.big_spent_civ}</h3>
            <h4 className={styles.stat_title}>
              цивилизация с максимальными расходами
            </h4>
          </li>
          <li className={styles.stat}>
            <h3 className={styles.stat_info}>
              {Math.round(data.average_spend_galactic)}
            </h3>
            <h4 className={styles.stat_title}>
              средние расходы в галактических кредитах
            </h4>
          </li>
        </ul>
      </div>
    </div>,
    document.body,
  );
}
