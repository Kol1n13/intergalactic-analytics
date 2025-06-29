import { createPortal } from "react-dom";
import type { StatisticType } from "../../types/statisticType";
import styles from "./Modal.module.css";
import { Statistics } from "../Statistics/Statistics";

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
      <div data-testid="modal"
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
        <Statistics isModal={true} currData={data}/>
      </div>
    </div>,
    document.body,
  );
}
