import { useRef, useState } from "react";
import styles from "./uploadForm.module.css";
import { useStore } from "../../store/store";
import { AnalyseFile } from "../../api/analyse-file";
import { Loader } from "../Loader/Loader";

export function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const file = useStore((state) => state.file);
  const setFile = useStore((state) => state.setFile);
  const validateAndSetFile = useStore((state) => state.validateAndSetFile)
  const error = useStore((state) => state.analyticError);
  const setError = useStore((state) => state.setAnalyticError);
  const updateLoading = useStore((state) => state.updateAnalyticLoading);
  const updateCurrData = useStore((state) => state.updateCurrData);
  const loadingStatus = useStore((state) => state.analyticLoading);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || error) return;
    useStore.getState().updateAnalyticLoading("isLoading");
    await AnalyseFile(file);
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
      data-testid="uploadForm"
      className={`${styles.dropzone} ${isDragging ? styles.dragging : ""} ${error ? styles.error : ""} ${file ? styles.loadedFile : ""}`}
    >
      <input
        type="file"
        data-testid="uploadInput"
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
              data-testid="resetter"
              onClick={handleRemove}
              className={styles.remove_button}
            >
              ×
            </button>
          </div>
          {loadingStatus === "notLoaded"
            ? !error && <p data-testid="uploadedFile" className={styles.additional_info}>файл загружен!</p>
            : !error && <p data-testid="analysedFile" className={styles.additional_info}>готово!</p>}
        </>
      )}

      {loadingStatus === "isLoading" && <Loader info="идёт парсинг файлов" />}

      {error && <p data-testid="analyseError" className={styles.error_message}>{error}</p>}
      {loadingStatus === "notLoaded" && !error && (
        <button
          type="submit"
          data-testid="submitBtn"
          disabled={!file || !!error}
          className={styles.submit_button}
        >
          Отправить
        </button>
      )}
    </form>
  );
}
