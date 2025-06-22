import { useEffect } from "react";
import { useStore } from "../../store/store";
import styles from "./GeneratePage.module.css";
import { Loader } from "../../components/Loader/Loader";
import { GenerateFile } from "../../api/generate-file";

export function GeneratePage() {
  const updatePage = useStore((state) => state.updatePage);
  const loadingStatus = useStore((state) => state.generativeLoading);
  const updateLoading = useStore((state) => state.updateGenerativeLoading);
  const error = useStore((state) => state.generativeError);
  const setError = useStore((state) => state.setGenerativeError);

  const handleRemove = () => {
    setError(null);
    updateLoading("notLoaded");
  };

  const generateFile = async () => {
    updateLoading("isLoading");
    await GenerateFile()
      .then(() => {
        updateLoading("loaded");
      })
      .catch(() => {
        setError("error");
        updateLoading("loaded");
      });
  };

  useEffect(() => {
    updatePage("GeneratePage");
  }, [updatePage]);
  return (
    <div className={styles.generate_container}>
      <h1 className={styles.short_info}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </h1>
      {loadingStatus === "notLoaded" && (
        <button
          type="button"
          onClick={generateFile}
          className={styles.generate_button}
        >
          <b>Начать генерацию</b>
        </button>
      )}
      {loadingStatus === "isLoading" && (
        <Loader info="идёт процесс генерации" />
      )}
      {loadingStatus === "loaded" && (
        <>
          <div className={styles.result_box}>
            {!error ? (
              <span className={styles.success}>Done!</span>
            ) : (
              <span className={styles.error}>Ошибка</span>
            )}
            <button
              type="button"
              onClick={handleRemove}
              className={styles.remove_button}
            >
              ×
            </button>
          </div>
          {!error ? (
            <p className={styles.success_info}>файл сгенерирован!</p>
          ) : (
            <p className={styles.error_info}>Упс, что-то пошло не так</p>
          )}
        </>
      )}
    </div>
  );
}
