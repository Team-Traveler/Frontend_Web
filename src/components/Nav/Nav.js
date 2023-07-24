import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
    return (
        <div className="nav">
            <Link to="/main">
                <div className="nav-logo">
                    <div className="nav-logo-image">로고 이미지</div>
                </div>
            </Link>

            <div className="nav-menu">
                <Link to="/find">
                    <button className="nav-menu-item">
                        <div className="nav-menu-box">여행 찾기</div>
                    </button>
                </Link>
                <Link to="/story">
                    <button className="nav-menu-item">
                        <div className="nav-menu-box">스토리</div>
                    </button>
                </Link>
                <Link to="/note">
                    <button className="nav-menu-item">
                        <div className="nav-menu-box">나의 노트</div>
                    </button>
                </Link>
                <Link to="/mypage">
                    <button className="nav-menu-item">
                        <div className="nav-menu-box">나의 여행</div>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Nav;
