import { useEffect } from "react";
import { useStore } from "../../store/store"

export function HistoryPage(){
    const updatePage = useStore((state) => state.updatePage);

    useEffect(() => {
        updatePage("HistoryPage");
    }, [updatePage]);
    return (
        <>
            HistoryPage!!!
        </>
    )
}