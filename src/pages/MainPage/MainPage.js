import React, { useState, useEffect } from "react";
import "./MainPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiSolidLock } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import kakaoLoginButton from "../../assets/images/kakao_login_medium_narrow.png";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userInfoState } from "../.././recoil/atoms/userState";
import { contentState } from "../.././recoil/atoms/contentState";
import { useNavigate, useSearchParams } from "react-router-dom";
import useKakaoLogin from "../../services/useKakaoLogin";
import useLogout from "../../services/useLogout";
import { ReactComponent as Location } from "../../../src/assets/images/carbon_location.svg";
import { ReactComponent as Note } from "../../../src/assets/images/write.svg";
import { ReactComponent as MyTravel } from "../../../src/assets/images/search.svg";
import { ReactComponent as Story } from "../../../src/assets/images/book.svg";
import { ReactComponent as Logo } from "../../../src/assets/images/Traveler_logo.svg";
function MainPage() {
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const navigate = useNavigate();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // 카카오 로그인
    const handleLogin = useKakaoLogin();
    // 로그아웃
    const handleLogout = useLogout(setUserInfo);

    // 카카오 로그인 후 백엔드로 code 전송
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        // 백엔드로 code 전송
        const sendCodeToBackend = async () => {
            try {
                // const response = await axios.post("/api/auth/kakao", { code });
                // 백엔드에서 응답으로 받은 사용자 정보
                // const { nickname, profile_image, email } = response.data;
                // 사용자 정보를 recoil에 저장
                // setUserInfo({
                //     id: "",
                //     name: nickname,
                //     email: email,
                //     profileImage: profile_image,
                //     isLogin: true,
                // });
                setUserInfo({
                    id: "",
                    name: "서다원",
                    email: "traveler@example.com",
                    profileImage:
                        "https://avatars.githubusercontent.com/u/71630722?v=4",
                    isLogin: true,
                });
                // 현재 페이지 URL에서 code 값의 쿼리 스트링을 제거
                if (window.location.search) {
                    const newURL = window.location.href.split("?")[0];
                    window.history.replaceState({}, document.title, newURL);
                }
            } catch (error) {
                console.error("Error while sending code to backend:", error);
            }
        };
        // code가 있으면 백엔드로 전송
        if (code) {
            sendCodeToBackend();
        }
    }, []);

    // 로그인 후 recoil에 저장된 사용자 정보 확인하는 테스트코드
    useEffect(() => {
        console.log("userInfo:", userInfo);
    }, [userInfo]);

    return (
        <div className="main-page">
            <div className="main-header">
                <div className="main-header-container">
                    {/* 로그인 후 */}
                    {userInfo.isLogin ? (
                        <>
                            <div className="main-header-item">
                                <img
                                    src={userInfo.profileImage}
                                    alt="Profile"
                                />
                            </div>
                            <div className="main-header-item">
                                <p>{userInfo.name}님 즐거운 여행 만드세요</p>
                            </div>
                            <p>|</p>
                            <div className="main-header-item">
                                <button
                                    className="main-header-button"
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="main-header-item">
                                <BiSolidLock />
                            </div>
                            <div className="main-header-item">
                                <button
                                    className="main-header-button"
                                    onClick={openModal}
                                >
                                    로그인
                                </button>
                            </div>
                            <p>|</p>
                            <div className="main-header-item">
                                <button
                                    className="main-header-button"
                                    onClick={openModal}
                                >
                                    회원가입
                                </button>
                            </div>
                        </>
                    )}
                </div>
                {/* 로그인 모달 창 */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            {/* 로그인 폼 등 내용 추가 */}
                            <div className="modal-header">
                                <h3>로그인 또는 회원가입</h3>
                                <button onClick={closeModal}>
                                    <AiOutlineClose />
                                </button>
                            </div>
                            <hr style={{ width: "100%" }}></hr>

                            <div className="modal-body">
                                <h3>Traveler에 오신것을 환영합니다!</h3>
                                <button
                                    className="kakao-login"
                                    onClick={handleLogin}
                                >
                                    <img
                                        src={kakaoLoginButton}
                                        alt="kakao-login"
                                    ></img>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="main-logo">
                <Logo
                    className="main-logo-image"
                    style={{ height: "100px" }}
                ></Logo>
            </div>
            <div className="main-menu">
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(217,250,255,1)" }}
                    >
                        <Location />
                    </div>
                    <div className="main-menu-text">여행찾기</div>
                </div>
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(255, 209, 209, 1)" }}
                    >
                        <Story />
                    </div>
                    <div className="main-menu-text">스토리</div>
                </div>
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(216, 255, 216, 1)" }}
                        onClick={() => navigate("/note")} // 나의노트 페이지로 이동
                    >
                        <Note />
                    </div>
                    <div className="main-menu-text">나의노트</div>
                </div>{" "}
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(249, 255, 223, 1)" }}
                    >
                        <MyTravel />
                    </div>
                    <div className="main-menu-text">나의여행</div>
                </div>{" "}
            </div>
            <div className="main-body">
                <h3 className="content-title">Traveler의 추천여행</h3>
                <MultipleSlider></MultipleSlider>
                {/* 로그인 한 경우에만 나의 찜한 여행 보여주기 */}
                {userInfo.isLogin && (
                    <>
                        <h3 className="content-title">
                            {userInfo.name}의 찜한 여행
                        </h3>
                        <MultipleSlider></MultipleSlider>
                    </>
                )}
            </div>
        </div>
    );
}

