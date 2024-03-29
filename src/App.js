import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.js";
import NotePage from "./pages/NotePage/NotePage.js";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import KakaoLogin from "./pages/MainPage/KakaoLogin";
import MyTravelMain from "./pages/MyTravelPage/MyTravelMain/MyTravelMain";
import CommentsPage from "./pages/communityPage/comments/comments";
import CommunityPage from "./pages/communityPage/main/community";
import WritePage from "./pages/communityPage/write/write";
import InfoPage from "./pages/communityPage/info/info"
import CompletedPage from "./pages/RecommendPage/CompletedPage";
import { userInfoState } from "./recoil/atoms/userState";
import { useRecoilState } from "recoil";
import LoadingModal from "./components/Loading/Loading.js";

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
                            path="/recommendCompleted"
                            element={<CompletedPage />}
                        ></Route>
                        <Route path="/recommend"element={<RecommendPage />}></Route> 
                        {/* <Route path="/completed" element={<CompletedPage/>}></Route> */}
                        <Route path="/story" element={<CommunityPage />}></Route>
                        <Route path={`/story/:pid`} element={<InfoPage />}></Route>
                        <Route path="/story/write" element={<WritePage/>}></Route>
                        <Route path="/story/:pid/comments" element={<CommentsPage/>}></Route>
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