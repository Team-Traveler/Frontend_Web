import React, { useState, useEffect } from "react";
import "./banner.css";
// swiper 슬라이드
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
// API 연결
import axios from "axios";
import { API } from "../../config";
import { BsPersonCircle } from "react-icons/bs";

function BannerSlide() {
    SwiperCore.use([Autoplay]);
    const [bannerList, setBannerList] = useState([]);

    //추천 여행 리스트 API 요청
    const fetchList = async () => {
        await axios
            .get(`${API.HEADER}/recommend/list`)
            .then((response) => {
                if (response.data) {
                    setBannerList(response.data);
                    //console.log('추천 여행 리스트', response.data);
                } else console.log("추천 여행 리스트 불러오기 실패", response);
            })
            .catch((e) => {
                console.log("error", e);
            });
    };

    useEffect(() => {
        fetchList();
    }, bannerList[0]);

    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={5}
            slidesPerView={2}
            loop={true}
            centeredSlides={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            className="swiper-box"
        >
            {bannerList &&
                bannerList.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div className="banner-list">
                            <img
                                src={banner.url}
                                alt="banner"
                                className="banner-img"
                            />
                            <div className="banner-content">
                                <div className="banner-title">
                                    <span>{banner.title}</span>
                                </div>
                                <div className="banner-user">
                                    <BsPersonCircle className="user-icon" />
                                    {/* <span>{banner.username}</span> */}
                                    <span style={{ fontSize: "15px" }}>
                                        username
                                    </span>
                                </div>
                                <div className="banner-info">
                                    {/* <span>{banner.location}</span> */}
                                    <span>지역이름</span> |{" "}
                                    <span>{banner.duration}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}

export default BannerSlide;
