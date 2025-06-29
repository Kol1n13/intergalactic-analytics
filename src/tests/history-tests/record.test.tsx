import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { useStore } from "../../store/store";
import { cleanup, render, screen } from "@testing-library/react";
import { HistoryPage } from "../../pages/HistoryPage/HistoryPage";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import type { RecordType } from "../../types/recordType";

describe("тесты генерации записей на странице истории", () =>{
    const testData1 : RecordType = {
        fileName: "test.csv",
        date: new Date(),
        isProccessed: false,
        data: null,
        id: 1,
    }
    const testData2 : RecordType = {
        fileName: "test2.csv",
        date: new Date(),
        isProccessed: false,
        data: null,
        id: 2,
    }
    const testData3 : RecordType = {
        fileName: "test3.csv",
        date: new Date(),
        isProccessed: true,
        data: {
            total_spend_galactic: 0,
            rows_affected: 0,
            less_spent_at: 0,
            big_spent_at: 0,
            less_spent_value: 0,
            big_spent_value: 0,
            average_spend_galactic: 0,
            big_spent_civ: "humans",
            less_spent_civ: "humans"
        },
        id: 3
    }
    beforeEach(() => {
        useStore.getState().clearHistory()
        useStore.getState().setAnalyticError(null);
    }); // Хранилище -> в начальное состояние

    afterEach(() =>{
        cleanup();
    })
    test("нет записей при пустом local-storage", () =>{
        const {container} = render(
            <MemoryRouter initialEntries={['/history']}>
                <HistoryPage/>
            </MemoryRouter>
        )

        expect(useStore.getState().history).toStrictEqual([]);
        expect(container.querySelectorAll('[data-testid=record]').length).toBe(0);
    });

    test("наличие записи при НЕ пустом local-storage", () =>{
        localStorage.setItem('stat_counter', "2")
        localStorage.setItem('aggregated_statistics', 
            JSON.stringify([testData1, testData2]),);

        const {container} = render(
            <MemoryRouter initialEntries={['/history']}>
                <HistoryPage/>
            </MemoryRouter>
        );
        const history = useStore.getState().history.map(el => ({
            ...el,
            date: new Date(el.date),  // чтобы убрать дурацкие ковычки
        }));

        expect(history).toEqual([testData1, testData2]);
        expect(container.querySelectorAll('[data-testid=record]').length).toBe(2);
    });

    test("удаление одной истории", async () =>{
        localStorage.setItem('stat_counter', "2")
        localStorage.setItem('aggregated_statistics', 
            JSON.stringify([testData1, testData2]),);

        const {container} = render(
            <MemoryRouter initialEntries={['/history']}>
                <HistoryPage/>
            </MemoryRouter>
        );
        const firstRecord = container.querySelector('[data-testid=record]');
        if (!firstRecord)
            throw new Error('Ошибка отображения данных из local storage');
        const deleteBtn = firstRecord.querySelector('[data-testid=deleteBtn]');
        if (!deleteBtn)
            throw new Error('Ошибка интерфейса: отсутсвие кнопки удаления записи');
        await userEvent.click(deleteBtn);
        const history = useStore.getState().history.map(el => ({
            ...el,
            date: new Date(el.date),
        }));

        expect(history).toEqual([testData2]);
        expect(container.querySelectorAll('[data-testid=record]').length).toBe(1);
    });

    test("удаление всей истории кнопкой - 'Очистить всё'", async () => {
        localStorage.setItem('stat_counter', "2")
        localStorage.setItem('aggregated_statistics', 
            JSON.stringify([testData1, testData2]),);

        const {container, getByTestId} = render(
            <MemoryRouter initialEntries={['/history']}>
                <HistoryPage/>
            </MemoryRouter>
        );
        const clearHistoryBtn = getByTestId('clearHistoryBtn');
        await userEvent.click(clearHistoryBtn);
        const history = useStore.getState().history.map(el => ({
            ...el,
            date: new Date(el.date),
        }));

        expect(history).toEqual([]);
        expect(container.querySelectorAll('[data-testid=record]').length).toBe(0);
    });

    test("открытие модального окна у успешно обработанного файла", async () =>{
        localStorage.setItem('stat_counter', "3")
        localStorage.setItem('aggregated_statistics', 
            JSON.stringify([testData3]),);
        const {container} = render(
            <MemoryRouter initialEntries={['/history']}>
                <HistoryPage/>
            </MemoryRouter>
        );

        const successfullRecord = container.querySelector('[data-testid=record-frame]');
        if (!successfullRecord)
            throw new Error('Ошибка отображения данных из local storage');
        await userEvent.click(successfullRecord);
        const modal = await (screen.findByTestId('modal').catch(() => {return null}));


        expect(modal).not.toBeNull();
    });

    test("отсутствие модального окна у необработанного файла", async () =>{
        localStorage.setItem('stat_counter', "3")
        localStorage.setItem('aggregated_statistics', 
            JSON.stringify([testData1]),);
        const {container} = render(
            <MemoryRouter initialEntries={['/history']}>
                <HistoryPage/>
            </MemoryRouter>
        );

        const failedRecord = container.querySelector('[data-testid=record-frame]');
        if (!failedRecord)
            throw new Error('Ошибка отображения данных из local storage');
        await userEvent.click(failedRecord);
        const modal = await (screen.findByTestId('modal').catch(() => {return null}));


        expect(modal).toBeNull();
    })
})