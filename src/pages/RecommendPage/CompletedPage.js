import "./RecommendPage.css";
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

    const handleCompletedButtonClick = () => {
        navigate("/mypage");
    };

    return (
        <div className="recommend-page">
            {/* 메뉴 */}
            <Nav className="recommend-nav"></Nav>
            {/* main content */}
            <div className="recommend-content">
                {/* Display completion screen */}
                <div className="loading-screen">
                    <div className="completed-text">
                        <p style={{ fontWeight: "700" }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;추천완료!
                        </p>
                        <p>&nbsp;</p>
                        <p>&nbsp;&nbsp;&nbsp;취향에 맞는 여행계획을</p>
                        <p>나의 여행에서 확인하세요!</p>
                    </div>
                    <div className="loading-spinner">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div
                        className="recommend-button completed-button"
                        onClick={handleCompletedButtonClick}
                    >
                        완료
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompletedPage;
