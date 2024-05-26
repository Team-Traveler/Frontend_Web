import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../.././recoil/atoms/userState";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";
// api
import BannerSlide from "./banner";
import Nav from "../../components/Nav/Nav";
import kakaoLoginButton from "../../assets/images/kakao_login_medium_narrow.png";
import useLogout from "../../services/useLogout";
import { ReactComponent as Logo } from "../../../src/assets/images/Traveler_logo.svg";
import { ReactComponent as KakaoSecond } from "../../../src/assets/images/kakaologin_btn.svg";
import { ReactComponent as ArrowUp } from "../../../src/assets/images/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../../src/assets/images/arrow_down.svg";
import Modal from "../../components/Modal/Modal";
import { API } from "../../config";
import TravelCardList from "../../components/TravelCardList/TravelCardList";

function MainPage() {
    const [showModal, setShowModal] = useState(false);
    const [showScrapModal,setShowScrapModal] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    
    const navigate = useNavigate();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    /* setShow함수를 onClick에 직접 대입하면 무한 렌더링 에러 발생함*/
    // 찜한 여행 펼치기 눌렀을 때
    const onClickUp = (e)=>{
        setShowScrapModal(true);
        console.log('showScrapModal',showScrapModal);
    }

    // 찜한 여행 닫기 눌렀을 때
    const onClickDown = (e)=>{
        setShowScrapModal(false);
    }

    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    // 카카오 로그인
    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    // 로그아웃
    const handleLogout = useLogout(setUserInfo);

    // 컨텐츠 클릭 시
    const handleCardClick = (content) => {
        if (userInfo.isLogin) {
            // 로그인 한 경우 상세 페이지로 이동
            console.log("Navigate to /story/:id", content.postResponse.pid);
            navigate(`/story/${content.postResponse.pid}`);
        } else {
            // 로그인 하지 않은 경우 로그인 모달 창 띄우기
            openModal();
        }
    };

    // 스크롤 이벤트 핸들러에서 블러 강도를 계산하여 엘리먼트에 클래스 추가
    const handleScroll = () => {
        // const offset = window.scrollY;
        // console.log("현재 스크롤 값:", offset);
        // const maxTranslateY = 50; // 최대 translateY 값 (상한값)
        // const upperBound = 10; // 블러 효과가 적용되기 시작하는 상한값
        // const lowerBound = -10; // 블러 효과가 완전히 제거되는 하한값
        // let translateYValue = Math.min(
        //     maxTranslateY,
        //     maxTranslateY - maxTranslateY * (offset / window.innerHeight)
        // );
        // // .main-body-placeholder 뒤의 요소들에 블러 효과 강도 계산
        // const blurIntensity = (translateYValue / maxTranslateY) * 10; // 여기서 10은 임의의 상수, 조절 가능
        // // .main-body-placeholder 요소를 찾아서 업데이트
        // const placeholderElement = document.querySelector(
        //     ".main-body-placeholder"
        // );
        // if (placeholderElement) {
        //     // 블러 효과를 강화하는 클래스 추가
        //     placeholderElement.classList.toggle("blurred", translateYValue > 0);
        //     placeholderElement.style.filter = `blur(${blurIntensity}px)`;
        //     // 상한값과 하한값을 적용하여 translateYValue 조절
        //     translateYValue = Math.max(
        //         lowerBound,
        //         Math.min(upperBound, translateYValue)
        //     );
        //     // .main-body-placeholder의 translateY 속성 업데이트
        //     placeholderElement.style.transform = `translateY(${translateYValue}%)`;
        //     // 스크롤 위치 업데이트
        //     lastScrollOffset = offset;
        // }
    };

    let lastScrollOffset = 0;
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 창 크기가 변경될 때도 블러 효과를 다시 계산
    window.addEventListener("resize", handleScroll);

    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        console.log(userInfo);
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrollOffset(offset);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    const translateYValue = Math.max(
        -50,
        50 - 50 * (scrollOffset / window.innerHeight)
    );

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;

            // 액세스하려는 요소의 ID로 실제 ID로 바꿔주세요
            const element = document.getElementById("1");
            if (element) {
                element.style.transform = `translateY(${
                    50 - 50 * (offset / window.innerHeight)
                }%)`;
            }

            setScrollOffset(offset);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const fixedStyles = {
        mainBody: {
            position: "fixed",
            top: 0, // main-header의 높이에 따라 조절
            left: 0,
            right: 0,
            zIndex: 98, // 적절한 z-index 값으로 설정
        },
        mainRealBody: {
            marginTop: "40px", // main-header의 높이에 따라 조절
            marginBottom: "100px", // 원하는 만큼 여백을 설정
        },
    };

    return (
        <div className="main-page">
            <Nav onClick = {openModal}/>
            <div className={`main-body ${
                    scrollOffset > 0 ? "blur-on-scroll" : ""
                }`}>
                <BannerSlide className="banner"/>
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
            {!userInfo.isLogin && translateYValue >= 35 && (
                <div
                    id="1"
                    className="main-body-placeholder"
                    style={{
                        ...fixedStyles.mainRealBody,
                        transform: `translateY(${translateYValue}%)`,
                        position: "absolute",
                    }}
                >
                    <ArrowUp className="arrow-up-icon"></ArrowUp>
                    <div className="main-body-placeholder-title">
                        더 많은 여행 코스를 검색하고 싶다면?
                    </div>
                    <div className="main-body-placeholder-content">
                        위로 스크롤하여 가입해 보세요!
                    </div>
                </div>
            )}

            {!userInfo.isLogin && translateYValue < 35 && (
                <div
                    id="1"
                    className={`main-body-placeholder ${
                        translateYValue < 35 ? "logo-animation" : ""
                    }`}
                    style={{
                        ...fixedStyles.mainRealBody,
                        transform: `translateY(${translateYValue}%)`,
                        position: "absolute",
                    }}
                >
                    <ArrowDown className="arrow-down-icon"></ArrowDown>
                    <div className="main-body-placeholder-title-second">
                        여행을 쉽고 빠르게
                    </div>

                    <Logo className="main-logo-image-second" />

                    <button
                        className="kakao-login-second"
                        onClick={handleLogin}
                    >
                        <KakaoSecond
                            style={{ width: "37.84vw", height: "6vh" }}
                        />
                    </button>
                </div>
            )}
            {/* 로그인 한 경우에만 나의 찜한 여행 보여주기 */}
            {userInfo.isLogin && translateYValue >= 35 && (
                <div
                id="1"
                className="main-body-placeholder"
                style={{
                    ...fixedStyles.mainRealBody,
                    transform: `translateY(${translateYValue}%)`,
                    position: "absolute",
                }}
                >
                    <ArrowUp className="arrow-up-icon"></ArrowUp>
                    <h3 className="content-title"> {userInfo.nickname}님이 찜한 여행 </h3>
                    <TravelCardList/>
                </div>
            )}
            {userInfo.isLogin && translateYValue < 35 && (
                <div
                    id="1"
                    className={`main-body-placeholder ${
                        translateYValue < 35 ? "logo-animation" : ""
                    }`}
                    style={{
                        ...fixedStyles.mainRealBody,
                        transform: `translateY(${translateYValue}%)`,
                        position: "absolute",
                    }}
                >
                    <ArrowDown className="arrow-down-icon"></ArrowDown>
                    <h3 className="content-title"> {userInfo.nickname}님이 찜한 여행 </h3>
                    <TravelCardList/>
                </div>
            )}
        </div>
    );
}

export default MainPage;
