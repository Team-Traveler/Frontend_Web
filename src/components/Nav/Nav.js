import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import React,{ useState, useEffect } from "react";
import { ReactComponent as Logo } from "./Logo.svg";
import { useRecoilState } from "recoil";
import { userInfoState } from "../.././recoil/atoms/userState";
import { CiMenuBurger } from "react-icons/ci";

function Nav({onClick}) {
    const location = useLocation();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setSticky] = useState(false); // 스크롤 시 상단에 네비바 고정

    // 현재 경로에 따라 메뉴 활성화
    const isActive = (path) => {
        // /story/** 링크는 모두 스토리 네비게이션 바가 활성화됨.
        if(path==="/story"&&location.pathname.includes("/story"))
            return "active";
        return location.pathname === path ? `${"active"}`: "";
    };

    const toggleClick = ()=>{
        setIsOpen(isOpen ? false : true);
    }

    useEffect(() => {
        const handleScroll = () => {
          // 현재 스크롤 위치를 가져옴
          const currentScrollPosition = window.pageYOffset;
          // 스크롤 위치가 메뉴의 위치보다 크거나 같으면 메뉴를 고정
          if (currentScrollPosition >= 120) {
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
        <div className={`nav ${isSticky ? 'sticky' : ''} ${isOpen ? 'open' : ''}`}>
            <div className="nav-title">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="nav-logo">
                        <Logo className="nav-logo-image" />
                    </div>
                </Link>
                <button id="navbar_toggle" onClick={toggleClick}>
                    <CiMenuBurger style={{fontSize:"30px", color:"black"}}/>
                </button>
            </div>
            {userInfo.isLogin ? (
            <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
                <Link to="/recommend" style={{ textDecoration: "none" }}>
                    <button className={`nav-menu-item ${isActive("/recommend")}`}>
                        <div className="nav-menu-box">여행 찾기</div>
                    </button>
                </Link>
                <Link to={`/story`} style={{ textDecoration: "none" }}>
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
            ) : (
            <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
                <button className={`nav-menu-item`} onClick={onClick}>
                    <div className="nav-menu-box">로그인</div>
                </button>
                <button className={`nav-menu-item`} onClick={onClick}>
                    <div className="nav-menu-box">회원가입</div>
                </button>
            </div>
            )}
        </div>
    );
}

export default Nav;
