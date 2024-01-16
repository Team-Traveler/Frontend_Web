import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import ReactDOM from "react-dom";
import "./HorizontalNavigation.css";

const HorizontalNavigation = (props) => {
    const [activeTab, setActiveTab] = useState("list"); // 기본값 설정

    const handleNavClick = (viewName) => {
        props.setView(viewName);
        setActiveTab(viewName); // 활성 탭 업데이트
    };

    return (
        <div className="horizontal-navigation-container2">
            <div className="horizontal-navigation2">
                <button
                    onClick={() => handleNavClick("add")}
                    className={activeTab === "add" ? "active" : ""}
                >
                    여행 만들기
                </button>
                <button
                    onClick={() => handleNavClick("review")}
                    className={activeTab === "review" ? "active" : ""}
                >
                    리뷰 작성
                </button>
                <button
                    onClick={() => handleNavClick("like")}
                    className={activeTab === "like" ? "active" : ""}
                >
                    찜한 여행
                </button>

                <button
                    onClick={() => {
                        handleNavClick("list");
                        //props.toggleEditMode();
                    }}
                    className={activeTab === "list" ? "active" : ""}
                >
                    나의 여행
                </button>
            </div>
            <button
                onClick={() => {
                    handleNavClick("list");
                    props.toggleEditMode();
                }}
                className="editNavBtn"
            >
                목록 편집
            </button>
        </div>
    );
};
export default HorizontalNavigation;
