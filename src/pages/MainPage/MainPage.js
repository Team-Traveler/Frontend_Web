import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../.././recoil/atoms/userState";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";
// swiper 슬라이드
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// api
import axios from "axios";
import { API } from "../../config";
import BannerSlide from "./banner";
import Nav from "../../components/Nav/Nav";
import kakaoLoginButton from "../../assets/images/kakao_login_medium_narrow.png";
import useLogout from "../../services/useLogout";
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
    // useEffect(() => {
    //     console.log("userInfo:", userInfo);
    // }, [userInfo]);
    
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

    // 이미지 슬라이드 이미지 스타일
    const imageStyle = (imageUrl) => ({
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url("${imageUrl}")`,
    });

    return (
        <div className="main-body">
            <Nav onClick = {openModal}/>
            <BannerSlide className="banner"/>
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
            {userInfo.isLogin && (
            <div className="like-travel-box">
                {/* 로그인 한 경우에만 나의 찜한 여행 보여주기 */}
                <h3 className="content-title"> {userInfo.nickname}님의 찜한 여행 </h3>
                <div className="like-travel-list">

                </div>
            </div>
            )}
        </div>
    );
}

export default MainPage;
