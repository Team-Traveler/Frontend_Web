import "./Summary.css";

function Summary() {
    const percentage = 47; // (총 지출 / 총 예산)
    const progressbarWidth = (percentage / 100) * 450;

    return (
        <div className="account-summary">
            <div className="account-summary-total">
                <div className="account-summary-total-left">
                    <div className="account-summary-total-left-top">
                        총 지출
                    </div>
                    <div className="account-summary-total-left-bottom">
                        총 예산 변경하기
                    </div>
                </div>
                <div className="account-summary-total-center">
                    <div
                        className="account-summary-total-progress-bar"
                        style={{ width: `${progressbarWidth}px` }}
                    ></div>
                    <div
                        className="account-summary-total-percentage"
                        style={{
                            color: `${percentage > 100 ? "red" : "black"}`,
                        }}
                    >
                        {percentage}%
                    </div>
                </div>
                <div className="account-summary-total-right">
                    <div className="account-summary-total-right-top">
                        521,000원
                    </div>
                    <div className="account-summary-total-right-bottom">
                        1,300,000원
                    </div>
                </div>
            </div>

            <div className="account-summary-div-line"></div>

            <div className="account-summary-content">
                <div className="account-summary-content-top">항목별 지출</div>

                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            식 비
                        </div>
                        <div className="account-summary-content-item-cost">
                            66,700원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            56%
                        </div>
                        <div className="account-summary-content-item-progress-bar">
                            Progress Bar
                        </div>
                    </div>
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            교통비
                        </div>
                        <div className="account-summary-content-item-cost">
                            13,600원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            23%
                        </div>
                        <div className="account-summary-content-item-progress-bar">
                            Progress Bar
                        </div>
                    </div>
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            관 광
                        </div>
                        <div className="account-summary-content-item-cost">
                            12,500원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            21%
                        </div>
                        <div className="account-summary-content-item-progress-bar">
                            Progress Bar
                        </div>
                    </div>
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            쇼 핑
                        </div>
                        <div className="account-summary-content-item-cost">
                            6,300원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            13%
                        </div>
                        <div className="account-summary-content-item-progress-bar">
                            Progress Bar
                        </div>
                    </div>
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            기 타
                        </div>
                        <div className="account-summary-content-item-cost">
                            2,800원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            6%
                        </div>
                        <div className="account-summary-content-item-progress-bar">
                            Progress Bar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;
