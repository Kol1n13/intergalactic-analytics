import { useStore } from "../../store/store";
import styles from "./Statistics.module.css";
import stylesModal from "./Statistics.modal.module.css";
import { ProcessDate } from "./processDate";
import type { StatisticType } from "../../types/statisticType";

export function Statistics({isModal, currData} : {isModal : boolean, currData : StatisticType | null}) {
  return (
    <>
      {((useStore((state) => state.analyticLoading) === "notLoaded" && !isModal) ||
      !currData) ? (
        <span className={styles.not_loaded_info}>Здесь появятся хайлайты</span>
      ) : (
        <>
          <ul className={(isModal ? stylesModal : styles).stats}>
            <li className={(isModal ? stylesModal : styles).stat}>
              <h3 data-testid="total_spend_galactic" className={(isModal ? stylesModal : styles).stat_info}>
                {Math.round(currData.total_spend_galactic)}
              </h3>
              <h4 className={(isModal ? stylesModal : styles).stat_title}>
                общие расходы в галактических кредитах
              </h4>
            </li>
            <li className={(isModal ? stylesModal : styles).stat}>
              <h3 data-testid="less_spent_civ" className={(isModal ? stylesModal : styles).stat_info}>{currData.less_spent_civ}</h3>
              <h4 className={(isModal ? stylesModal : styles).stat_title}>
                цивилизация с минимальными расходами
              </h4>
            </li>
            <li className={(isModal ? stylesModal : styles).stat}>
              <h3 data-testid="rows_affected" className={(isModal ? stylesModal : styles).stat_info}>{currData.rows_affected}</h3>
              <h4 className={(isModal ? stylesModal : styles).stat_title}>
                количество обработанных записей
              </h4>
            </li>
            <li className={(isModal ? stylesModal : styles).stat}>
              <h3 data-testid="big_spent_at" className={(isModal ? stylesModal : styles).stat_info}>
                {ProcessDate(currData.big_spent_at)}
              </h3>
              <h4 className={(isModal ? stylesModal : styles).stat_title}>
                день года с максимальными расходами
              </h4>
            </li>
            <li className={(isModal ? stylesModal : styles).stat}>
              <h3 data-testid="less_spent_at" className={(isModal ? stylesModal : styles).stat_info}>
                {ProcessDate(currData.less_spent_at)}
              </h3>
              <h4 className={(isModal ? stylesModal : styles).stat_title}>
                день года с минимальными расходами
              </h4>
            </li>
            <li className={(isModal ? stylesModal : styles).stat}>
              <h3 data-testid="big_spent_value" className={(isModal ? stylesModal : styles).stat_info}>
                {Math.round(currData.big_spent_value)}
              </h3>
              <h4 className={(isModal ? stylesModal : styles).stat_title}>
                максимальная сумма расходов за день
              </h4>
            </li>
            <li className={(isModal ? stylesModal : styles).stat}>
              <h3 data-testid="big_spent_civ" className={(isModal ? stylesModal : styles).stat_info}>{currData.big_spent_civ}</h3>
              <h4 className={(isModal ? stylesModal : styles).stat_title}>
                цивилизация с максимальными расходами
              </h4>
            </li>
            <li className={(isModal ? stylesModal : styles).stat}>
              <h3 data-testid="average_spend_galactic" className={(isModal ? stylesModal : styles).stat_info}>
                {Math.round(currData.average_spend_galactic)}
              </h3>
              <h4 className={(isModal ? stylesModal : styles).stat_title}>
                средние расходы в галактических кредитах
              </h4>
            </li>
          </ul>
        </>
      )}
    </>
  );
}
