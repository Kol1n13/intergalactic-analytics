import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.module.css";
import { MainPage } from "../pages/MainPage/MainPage";
import { Header } from "../components/Header/Header";
import { GeneratePage } from "../pages/GeneratePage/GeneratePage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
