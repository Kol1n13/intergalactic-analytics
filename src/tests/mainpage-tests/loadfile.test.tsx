import {afterEach, beforeEach, describe, expect, test} from 'vitest'
import { useStore } from '../../store/store';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { UploadForm } from '../../components/uploadForm/uploadForm';
import events from '@testing-library/user-event'

describe("тесты на загрузку файла в формочку на главное странице", () => {
    beforeEach(() => {
        useStore.getState().setFile(null);
        useStore.getState().setAnalyticError(null);
    }); // Хранилище -> в начальное состояние

    afterEach(() =>{
        cleanup();
    })

    test("загрузка .csv файла через input", async () => {
        const {getByTestId} = render(
            <UploadForm />
        );
        const testFile = new File([""], "test.csv", {
            type: "text/csv",
        });

        const input = getByTestId("uploadInput") as HTMLInputElement;
        await events.upload(input, testFile);

        expect(input.files?.length).toBe(0);
         // Чтобы input не баговал при повторной загрузке того же файла, после сохранения файла, его значение сбрасывается
        expect(useStore.getState().file).toBe(testFile);
        expect(useStore.getState().analyticError).toBeNull();
        expect(getByTestId("uploadedFile").innerHTML).toBe('файл загружен!')
    });

    test("загрузка НЕ .csv файла через input", async () => {
        const testFile = new File([""], "test.txt", {
            type: "plain/text",
        });

        useStore.getState().validateAndSetFile(testFile); 
        // Технически можно загрузить в input не csv файл через . в проводнике,
        //  но так не получится сделать через events.upload, правда этот способ не обновляет рендер

        expect(useStore.getState().file).toBe(testFile);
        expect(useStore.getState().analyticError).toBe("упс, не то...");
    });

    test("загрузка .csv файла через drag & drop", () =>{
        const {getByTestId} = render(
            <UploadForm />
        );
        const testFile = new File([], "test.csv", {
            type: "text/csv",
        });

        const uploadForm = getByTestId("uploadForm");
        fireEvent.drop(uploadForm, {dataTransfer: {files: [testFile]}});
         // а ещё у events нет операций для drag & drop (ну или может я не понял как)


        expect(useStore.getState().file?.name).toBe("test.csv");
        expect(useStore.getState().analyticError).toBeNull();
        expect(getByTestId("uploadedFile").innerHTML).toBe('файл загружен!')
    })

    test ("загрузка НЕ .csv файла через drag & drop", () =>{
        const {getByTestId} = render(
            <UploadForm />
        );
        const testFile = new File([], "test.txt", {
            type: "plain/text",
        });

        const uploadForm = getByTestId("uploadForm");
        fireEvent.drop(uploadForm, {dataTransfer: {files: [testFile]}});
        

        expect(useStore.getState().file?.name).toBe("test.txt");
        expect(useStore.getState().analyticError).toBe('упс, не то...');
        expect(getByTestId("analyseError").innerHTML).toBe('упс, не то...')
    })
})