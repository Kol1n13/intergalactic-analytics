import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useStore } from "../../store/store";
import { ProcessFile } from "../../api/process-file";
import userEvent from "@testing-library/user-event";
import { UploadForm } from "../../components/uploadForm/uploadForm";

vi.mock("../../api/process-file.ts", async () => {
    const origin = await vi.importActual<typeof ProcessFile>("../../api/generate-file");
    return {
        ...origin,
        ProcessFile: vi.fn(),
    };
}); // Мокаем фетч запрос

describe("тесты отправки файла на сервер на обработку", () => {
    beforeEach(() => {
        useStore.getState().setFile(null);
        useStore.getState().setAnalyticError(null);
        useStore.getState().updateAnalyticLoading('notLoaded');
        useStore.getState().clearHistory();
    }); // Хранилище -> в начальное состояние

    afterEach(() =>{
        cleanup();
    })

    test("успешная отправка и обработка файла", async () =>{
        (ProcessFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise((resolve) => {resolve('success')})
        );
        const {getByTestId} = render(
            <UploadForm />
        );
        const testFile = new File([""], "test.csv", {
            type: "text/csv",
        });

        
        const input = getByTestId("uploadInput") as HTMLInputElement;
        fireEvent.change(input, { target: { files: [testFile] } });
        const submitBtn = getByTestId("submitBtn");
        await userEvent.click(submitBtn);
        const loadingStatus = useStore.getState().analyticLoading;
        const localData = localStorage.getItem("aggregated_statistics");
        const stat_counter = localStorage.getItem("stat_counter");
        if (!localData || !stat_counter)
            throw new Error("Ошибка сохранения данных");
        
        expect(JSON.parse(localData).length).toBe(1);
        expect(stat_counter).toBe("1");
        expect(loadingStatus).toBe('loaded');
        expect(getByTestId("analysedFile").innerHTML).toBe("готово!");
    });

    test("ошибка при обработке файла", async () =>{
        (ProcessFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise((_resolve, reject) => {reject('failure')})
        );
        const {getByTestId} = render(
            <UploadForm />
        );
        const testFile = new File([""], "test.csv", {
            type: "text/csv",
        });


        const input = getByTestId("uploadInput") as HTMLInputElement;
        fireEvent.change(input, { target: { files: [testFile] } });
        const submitBtn = getByTestId("submitBtn");
        await userEvent.click(submitBtn);
        const loadingStatus = useStore.getState().analyticLoading;
        const localData = localStorage.getItem("aggregated_statistics");
        const stat_counter = localStorage.getItem("stat_counter");
        if (!localData || !stat_counter)
            throw new Error("Ошибка сохранения данных");
        
        expect(JSON.parse(localData).length).toBe(1);
        expect(stat_counter).toBe("1");
        expect(loadingStatus).toBe('loaded');
        expect(getByTestId("analyseError").innerHTML).toBe("упс, что-то пошло не так")
    })
})