const MultipleSlider = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [contents, setContents] = useRecoilState(contentState);

    useEffect(() => {
        // 여행 컨텐츠 데이터 받아오기
        const fetchContents = async () => {
            try {
                const response = await axios.get("/travel/recommend");
                setContents(response.data);
            } catch (error) {
                console.error("Error while fetching contents:", error);
            }
        };
        fetchContents();
    }, []);

    // 카카오 로그인
    const handleLogin = useKakaoLogin();

    // 카카오 로그인 후 백엔드로 code 전송
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        // 백엔드로 code 전송
        const sendCodeToBackend = async () => {
            try {
                const response = await axios.post("/api/auth/kakao", { code });
                // 백엔드에서 응답으로 받은 사용자 정보
                const { nickname, profile_image, email } = response.data;
                // 사용자 정보를 recoil에 저장
                setUserInfo({
                    id: "",
                    name: nickname,
                    email: email,
                    profileImage: profile_image,
                    isLogin: true,
                });
                // 현재 페이지 URL에서 code 값의 쿼리 스트링을 제거
                if (window.location.search) {
                    const newURL = window.location.href.split("?")[0];
                    window.history.replaceState({}, document.title, newURL);
                }
            } catch (error) {
                console.error("Error while sending code to backend:", error);
            }
        };
        // code가 있으면 백엔드로 전송
        if (code) {
            sendCodeToBackend();
        }
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: true,
        // autoplay: true,
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // 컨텐츠 클릭 시
    const handleCardClick = (content) => {
        if (userInfo.isLogin) {
            // 로그인 한 경우 상세 페이지로 이동
            console.log("Navigate to /detail/:id", content.id);
            navigate(`/detail/${content.id}`);
        } else {
            // 로그인 하지 않은 경우 로그인 모달 창 띄우기
            openModal();
        }
    };

    return (
        <div className="content">
            <Slider {...settings}>
                {contents.result.map((content) => (
                    <div key={content.id}>
                        <div
                            className="content-card"
                            onClick={() => handleCardClick(content)}
                        >
                            <p>{content.title}</p>
                            <p>{content.duration}</p>
                            <p>{content.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
            {/* Modal for non-logged-in users */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        {/* 로그인 폼 등 내용 추가 */}
                        <div className="modal-header">
                            <h3>로그인 또는 회원가입</h3>
                            <button onClick={closeModal}>
                                <AiOutlineClose />
                            </button>
                        </div>
                        <hr style={{ width: "100%" }}></hr>

                        <div className="modal-body">
                            <h3>Traveler에 오신것을 환영합니다!</h3>
                            <p>로그인 후 해당 컨텐츠를 이용하실 수 있습니다.</p>
                            <button
                                className="kakao-login"
                                onClick={handleLogin}
                            >
                                <img
                                    src={kakaoLoginButton}
                                    alt="kakao-login"
                                ></img>
                            </button>{" "}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;
