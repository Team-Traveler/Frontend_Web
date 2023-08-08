import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import React from "react";
import { ReactComponent as Logo } from "./traveler_logo.svg";

function Nav() {
    const location = useLocation();

    // 현재 경로에 따라 메뉴 활성화
    const isActive = (path) => {
        return location.pathname === path
            ? `${"active-" + path.replace("/", "")}`
            : "";
    };

    return (
        <div className="nav">
            <Link to="/main" style={{ textDecoration: "none" }}>
                <div className="nav-logo">
                    <Logo className="nav-logo-image" />
                </div>
            </Link>
            <div className="nav-menu">
                <Link to="/recommend" style={{ textDecoration: "none" }}>
                    <button
                        className={`nav-menu-item recommend ${isActive(
                            "/recommend"
                        )}`}
                    >
                        <div className="nav-menu-box">여행 찾기</div>
                    </button>
                </Link>
                <Link to="/story" style={{ textDecoration: "none" }}>
                    <button
                        className={`nav-menu-item story  ${isActive("/story")}`}
                    >
                        <div className="nav-menu-box">스토리</div>
                    </button>
                </Link>
                <Link to="/note" style={{ textDecoration: "none" }}>
                    <button
                        className={`nav-menu-item mynote  ${isActive("/note")}`}
                    >
                        <div className="nav-menu-box">나의 노트</div>
                    </button>
                </Link>
                <Link to="/mypage" style={{ textDecoration: "none" }}>
                    <button
                        className={`nav-menu-item mypage  ${isActive(
                            "/mypage"
                        )}`}
                    >
                        <div className="nav-menu-box">나의 여행</div>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Nav;
