import { useRecoilState } from "recoil";
import { accountState } from "../../../recoil/atoms/accountState";
import { selectedNoteId } from "../../../recoil/atoms/noteState";
import { userInfoState } from "../../../recoil/atoms/userState";
import { noteState } from "../../../recoil/atoms/noteState";
import "./Daily.css";
import { API } from "../../../config";
import del_btn from "../../../assets/images/del_btn.png";
import add_btn from "../../../assets/images/add_btn.png";
import edit_btn_OFF from "../../../assets/images/edit_btn_OFF.png";
import edit_btn_ON from "../../../assets/images/edit_btn_ON.png";
import { useEffect, useState } from "react";
import ExpenseButtons from "./DropDown/dropdown";
import axios from "axios";

function Daily() {
    const [account, setAccount] = useRecoilState(accountState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    // Server Address

    const fetchAccount = async () => {
        try {
            const response = await axios.get(`${API.HEADER}/accountbook/travel/${selectedNote}`);
            console.log("가계부 조회 성공");
            console.log("가계부 조회 response : ", response);
            setAccount(response.data.result);
        } catch (error) {
            console.log(error);
            console.log("가계부 조회 실패");
        } 
    };
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { year: '2-digit', month: 'long', day: 'numeric', weekday: 'short' };
        const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(date);
        return formattedDate.replace('년 ', '. ').replace('월 ', '. ').replace('일 ', '. ') + '';
    }    

    useEffect(() => {
        fetchAccount();
        console.log("account", account);
    }, [selectedNote]);
    const [detail, setDetail] = useState('');
    const handleDetailChange = (event) => {
        setDetail(event.target.value);
      };
    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        const input = event.target.value;
        const numericInput = input.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 모두 제거
      
        const numberWithCommas = numericInput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setPrice(numberWithCommas);
        // const priceWithUnit = numberWithCommas + "원";
        // setPrice(priceWithUnit);
      };      
    // // 가계부 생성
    // const createBook = async (tid) => {
    //     try {
    //         const response = await axios.post(
    //             `${serverUrl}/accountbook/${tid}`,
    //             {
    //                 title: "new title",
    //                 items: [],
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `${userInfo.accessToken}`,
    //                 },
    //             }
    //         );
    //         console.log("체크리스트 생성 성공!");
    //         console.log("체크리스트 생성 response : ", response);
    //         setCheckList([...checkList, response.data.result]);
    //         console.log("체크리스트 생성 결과 checkList : ", checkList);
    //     } catch (error) {
    //         console.log(error);
    //         console.log("체크리스트 생성 실패");
    //     }
    // };

    const deleteItem = async (accountId, transaction) => {
        try {
            const response = await axios.delete(
                `${API.HEADER}/accountbook/${accountId}/transactions/${transaction.transactionId}`,
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            );
            console.log("내역 삭제 성공!");
            console.log("내역 삭제 response : ", response);
            fetchAccount();
            } catch (error) {
                console.log(error);
                console.log("내역 삭제 실패");
            }        
    };

    return (
        <div className="account-daily">

         
            {account.map((list) => {   
                if(list.accountId == null){
                    return (
                        <div
                        className="account-item-container"
                    >
                        <div className="account-item-daily-header">
                            <div className="account-item-date">
                                {formatDate(list.dateStr)}
                            </div>
                            <div style={{display: "flex", width: "220px",justifyContent: "space-between"}}>
                            <div className="account-item-daily-cost">
                                0원
                            </div>
                            {list.isEdit ? (
                                <img
                                className="account-item-edit-btn-ON"
                                src={
                                    edit_btn_ON
                                }
                                alt="edit-btn-ON"
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    setAccount(account.map((e) => {
                                        if(e.accountId === list.accountId){
                                            return {
                                                ...e,
                                                isEdit: !e.isEdit,
                                            };
                                        }
                                        return e;
                                    })
                                    );
                                }}
                                />
                            ) : (
                                <img
                                className="account-item-edit-btn-OFF"
                                src={
                                    edit_btn_OFF
                                }
                                alt="edit-btn-OFF"
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    setAccount(account.map((e) => {
                                        if(e.accountId === list.accountId){
                                            return {
                                                ...e,
                                                isEdit: !e.isEdit,
                                            };
                                        }
                                        return e;
                                    })
                                    );
                                }}
                                />
                            )  
                            }                            
                            </div>
                        </div>
                        <div
                            className="account-item-container"
                        >
                            <div
                                
                            >
                                <div
                                    style={{width:"90px", height:"20px",}}
                                ></div>
                                {list.isEdit ? (
                                    <ExpenseButtons tid={selectedNote} list={list}></ExpenseButtons> 
                                ) : (
                                    <div></div>
                                )
                                }
                            </div>
                        </div>   
                        <div className="account-daily-div-line"></div>
                    </div>
                    );
                }
                return (
                    <div
                        className="account-item-container"
                        key={`${list.tId}-${list.accountId}`}
                    >
                        <div className="account-item-daily-header">
                            <div className="account-item-date">
                                {formatDate(list.dateStr)}
                            </div>
                            <div style={{display: "flex", width: "220px",justifyContent: "space-between"}}>
                            <div className="account-item-daily-cost">
                                {/* 합계 금액 */}
                                {list.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                원
                            </div>
                            {list.isEdit ? (
                                <img
                                className="account-item-edit-btn-ON"
                                src={
                                    edit_btn_ON
                                }
                                alt="edit-btn-ON"
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    setAccount(account.map((e) => {
                                        if(e.accountId === list.accountId){
                                            return {
                                                ...e,
                                                isEdit: !e.isEdit,
                                            };
                                        }
                                        return e;
                                    })
                                    );
                                }}
                                />
                            ) : (
                                <img
                                className="account-item-edit-btn-OFF"
                                src={
                                    edit_btn_OFF
                                }
                                alt="edit-btn-OFF"
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    setAccount(account.map((e) => {
                                        if(e.accountId === list.accountId){
                                            return {
                                                ...e,
                                                isEdit: !e.isEdit,
                                            };
                                        }
                                        return e;
                                    })
                                    );
                                }}
                                />
                            )  
                            }
                            </div>                          
                        </div>
                        {list.transactions.map((transaction) => {
                            if (transaction && transaction.amount !== undefined) {
                                // item 객체가 정의되어 있는지 확인
                                return (
                                    <div
                                        className="account-item"
                                        key={`${list.tId}-${list.accountId}-${transaction.transactionId}`}
                                    >
                                        {/* 삭제 버튼 */}
                                        {list.isEdit ? (
                                                    <img
                                                        className="account-item-del-btn"
                                                        src={
                                                            del_btn
                                                        }
                                                        alt="del_btn"
                                                        onClick={() => {
                                                            deleteItem(list.accountId,transaction);
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="account-item-del-btn-diable"></div>
                                                )
                                        }

                                        <div className="account-item-category-box">
                                            <div className="account-item-category">
                                                {transaction.expenseCategory}
                                            </div>
                                            
                                        </div>
                                        <div className="account-item-title-box">
                                            <div className="account-item-title">
                                                {transaction.expenseDetail}
                                            </div>
                                        </div>
                                        <div className="account-item-price-box">
                                            <div className="account-item-price">
                                                {transaction.amount !==
                                                undefined ? (
                                                    <>
                                                        {transaction.amount
                                                            .toString()
                                                            .replace(
                                                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )}
                                                        원
                                                    </>
                                                ) : (
                                                    "가격 없음"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null; // item이 정의되지 않았을 경우 렌더링하지 않음
                        })}
                        <div
                            className="account-item-container"
                        >
                            

                                {list.isEdit ? (
                                    <div>
                                    <div
                                    style={{width:"90px", height:"20px",}}
                                    ></div>                                    
                                    <ExpenseButtons tid={selectedNote} list={list}></ExpenseButtons> 
                                    </div>
                                ) : (
                                    <div></div>
                                )
                                }
                                


                        </div>   
                        <div className="account-daily-div-line"></div>
                    </div>
                );                
            }
            )}
            {/* {account.map((item) => (
                <div className="account-item-container">
                    <div className="account-item-daily-header">
                        <div className="account-item-date">{item.date}</div>
                        <div className="account-item-daily-cost">합계 금액</div>
                    </div>
                    {item.content.map((item) => (
                        <div className="account-item">
                            <div className="account-item-category">
                                {item.category}
                            </div>
                            <div className="account-item-title">
                                {item.title}
                            </div>
                            <div className="account-item-price">
                                {item.price}
                            </div>
                        </div>
                    ))}
                </div>
            ))} */}
        </div>
    );
}

export default Daily;
