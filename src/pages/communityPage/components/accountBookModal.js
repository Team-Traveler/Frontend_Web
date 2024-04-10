import React from "react";
import { useRecoilState } from "recoil";
import { AiOutlineClose } from "react-icons/ai";
import "./accountBookModal.css";
import { AccountBookMode } from "../../../recoil/atoms/noteState";
import Daily from "../../NotePage/AccountComponents/Daily";
import Summary from "../../NotePage/AccountComponents/Summary";
// 모달 컴포넌트
// headerTitle: 모달 헤더 제목
// size: 모달 크기 (small, large)
// closeModal: 모달 닫기 버튼 클릭 시 실행되는 함수
// children: 모달 컨텐츠
function AccountBookModal({ closeModal, size, headerTitle }) {
    const modalSize = {
        width: size === "large" ? "1000px" : "400px",
        height: size === "large" ? "600px" : "500px",
    };
    const [AccountMode, setAccountMode] = useRecoilState(AccountBookMode);
    return (
        <div className="modal-overlay">
            <div 
                className="account-modals" 
                // style={{ ...modalSize }}
            >
                {/* 헤더 제목 */}
                <div className="account-modal-header">
                    {headerTitle}
                    {/* 닫기 버튼 */}
                    <button className="accountbook-close-btn" onClick={closeModal}>
                        <AiOutlineClose />
                    </button>
                </div>
                {/* <div className="modal-header-divide-line"></div> */}
                {/* <hr style={{ width: "100%" }}></hr> */}
                {/* 모달 컨텐츠 */}
                <div className="account-content">
                    <div className="account-book">
                        <div className="account-book-nav">
                            <button
                                className={`account-book-mode-btn${
                                    AccountMode === 0 ? "-active" : ""
                                }`}
                                onClick={() => {
                                    setAccountMode(0);
                                }}
                            >
                                일별
                            </button>
                            {/* <button
                                className={`account-book-mode-btn${
                                    AccountMode === 1 ? "-active" : ""
                                }`}
                                onClick={() => {
                                    setAccountMode(1);
                                }}
                            >
                                월별
                            </button> */}
                            <button
                                className={`account-book-mode-btn${
                                    AccountMode === 2 ? "-active" : ""
                                }`}
                                onClick={() => {
                                    setAccountMode(2);
                                }}
                            >
                                요약
                            </button>
                        </div>

                        {AccountMode === 0 && <Daily />}
                        {AccountMode === 2 && <Summary />}
                    </div>                    
                </div>
            </div>
            
        </div>
    );
}

export default AccountBookModal;
