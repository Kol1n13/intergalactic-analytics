import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useStore } from "../../store/store";
import { GenerateFile } from "../../api/generate-file";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GeneratePage } from "../../pages/GeneratePage/GeneratePage";

vi.mock("../../api/generate-file.ts", async () => {
    const origin = await vi.importActual<typeof GenerateFile>("../../api/generate-file");
    return {
        ...origin,
        GenerateFile: vi.fn(),
    };
}); // Мокаем фетч запрос

describe("тесты страницы генерации", () =>{
    beforeEach(() => {
        useStore.getState().updateGenerativeLoading("notLoaded");
        useStore.getState().setGenerativeError(null);
    }); // Хранилище -> в начальное состояние

    afterEach(() => {
        cleanup(); // Чисти чисти чисти
    })

    test('отображение лоадера',  async () => {
        (GenerateFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise(() => {}) // вечно pending промис
        );
        const {getByTestId} = render(
            <GeneratePage />
        );
        const generateBtn = getByTestId("startGenerationBtn");

        
        await userEvent.click(generateBtn);
        const loadingStatus = useStore.getState().generativeLoading;
        const loader = getByTestId("loader");


        expect(loadingStatus).toBe('isLoading') // проверяем правильность данных в хранилище
        expect(loader).not.toBeNull();
    });

    test("успех при скачивании файла", async () => {
        (GenerateFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise((resolve) => resolve('success'))
        );
        const {getByTestId} = render(
            <GeneratePage />
        );
        const generateBtn = getByTestId("startGenerationBtn");


        await userEvent.click(generateBtn);
        const loadingStatus = useStore.getState().generativeLoading;
        const errorStatus = useStore.getState().generativeError;
        const generationResult = getByTestId("generateSuccess");


        expect(loadingStatus).toBe('loaded');
        expect(errorStatus).toBeNull();
        expect(generationResult).not.toBeNull();
    });

    test("отображение ошибки при неполадках", async () => {
        (GenerateFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise((_resolve, reject) => reject('failure'))
        );
        const {getByTestId} = render(
            <GeneratePage />
        );
        const generateBtn = getByTestId("startGenerationBtn");


        await userEvent.click(generateBtn);
        const loadingStatus = useStore.getState().generativeLoading;
        const errorStatus = useStore.getState().generativeError;
        const generationResult = getByTestId("generateFailure");

        
        expect(loadingStatus).toBe('loaded');
        expect(errorStatus).toBe('error');
        expect(generationResult).not.toBeNull();
    });

    test("сброс до начально состояния при успехе", async () =>{
        (GenerateFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise((resolve) => resolve('success'))
        );
        const {getByTestId} = render(
            <GeneratePage />
        );
        const generateBtn = getByTestId("startGenerationBtn");

        await userEvent.click(generateBtn);
        const resetBtn = getByTestId("backToInitialBtn");
        await userEvent.click(resetBtn);
        const loadingStatus = useStore.getState().generativeLoading;

        expect(loadingStatus).toBe('notLoaded');
    });

    test("сброс до начально состояния при ошибке", async () =>{
        (GenerateFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
            new Promise((_resolve, reject) => reject('failure'))
        );
        const {getByTestId} = render(
            <GeneratePage />
        );
        const generateBtn = getByTestId("startGenerationBtn");

        await userEvent.click(generateBtn);
        const resetBtn = getByTestId("backToInitialBtn");
        await userEvent.click(resetBtn);
        const loadingStatus = useStore.getState().generativeLoading;

        expect(loadingStatus).toBe('notLoaded');
    });
})