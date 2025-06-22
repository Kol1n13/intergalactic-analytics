import { Link } from "react-router-dom"
import { useStore } from "../../store/store"
import styles from "./Header.module.css"

export function Header(){
    const currPage = useStore((state) => state.page)
    return (
        <>
            <header className={styles.page__header}>
                <img src="/img/logo.svg" alt="Logo" className={styles.logo}/>
                <ul className={styles.links}>
                    <li>
                        <Link to="/" className={`${styles.link} ${currPage === "MainPage" && styles.underline_link}`}> 
                            <img className={styles.header_icon} src="/img/upload.svg" />
                            <span>CSV Аналитик</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/generate" className={`${styles.link} ${currPage === "GeneratePage" && styles.underline_link}`}>
                            <img className={styles.header_icon} src="/img/generate.svg" />
                            <span>CSV Генератор</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/history"  className={`${styles.link} ${currPage === "HistoryPage" && styles.underline_link}`}>
                            <img className={styles.header_icon} src="/img/history.svg" />
                            <span>История</span>
                        </Link>
                    </li>
                </ul>
            </header>
        </>
    )
}