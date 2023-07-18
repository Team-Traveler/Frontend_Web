import React, { useState } from "react";
import "./MainPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiSolidLock } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import kakaoLoginButton from "../../assets/images/kakao_login_medium_narrow.png";

function MainPage() {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="main-page">
            <div className="main-header">
                <div className="main-header-container">
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
                </div>
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
                                <button className="kakao-login">
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
                <div className="main-logo-image" style={{ height: "100px" }}>
                    로고이미지
                </div>
            </div>
            <div className="main-menu">
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(217,250,255,1)" }}
                    >
                        여행찾기 로고
                    </div>
                    <div className="main-menu-text">여행찾기</div>
                </div>
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(255, 209, 209, 1)" }}
                    >
                        스토리 로고
                    </div>
                    <div className="main-menu-text">스토리</div>
                </div>
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(216, 255, 216, 1)" }}
                    >
                        나의노트 로고
                    </div>
                    <div className="main-menu-text">나의노트</div>
                </div>{" "}
                <div className="main-menu-item">
                    <div
                        className="main-menu-box"
                        style={{ backgroundColor: "rgba(249, 255, 223, 1)" }}
                    >
                        나의여행 로고
                    </div>
                    <div className="main-menu-text">나의여행</div>
                </div>{" "}
            </div>
            <div className="main-body">
                <h3 className="content-title">Traveler의 추천여행</h3>
                <MultipleSlider></MultipleSlider>
                <h3 className="content-title">Traveler의 추천여행</h3>
                <MultipleSlider></MultipleSlider>
            </div>
        </div>
    );
}

const MultipleSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: true,
        // autoplay: true,
    };

    return (
        <div className="content">
            <Slider {...settings}>
                <div>
                    <div className="content-card">1 </div>
                </div>
                <div>
                    <div className="content-card">1 </div>
                </div>{" "}
                <div>
                    <div className="content-card">1 </div>
                </div>{" "}
                <div>
                    <div className="content-card">1 </div>
                </div>{" "}
                <div>
                    <div className="content-card">1 </div>
                </div>{" "}
                <div>
                    <div className="content-card">1 </div>
                </div>{" "}
                <div>
                    <div className="content-card">1 </div>
                </div>{" "}
                <div>
                    <div className="content-card">1 </div>
                </div>{" "}
                <div>
                    <div className="content-card">1 </div>
                </div>{" "}
                <div>
                    <div className="content-card">1 </div>
                </div>{" "}
            </Slider>
        </div>
    );
};

export default MainPage;
