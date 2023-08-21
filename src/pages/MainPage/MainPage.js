import React, { useState, useEffect } from "react";
import "./MainPage.css";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiSolidLock } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import kakaoLoginButton from "../../assets/images/kakao_login_medium_narrow.png";
import { useRecoilState } from "recoil";
import { userInfoState } from "../.././recoil/atoms/userState";
import { contentState } from "../.././recoil/atoms/contentState";
import { likeContentState } from "../.././recoil/atoms/likeContentState";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../services/useLogout";
import { ReactComponent as Location } from "../../../src/assets/images/carbon_location.svg";
import { ReactComponent as Note } from "../../../src/assets/images/write.svg";
import { ReactComponent as MyTravel } from "../../../src/assets/images/search.svg";
import { ReactComponent as Story } from "../../../src/assets/images/book.svg";
import { ReactComponent as Logo } from "../../../src/assets/images/Traveler_logo.svg";
import Modal from "../../components/Modal/Modal";

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
    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    // 카카오 로그인
    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    // 로그아웃
    const handleLogout = useLogout(setUserInfo);

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
                                <p>
                                    {userInfo.nickname}님 즐거운 여행 만드세요
                                </p>
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
                    <Modal
                        closeModal={closeModal}
                        headerTitle={<h3>로그인 또는 회원가입</h3>}
                    >
                        <h3>Traveler에 오신것을 환영합니다!</h3>
                        <p>로그인 후 해당 컨텐츠를 이용하실 수 있습니다.</p>

                        <button className="kakao-login" onClick={handleLogin}>
                            <img src={kakaoLoginButton} alt="kakao-login"></img>
                        </button>
                    </Modal>
                )}
            </div>
            {/* 메인 로고 */}
            <div className="main-logo">
                <Logo
                    className="main-logo-image"
                    style={{ height: "100px" }}
                ></Logo>
            </div>
            {/* 메인 메뉴 */}
            <div className="main-menu">
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(217,250,255,1)" }}
                        onClick={() => {
                            if (userInfo.isLogin) {
                                navigate("/recommend");
                            } else {
                                openModal();
                            }
                        }}
                    >
                        <Location />
                    </div>
                    <div className="main-menu-text">여행찾기</div>
                </div>
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(255, 209, 209, 1)" }}
                        onClick={() => {
                            if (userInfo.isLogin) {
                                navigate("/story");
                            } else {
                                openModal();
                            }
                        }}
                    >
                        <Story />
                    </div>
                    <div className="main-menu-text">스토리</div>
                </div>
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(216, 255, 216, 1)" }}
                        onClick={() => {
                            if (userInfo.isLogin) {
                                navigate("/note");
                            } else {
                                openModal();
                            }
                        }}
                    >
                        <Note />
                    </div>
                    <div className="main-menu-text">나의노트</div>
                </div>{" "}
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(249, 255, 223, 1)" }}
                        onClick={() => {
                            if (userInfo.isLogin) {
                                navigate("/mypage");
                            } else {
                                openModal();
                            }
                        }}
                    >
                        <MyTravel />
                    </div>
                    <div className="main-menu-text">나의여행</div>
                </div>{" "}
            </div>
            <div className="main-body">
                <h3 className="content-title">Traveler 의 추천여행</h3>
                <MultipleSliderRecommend></MultipleSliderRecommend>
                {/* 로그인 한 경우에만 나의 찜한 여행 보여주기 */}
                {userInfo.isLogin && (
                    <>
                        <h3 className="content-title">
                            {userInfo.nickname}님의 찜한 여행
                        </h3>
                        <MultipleSliderLike></MultipleSliderLike>
                    </>
                )}
            </div>
        </div>
    );
}

// 추천 여행 컨텐츠 슬라이더
const MultipleSliderRecommend = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [userInfo] = useRecoilState(userInfoState);
    const [contents, setContents] = useRecoilState(contentState);

    useEffect(() => {
        // 추천여행 리스트 데이터 받아오기
        const fetchContents = async () => {
            try {
                const response = await axios.get(
                    "http://15.164.232.95:9000/recommend/list"
                );
                setContents(response.data);
            } catch (error) {
                console.error("Error while fetching contents:", error);
            }
        };
        fetchContents();
    }, []);

    // 카카오 로그인
    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    // 카카오 로그인
    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    const settings = {
        dots: false,
        infinite: false,
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
            console.log("Navigate to /story/detail/:id", content.pid);
            navigate(`/story/detail/${content.pid}`);
        } else {
            // 로그인 하지 않은 경우 로그인 모달 창 띄우기
            openModal();
        }
    };

    // 이미지 슬라이드 이미지 스타일
    const imageStyle = (imageUrl) => ({
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url("${imageUrl}")`,
    });

    return (
        <div className="content">
            <Slider {...settings}>
                {contents.map((content) => (
                    <div key={content.pid}>
                        <div
                            className="content-card"
                            onClick={() => handleCardClick(content)}
                            style={imageStyle(content.url)}
                        >
                            <p>{content.title}</p>
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

// 찜한 여행 컨텐츠 슬라이더
const MultipleSliderLike = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [userInfo] = useRecoilState(userInfoState);
    const [likeContents, setLikeContents] = useRecoilState(likeContentState);

    useEffect(() => {
        // 찜한 여행 컨텐츠 데이터 받아오기
        const fetchContents = async () => {
            try {
                const response = await axios.get(
                    "http://15.164.232.95:9000/users/myScrap",
                    {
                        headers: { Authorization: userInfo.accessToken },
                    }
                );
                setLikeContents(response.data);
            } catch (error) {
                console.error("Error while fetching contents:", error);
            }
        };
        fetchContents();
    }, []);

    // 카카오 로그인
    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    // 카카오 로그인
    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    const settings = {
        dots: false,
        infinite: false,
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
            console.log(
                "Navigate to /story/detail/:id",
                content.postResponse.pid
            );
            navigate(`/story/detail/${content.postResponse.pid}`);
        } else {
            // 로그인 하지 않은 경우 로그인 모달 창 띄우기
            openModal();
        }
    };

    // 이미지 슬라이드 이미지 스타일
    const imageStyle = (imageUrl) => ({
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url("${imageUrl}")`,
    });

    const hasLikedContents =
        likeContents && likeContents.result && likeContents.result.length > 0;

    return (
        <div className="content">
            {hasLikedContents ? (
                <Slider {...settings}>
                    {likeContents.result.map((likeContent) => (
                        <div key={likeContent.postResponse.pid}>
                            <div
                                className="content-card"
                                onClick={() => handleCardClick(likeContent)}
                                style={imageStyle(likeContent.postResponse.url)}
                            >
                                <p>{likeContent.postResponse.title}</p>
                                <p>{likeContent.postResponse.oneLineReview}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>No liked contents available.</p>
            )}
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
