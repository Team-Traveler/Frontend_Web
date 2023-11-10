import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import './Modal.css';
// 모달 컴포넌트
// headerTitle: 모달 헤더 제목
// size: 모달 크기 (small, large)
// closeModal: 모달 닫기 버튼 클릭 시 실행되는 함수
// children: 모달 컨텐츠
function Modal({ closeModal, size, headerTitle, children }) {
    const modalSize = {
        width: size === "large" ? "1000px" : "400px",
        height: size === "large" ? "600px" : "500px",
    };

    return (
        <div className="modal-overlay">
            <div className="modal" style={{ ...modalSize }}>
                {/* 헤더 제목 */}
                <div className="modal-header">
                    {headerTitle}
                    {/* 닫기 버튼 */}
                    <button onClick={closeModal}>
                        <AiOutlineClose />
                    </button>
                </div>
                <hr style={{ width: "100%" }}></hr>
                {/* 모달 컨텐츠 */}
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
