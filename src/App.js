import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.js";
import NotePage from "./pages/NotePage/NotePage.js";
import RecommendPage from "./pages/RecommendPage/RecommendPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/main" element={<MainPage />}></Route>
                <Route path="/recommend" element={<RecommendPage />}></Route>
                <Route path="/story" />
                <Route path="/note" element={<NotePage />}></Route>
                <Route path="/mypage" />
            </Routes>
        </div>
    );
}

export default App;
