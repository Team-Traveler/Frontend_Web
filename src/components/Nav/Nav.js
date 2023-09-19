import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import React,{ useState, useEffect } from "react";
import { ReactComponent as Logo } from "./Logo.svg";

function Nav() {
    const location = useLocation();

    // 현재 경로에 따라 메뉴 활성화
    const isActive = (path) => {
        return location.pathname === path ? `${"active"}`: "";
    };
    // 스크롤 시 상단에 네비바 고정
    const [isSticky, setSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          // 현재 스크롤 위치를 가져옴
          const currentScrollPosition = window.pageYOffset;
          
          // 스크롤 위치가 메뉴의 위치보다 크거나 같으면 메뉴를 고정
          if (currentScrollPosition >= 50) {
            setSticky(true);
          } else {
            setSticky(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
        // Clean up function
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <div className={`nav ${isSticky ? 'sticky' : ''}`}>
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className="nav-logo">
                    <Logo className="nav-logo-image" />
                </div>
            </Link>
            <div className="nav-menu">
                <Link to="/recommend" style={{ textDecoration: "none" }}>
                    <button className={`nav-menu-item ${isActive("/recommend")}`}>
                        <div className="nav-menu-box">여행 찾기</div>
                    </button>
                </Link>
                <Link to="/story" style={{ textDecoration: "none" }}>
                    <button className={`nav-menu-item ${isActive("/story")}`}>
                        <div className="nav-menu-box">스토리</div>
                    </button>
                </Link>
                <Link to="/note" style={{ textDecoration: "none" }}>
                    <button className={`nav-menu-item ${isActive("/note")}`}>
                        <div className="nav-menu-box">나의 노트</div>
                    </button>
                </Link>
                <Link to="/mypage" style={{ textDecoration: "none" }}>
                    <button className={`nav-menu-item ${isActive("/mypage")}`}>
                        <div className="nav-menu-box">나의 여행</div>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Nav;
