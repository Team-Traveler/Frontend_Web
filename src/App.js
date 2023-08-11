import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.js";
import NotePage from "./pages/NotePage/NotePage.js";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import KakaoLogin from "./pages/MainPage/KakaoLogin";
import CompletedPage from "./pages/RecommendPage/CompletedPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/recommend" element={<RecommendPage />}></Route>
                <Route
                    path="/recommendCompleted"
                    element={<CompletedPage />}
                ></Route>
                <Route path="/story" />
                <Route path="/note" element={<NotePage />}></Route>
                <Route path="/mypage" />
                <Route path="/kakaoLogin" element={<KakaoLogin />} />
            </Routes>
        </div>
    );
}

export default App;
