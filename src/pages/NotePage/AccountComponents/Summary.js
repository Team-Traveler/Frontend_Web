import { useRecoilState } from "recoil";
import { accountState } from "../../../recoil/atoms/accountState";
import { selectedNoteId } from "../../../recoil/atoms/noteState";
import { useEffect, useState } from "react";
import { userInfoState } from "../../../recoil/atoms/userState";
import { noteState } from "../../../recoil/atoms/noteState";
import "./Summary.css";
import axios from "axios";
import { API } from "../../../config";

function Summary() {
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [account, setAccount] = useRecoilState(accountState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    // 여기부터 데이터
    const [lodgingExpense, setLodgingExpense] = useState(0);
    const [foodExpense, setFoodExpense] = useState(0);
    const [transportationExpense, setTransportationExpense] = useState(0);
    const [sightseeingExpense, setSightseeingExpense] = useState(0);
    const [shoppingExpense, setShoppingExpense] = useState(0);
    const [otherExpense, setOtherExpense] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBudget, setTotalBudget] = useState(200000);
    const [percentage, setPercentage] = useState(0);
    const [progressBarWidth, setprogressBarWidth] = useState(0);
    const fetchAccountBook = async () => {
        try {
            const response = await axios.get(
                `${API.HEADER}/accountbook/${selectedNote}/summaryTravel`,
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            ).then((res)=>{
                setFoodExpense(res.data.result.foodExpense);
                setTransportationExpense(res.data.result.transportationExpense);
                setSightseeingExpense(res.data.result.sightseeingExpense);
                setShoppingExpense(res.data.result.shoppingExpense);
                setOtherExpense(res.data.result.otherExpense);
                setTotalExpense(res.data.result.totalExpense);
                setTotalBudget(res.data.result.totalBudget);
                console.log("acoount book 조회 성공");

                console.log(
                    "account book 조회 response.data.result : ",
                    res.data.result
                );
                console.log(noteList);
            });
        
        } catch (error) {
            console.log("가계부 조회 실패");
            console.log(error);
        }
    };
    useEffect(() => {
        console.log("sdas");
        // book check
        fetchAccountBook();
    }, [account]);
    


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
        const value = Math.round(expense*100 / totalExpense);
        return value ? value : 0;
    };

    const processBarWidth = (expense) => {
        if(expense==0){ return 0; }
        const value = (expense / totalExpense) * 30 ;
        return value ? value : 0;
    };

    useEffect(() => {
        setFoodExpense(createExepnse("식비"));
        setTransportationExpense(createExepnse("교통"));
        setSightseeingExpense(createExepnse("관광"));
        setShoppingExpense(createExepnse("쇼핑"));
        setOtherExpense(createExepnse("기타"));
        setTotalExpense(
            createExepnse("식비") +
                createExepnse("교통") +
                createExepnse("관광") +
                createExepnse("쇼핑") +
                createExepnse("기타") + 
                createExepnse("숙박")
        );
    }, [account]);

    useEffect(() => {
        if(totalExpense==0 && totalBudget==0){
            setPercentage(0);
        } else {
            setPercentage(Math.round((totalExpense / totalBudget) * 100));
        }
        setprogressBarWidth(percentage);
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
                    {noteList.some((e) => e.tid===selectedNote) ? (
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
                        예산 변경하기
                    </div>
                    ) : (<div className="account-summary-totalBudget-Change-disabled"></div>)
                    }
                </div>
                <div className="account-summary-total-center">
                    <div
                        className="account-summary-total-progress-bar"
                        style={{ width: `${progressBarWidth}%` }}
                    ></div>
                    <div
                        className="account-summary-total-percentage"
                        style={{
                            color: `${percentage > 100 ? "red" : "black"}`,
                        }}
                    >
                        {percentage==NaN ? (0):(percentage) }%
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
                    <div className="account-summary-content-item-right">
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(
                                    lodgingExpense
                                )}vw`,
                            }}
                        ></div>
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(lodgingExpense)}%
                        </div>
                    </div>
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            숙 소
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(lodgingExpense)}원
                        </div>
                    </div>                    
                </div>
                <div className="account-summary-content-item">
                <div className="account-summary-content-item-right">
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(foodExpense)}vw`,
                            }}
                        ></div>
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(foodExpense)}%
                        </div>                        
                    </div>                    
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            식 비
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(foodExpense)}원
                        </div>
                    </div>
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-right">
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(
                                    transportationExpense
                                )}vw`,
                            }}
                        ></div>
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(transportationExpense)}%
                        </div>
                    </div>
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            교 통
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(transportationExpense)}원
                        </div>
                    </div>                    
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-right">
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(
                                    sightseeingExpense
                                )}vw`,
                            }}
                        ></div>                        
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(sightseeingExpense)}%
                        </div>
                    </div>
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            관 광
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(sightseeingExpense)}원
                        </div>
                    </div>                    
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-right">
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(shoppingExpense)}vw`,
                            }}
                        ></div>
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(shoppingExpense)}%
                        </div>
                    </div>
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            쇼 핑
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(shoppingExpense)}원
                        </div>
                    </div>                    
                </div>
                <div className="account-summary-content-item">
                    <div className="account-summary-content-item-right">
                        <div
                            className="account-summary-content-item-progress-bar"
                            style={{
                                width: `${processBarWidth(otherExpense)}vw`,
                            }}
                        ></div>                        
                        <div className="account-summary-content-item-percentage">
                            {expensePercentage(otherExpense)}%
                        </div>
                    </div>
                    <div className="account-summary-content-item-left">
                        <div className="account-summary-content-item-category">
                            기 타
                        </div>
                        <div className="account-summary-content-item-cost">
                            {costToString(otherExpense)}원
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
}

export default Summary;
