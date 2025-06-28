import { NavLink } from "react-router-dom";
import { useStore } from "../../store/store";
import styles from "./Header.module.css";

export function Header() {
  const currPage = useStore((state) => state.page);
  return (
    <>
      <header className={styles.page__header}>
        <img src="/img/logo.svg" alt="Logo" className={styles.logo} />
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              className={`${styles.link} ${currPage === "MainPage" && styles.underline_link}`}
            >
              <img className={styles.header_icon} src="/img/upload.svg" />
              <span>CSV Аналитик</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/generate"
              className={`${styles.link} ${currPage === "GeneratePage" && styles.underline_link}`}
            >
              <img className={styles.header_icon} src="/img/generate.svg" />
              <span>CSV Генератор</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={`${styles.link} ${currPage === "HistoryPage" && styles.underline_link}`}
            >
              <img className={styles.header_icon} src="/img/history.svg" />
              <span>История</span>
            </NavLink>
          </li>
        </ul>
      </header>
    </>
  );
}
