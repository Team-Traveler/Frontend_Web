import "./CompletedPage.css";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recommendFormState } from "../../recoil/atoms/recommendFormState";
import { set } from "date-fns";

function CompletedPage() {
    const navigate = useNavigate();
    const [recommendForm, setRecommendForm] =
        useRecoilState(recommendFormState);

    useEffect(() => {
        setRecommendForm({
            startDate: "",
            finishDate: "",
            cityId: "",
            hard: "",
            what: "",
            with: "",
            people: "",
        });
    }, []);

    const onMyPage = () => {
        navigate("/mypage");
    };

    const onHome = () => {
        navigate("/");
    };

    return (
        <div className="completed-page">
            {/* 메뉴 */}
            <Nav />
            {/* main content */}
            <div className="completed-modal">
                <div className='completed-box'>
                    <div className="completed-text-box">
                        <div className='completed-text'>
                            <span id='emphasis'>추천 완료!</span>
                        </div>
                        <div className='completed-text'>
                            <span>취향에 맞는 여행 계획을</span>
                        </div>
                        <div className='completed-text'>
                            <span>나의 여행에서 확인하세요!</span>
                        </div>
                    </div>
                    <div className="completed-spinner">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="completed-btn">
                    <button className="onMyPage" onClick={onMyPage}>
                        나의 여행으로 바로 가기
                    </button>
                    <span className="onHome" onClick={onHome}>홈으로 돌아갈래요</span>
                </div>
           </div>  
        </div>
    );
}

export default CompletedPage;
