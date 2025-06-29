import { fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { AnalyseFile } from "../../api/analyse-file";
import { useStore } from "../../store/store";
import { UploadForm } from "../../components/uploadForm/uploadForm";

vi.mock("../../api/analyse-file.ts", async () => {
    const origin = await vi.importActual<typeof AnalyseFile>("../../api/generate-file");
    return {
        ...origin,
        AnalyseFile: vi.fn(),
    };
}); // Мокаем фетч запрос

test("тест на лоадер главной страницы", async () =>{
    (AnalyseFile as ReturnType<typeof vi.fn>).mockImplementation(() =>
        new Promise(() => {}) // вечно pending промис
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
    const loader = getByTestId("loader");

    expect(loadingStatus).toBe('isLoading');
    expect(loader).not.toBeNull();
});