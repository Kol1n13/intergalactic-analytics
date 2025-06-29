import { fireEvent } from "@testing-library/dom";
import { cleanup, render } from "@testing-library/react";
import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";
import { useStore } from "../../store/store";
import { ProcessFile } from "../../api/process-file";
import { UploadForm } from "../../components/uploadForm/uploadForm";
import { AnalyseFile } from "../../api/analyse-file";

vi.mock("../../api/process-file.ts", async () => {
    const origin = await vi.importActual<typeof ProcessFile>("../../api/generate-file");
    return {
        ...origin,
        ProcessFile: vi.fn(),
    };
}); // Мокаем фетч запрос

describe("тесты сброса состояния главной страницы", () => {
    beforeEach(() => {
        useStore.getState().setFile(null);
        useStore.getState().setAnalyticError(null);
        useStore.getState().updateAnalyticLoading('notLoaded');
    }); // Хранилище -> в начальное состояние

    afterEach(() =>{
        cleanup();
    })

    test("сброс до начально состояния после успешной загрузки файла", () =>{
        const {getByTestId} = render(
            <UploadForm />
        );
        const testFile = new File([""], "test.csv", {
            type: "text/csv",
        });


        const input = getByTestId("uploadInput") as HTMLInputElement;
        fireEvent.change(input, { target: { files: [testFile] } });
        const resetBtn = getByTestId("resetter");
        fireEvent.click(resetBtn);

        expect(useStore.getState().file).toBeNull();
    
    });

    test("сброс до начально состояния после ошибки загрузки файла", () =>{
        const {getByTestId} = render(
            <UploadForm />
        );
        const testFile = new File([""], "test.txt", {
            type: "plain/text",
        });

        const input = getByTestId("uploadInput") as HTMLInputElement;
        fireEvent.change(input, { target: { files: [testFile] } });
        const resetBtn = getByTestId("resetter");
        fireEvent.click(resetBtn);

        expect(useStore.getState().file).toBeNull();
        expect(useStore.getState().analyticError).toBeNull();
    
    });

    test("сброс до начально состояния после успешной обработки файла", async () =>{
         (ProcessFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise((resolve) => {resolve('success')})
        );
        const {getByTestId} = render(
            <UploadForm />
        );
         const testFile = new File([""], "test.csv", {
            type: "text/csv",
        });
        useStore.setState({file: testFile});


        await AnalyseFile(testFile);
        const resetBtn = getByTestId("resetter");
        fireEvent.click(resetBtn);

        expect(useStore.getState().file).toBeNull();
        expect(useStore.getState().analyticLoading).toBe('notLoaded');
    });

    test("сброс до начально состояния после ошибки при обработке файла", async () =>{
         (ProcessFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise((_resolve, reject) => {reject('failure')})
        );
        const {getByTestId} = render(
            <UploadForm />
        );
         const testFile = new File([""], "test.csv", {
            type: "text/csv",
        });
        useStore.setState({file: testFile});


        await AnalyseFile(testFile);
        const resetBtn = getByTestId("resetter");
        fireEvent.click(resetBtn);

        expect(useStore.getState().file).toBeNull();
        expect(useStore.getState().analyticLoading).toBe('notLoaded');
        expect(useStore.getState().analyticError).toBeNull();
    });
})  
  
