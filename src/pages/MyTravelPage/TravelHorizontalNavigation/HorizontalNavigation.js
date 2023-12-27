import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import ReactDOM from "react-dom";
import "./HorizontalNavigation.css";

const HorizontalNavigation = (props) => {
    const [activeTab, setActiveTab] = useState("profile"); // 기본값 설정

    const handleNavClick = (viewName) => {
        props.setView(viewName);
        setActiveTab(viewName); // 활성 탭 업데이트
    };

    return (
        <div className="horizontal-navigation">
            <button
                onClick={() => handleNavClick("profile")}
                className={activeTab === "profile" ? "active" : ""}
            >
                프로필 편집
            </button>
            <button
                onClick={() => handleNavClick("review")}
                className={activeTab === "review" ? "active" : ""}
            >
                후기 작성
            </button>
            <button
                onClick={() => handleNavClick("like")}
                className={activeTab === "like" ? "active" : ""}
            >
                찜한 여행
            </button>
            <button
                onClick={() => handleNavClick("add")}
                className={activeTab === "add" ? "active" : ""}
            >
                여행 만들기
            </button>
            <button
                onClick={() => {
                    handleNavClick("edit");
                    props.toggleEditMode();
                }}
                className={activeTab === "edit" ? "active" : ""}
            >
                목록 편집
            </button>
        </div>
    );
};
export default HorizontalNavigation;
