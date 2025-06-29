import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Statistics } from "../../components/Statistics/Statistics";
import { useStore } from "../../store/store";
import type { StatisticType } from "../../types/statisticType";
import { ProcessDate } from "../../components/Statistics/processDate";

test("проверка вывода статистики", () => {
    const testedData : StatisticType = {
        total_spend_galactic: 0,
        rows_affected: 0,
        less_spent_at: 0,
        big_spent_at: 0,
        less_spent_value: 0,
        big_spent_value: 0,
        average_spend_galactic: 0,
        big_spent_civ: "humans",
        less_spent_civ: "humans"
    }
    useStore.getState().updateCurrData(testedData);
    useStore.setState({analyticLoading: "loaded"})
    const {container} = render(
        <Statistics isModal={false} currData={testedData}/>
    );
    const allData = Array.from(container.querySelectorAll('h3'));
    allData.forEach(el => {
        const key = el.dataset.testid as keyof StatisticType; // Это что, домашка по ts-у???
        let expectedValue;
        if (key === 'big_spent_at' || key === 'less_spent_at')
            expectedValue = ProcessDate(testedData[key]);
        else if (typeof testedData[key] === 'number')
            expectedValue = Math.round(testedData[key])
        else
            expectedValue = testedData[key];
        expect(el.innerHTML).toBe(String(expectedValue));
    });
})