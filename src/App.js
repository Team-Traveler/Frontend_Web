import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.js";
import NotePage from "./pages/NotePage/NotePage.js";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import KakaoLogin from "./pages/MainPage/KakaoLogin";
import CompletedPage from "./pages/RecommendPage/CompletedPage";
import MyTravelMain from "./pages/MyTravelPage/MyTravelMain/MyTravelMain";
import CommunityPage from "./pages/communityPage/main/community";
import Search from "./pages/communityPage/search/search";
import Hap from "./pages/communityPage/hap/hap";
import { userInfoState } from "./recoil/atoms/userState";
import { useRecoilState } from "recoil";

function App() {
    const [userInfo] = useRecoilState(userInfoState);
    const isLogin = userInfo.isLogin;
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                {isLogin ? (
                    <>
                        <Route
                            path="/recommend"
                            element={<RecommendPage />}
                        ></Route>
                        <Route
                            path="/recommendCompleted"
                            element={<CompletedPage />}
                        ></Route>

                        <Route
                            path="/story"
                            element={<CommunityPage />}
                        ></Route>
                        <Route
                            path="/story/search"
                            element={<Search />}
                        ></Route>
                        <Route path={`/story/:tid`} element={<Hap />}></Route>
                        <Route path="/note" element={<NotePage />}></Route>
                        <Route path="/mypage" element={<MyTravelMain />} />
                    </>
                ) : null}
                <Route path="/kakaoLogin" element={<KakaoLogin />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
