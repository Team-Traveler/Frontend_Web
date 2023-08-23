import { useRecoilState } from "recoil";
import { accountState } from "../../../recoil/atoms/accountState";
import { selectedNoteId } from "../../../recoil/atoms/noteState";
import { useEffect, useState } from "react";
import "./Summary.css";

function Summary() {
    const [account, setAccount] = useRecoilState(accountState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [foodExpense, setFoodExpense] = useState(0);
    const [transportationExpense, setTransportationExpense] = useState(0);
    const [sightseeingExpense, setSightseeingExpense] = useState(0);
    const [shoppingExpense, setShoppingExpense] = useState(0);
    const [otherExpense, setOtherExpense] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBudget, setTotalBudget] = useState(200000);
    const [percentage, setPercentage] = useState(0);
    const [progressBarWidth, setprogressBarWidth] = useState(0);

    const createExepnse = (categoryTitle) => {
        const value = parseInt(
            account
                .filter((list) => list.tId === selectedNote)
                .map((list2) => {
                    return list2.daily
                        .map((e) => {
                            return e.content
                                .filter(
                                    (item) => item.category === categoryTitle
                                )
                                .reduce((acc, cur) => acc + cur.price, 0);
                        })
                        .reduce((acc, cur) => acc + cur, 0);
                })
        );
        return value ? value : 0;
    };

    const costToString = (cost) => {
        return cost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    const expensePercentage = (expense) => {
        const value = Math.round(expense / totalExpense) * 100;
        return value ? value : 0;
    };

    const processBarWidth = (expense) => {
        const value = (expense / totalExpense) * 300 + 100;
        return value ? value : 100;
    };

    useEffect(() => {
        setFoodExpense(createExepnse("식비"));
        setTransportationExpense(createExepnse("교통비"));
        setSightseeingExpense(createExepnse("관광"));
        setShoppingExpense(createExepnse("쇼핑"));
        setOtherExpense(createExepnse("기타"));
        setTotalExpense(
            createExepnse("식비") +
                createExepnse("교통비") +
                createExepnse("관광") +
                createExepnse("쇼핑") +
                createExepnse("기타")
        );
    }, [account]);

    useEffect(() => {
        setPercentage(Math.round((totalExpense / totalBudget) * 100));
        setprogressBarWidth((percentage / 100) * 450);
        // console.log("percentage: ", percentage);
        // console.log("progressBarWidth: ", progressBarWidth);
    });

    return (
        <div className="account-summary">
            <div className="account-summary-total">
                <div className="account-summary-total-left">
                    <div className="account-summary-total-left-top">
                        총 지출
                    </div>
                    <div
                        className="account-summary-total-left-bottom"
                        onClick={() => {
                            setTotalBudget(
                                parseInt(
                                    prompt(
                                        "변경할 예산을 입력해주세요.",
                                        totalBudget
                                    )
                                )
                            );
                        }}
                    >
                        총 예산 변경하기
                    </div>
                </div>
                <div className="account-summary-total-center">
                    <div
                        className="account-summary-total-progress-bar"
                        style={{ width: `${progressBarWidth}px` }}
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
                        {costToString(totalExpense)}원
                    </div>
                    <div className="account-summary-total-right-bottom">
                        {costToString(totalBudget)}원
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
                            {costToString(foodExpense)}원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(foodExpense)}%
                        </div>
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(foodExpense)}px`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            교통비
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(transportationExpense)}원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(transportationExpense)}%
                        </div>
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(
                                    transportationExpense
                                )}px`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            관 광
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(sightseeingExpense)}원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(sightseeingExpense)}%
                        </div>
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(
                                    sightseeingExpense
                                )}px`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            쇼 핑
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(shoppingExpense)}원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(shoppingExpense)}%
                        </div>
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(shoppingExpense)}px`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            기 타
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(otherExpense)}원
                        </div>
                    </div>
                    <div className="account-summary-content-item-right">
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(otherExpense)}%
                        </div>
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(otherExpense)}px`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;
