import { useEffect } from "react";
import { useStore } from "../../store/store";
import styles from "./MainPage.module.css";
import { UploadForm } from "../../components/uploadForm/uploadForm";
import { Statistics } from "../../components/Statistics/Statistics";

export function MainPage() {
  const updatePage = useStore((state) => state.updatePage);

  useEffect(() => {
    updatePage("MainPage");
  }, [updatePage]);
  return (
    <>
      <h1 data-testid="mainpage-classifier" className={styles.short_info}>
        Загрузите <b>csv</b> и получите <b>полную информацию</b> о нём за
        сверхкороткое время
      </h1>
      <UploadForm />
      <Statistics isModal={false} currData={useStore((state) => state.currData)}/>
    </>
  );
}
