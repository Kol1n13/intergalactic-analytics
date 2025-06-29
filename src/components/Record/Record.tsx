import { useState } from "react";
import type { RecordType } from "../../types/recordType";
import { Modal } from "../Modal/Modal";
import styles from "./Record.module.css";
import { useStore } from "../../store/store";

export function Record({ record }: { record: RecordType }) {
  const [isModalOpen, setModalState] = useState(false);
  const deleteRecord = useStore((state) => state.deleteRecord);

  return (
    <li data-testid="record" className={styles.record}>
      <div
        data-testid="record-frame"
        className={`${styles.record__info} ${record.isProccessed && styles.record_pointer}`}
        onClick={
          record.isProccessed
            ? () => setModalState(true)
            : () => {
                return;
              }
        }
      >
        <div className={`${styles.data} ${styles.file_name}`}>
          <img src="../../../img/file-icon.svg" className={styles.icon} />
          <span title={record.fileName}>{record.fileName}</span>
        </div>
        <span>
          {new Intl.DateTimeFormat("ru-RU").format(new Date(record.date))}
        </span>
        <div
          className={`${styles.data} ${!record.isProccessed && styles.not_active}`}
        >
          <span>Обработан успешно</span>
          <img src="../../../img/smile-icon.svg" className={styles.icon} />
        </div>
        <div
          className={`${styles.data} ${record.isProccessed && styles.not_active}`}
        >
          <span>Не удалось обработать</span>
          <img src="../../../img/sad-icon.svg" className={styles.icon} />
        </div>
      </div>
      <button
        className={styles.trash}
        data-testid="deleteBtn"
        onClick={() => {
          deleteRecord(record.id);
        }}
      >
        <img src="../../../img/trash-icon.svg" className={styles.icon} />
      </button>
      {record.data && (
        <>
          <Modal
            isOpen={isModalOpen}
            setModalState={setModalState}
            data={record.data}
          />
        </>
      )}
    </li>
  );
}
