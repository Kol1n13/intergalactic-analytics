import { Route, Routes } from "react-router-dom";
import "./App.module.css";
import { MainPage } from "../pages/MainPage/MainPage";
import { Header } from "../components/Header/Header";
import { GeneratePage } from "../pages/GeneratePage/GeneratePage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
    </>
  );
}

export default App;
