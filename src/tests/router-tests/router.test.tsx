import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import {render} from '@testing-library/react'
import events from '@testing-library/user-event'
import App from "../../app/App";

describe('тесты роутинга: базовый роутинг - переход на страницу', () => {
    test('"пустой заход" на "/"', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(container.querySelector('[data-testid=mainpage-classifier]')).not.toBeNull();
    });

    test('"пустой заход" на "/history"', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/history']}>
                <App />
            </MemoryRouter>
        );
        expect(container.querySelector('[data-testid=historypage-classifier]')).not.toBeNull();
    });

    test('"пустой заход" на "/generate"', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/generate']}>
                <App />
            </MemoryRouter>
        );
        expect(container.querySelector('[data-testid=generatepage-classifier]')).not.toBeNull();
    });
});

describe("тесты роутинга: переходы между страницами", () =>{
    test('переходы по шапке', async () =>{
        const {container} = render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        const mainBtn = container.querySelector('[data-testid=toMainPageBtn]');
        const historyBtn = container.querySelector('[data-testid=toHistoryPageBtn]');
        const generateBtn = container.querySelector('[data-testid=toGeneratePageBtn]');
        if (!historyBtn || !generateBtn || !mainBtn)
            throw new Error('Ошибка загрузки: не найдены кнопка/кнопки навигации');
        await events.click(historyBtn);
        const historyCheck = container.querySelector('[data-testid=historypage-classifier]');
        await events.click(generateBtn);
        const generateCheck = container.querySelector('[data-testid=generatepage-classifier]');
        await events.click(mainBtn);
        const mainCheck = container.querySelector('[data-testid=mainpage-classifier]');


        expect(mainCheck).not.toBeNull();
        expect(historyCheck).not.toBeNull();
        expect(generateCheck).not.toBeNull();
    });

    test('переход со страницы истории по кнопке "сгенерировать больше"', async () =>{
        const {container} = render(
            <MemoryRouter initialEntries={["/history"]}>
                <App />
            </MemoryRouter>
        );
        const generateMoreBtn = container.querySelector('[data-testid=generateMoreBtn]');
        if (!generateMoreBtn)
            throw new Error('Ошибка загрузки: не найдена кнопка "сгенерировать больше"');
        await events.click(generateMoreBtn);
        expect(container.querySelector('[data-testid=generatepage-classifier]')).not.toBeNull();
    });
})
