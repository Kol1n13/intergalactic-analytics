import { useRef, useState } from "react";
import styles from "./uploadForm.module.css";
import { useStore } from "../../store/store";
import { analizeFile } from "../../api/analize-file";
import { Loader } from "../Loader/Loader";

export function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const file = useStore((state) => state.file);
  const setFile = useStore((state) => state.setFile);
  const error = useStore((state) => state.analyticError);
  const setError = useStore((state) => state.setAnalyticError);
  const updateLoading = useStore((state) => state.updateAnalyticLoading);
  const updateCurrData = useStore((state) => state.updateCurrData);
  const loadingStatus = useStore((state) => state.analyticLoading);

  const isCSV = (f: File) =>
    f.type === "text/csv" || f.name.toLowerCase().endsWith(".csv");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    e.target.value = "";
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (f: File) => {
    if (isCSV(f)) {
      setFile(f);
      setError(null);
    } else {
      setFile(f);
      setError("упс, не то...");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || error) return;
    await analizeFile(file)
      .then((partedData) => {
        const storedStats = localStorage.getItem("aggregated_statistics");
        if (storedStats) {
          const pasredStats = JSON.parse(storedStats);
          pasredStats.push({
            fileName: file.name,
            date: new Date(),
            isProccessed: true,
            data: partedData,
          });
          localStorage.setItem(
            "aggregated_statistics",
            JSON.stringify(pasredStats),
          );
        } else {
          localStorage.setItem(
            "aggregated_statistics",
            JSON.stringify([
              {
                fileName: file.name,
                date: new Date(),
                isProccessed: true,
                data: partedData,
              },
            ]),
          );
        }
      })
      .catch(() => {
        useStore.getState().setAnalyticError("упс, что-то пошло не так");
        useStore.getState().updateAnalyticLoading("loaded");
        const storedStats = localStorage.getItem("aggregated_statistics");
        if (storedStats) {
          const pasredStats = JSON.parse(storedStats);
          pasredStats.push({
            fileName: file.name,
            date: new Date(),
            isProccessed: false,
            data: null,
          });
          localStorage.setItem(
            "aggregated_statistics",
            JSON.stringify(pasredStats),
          );
        } else {
          localStorage.setItem(
            "aggregated_statistics",
            JSON.stringify([
              {
                fileName: file.name,
                date: new Date(),
                isProccessed: false,
                data: null,
              },
            ]),
          );
        }
      });
  };

  const triggerFileInput = () => inputRef.current?.click();

  const handleRemove = () => {
    setFile(null);
    setError(null);
    updateLoading("notLoaded");
    updateCurrData(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${styles.dropzone} ${isDragging ? styles.dragging : ""} ${error ? styles.error : ""} ${file ? styles.loadedFile : ""}`}
    >
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {!file && loadingStatus !== "isLoading" && (
        <>
          <button
            type="button"
            onClick={triggerFileInput}
            className={styles.upload_button}
          >
            Загрузить файл
          </button>
          <p className={styles.additional_info}>или перетащите сюда</p>
        </>
      )}

      {file && loadingStatus !== "isLoading" && (
        <>
          <div className={styles.file_preview}>
            <span
              className={`${error && styles.file_name_error} ${styles.file_name} ${loadingStatus === "loaded" && styles.file_name_aggregated}`}
            >
              {file.name}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className={styles.remove_button}
            >
              ×
            </button>
          </div>
          {loadingStatus === "notLoaded"
            ? !error && <p className={styles.additional_info}>файл загружен!</p>
            : !error && <p className={styles.additional_info}>готово!</p>}
        </>
      )}

      {loadingStatus === "isLoading" && <Loader info="идёт парсинг файлов" />}

      {error && <p className={styles.error_message}>{error}</p>}
      {loadingStatus === "notLoaded" && !error && (
        <button
          type="submit"
          disabled={!file || !!error}
          className={styles.submit_button}
        >
          Отправить
        </button>
      )}
    </form>
  );
}
