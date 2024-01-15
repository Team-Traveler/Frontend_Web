import { useRecoilState } from "recoil";
import { accountState } from "../../../recoil/atoms/accountState";
import { selectedNoteId } from "../../../recoil/atoms/noteState";
import { userInfoState } from "../../../recoil/atoms/userState";
import { noteState } from "../../../recoil/atoms/noteState";
import "./Daily.css";
import del_btn from "../../../assets/images/del_btn.png";
import add_btn from "../../../assets/images/add_btn.png";
import { useEffect, useState } from "react";
import ExpenseButtons from "./DropDown/dropdown";
import axios from "axios";

function Daily() {
    const [account, setAccount] = useRecoilState(accountState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    // Server Address
    const serverUrl = "https://traveler-back.shop";
    useEffect(() => {
        console.log("account", account);
    }, [account]);
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

    const createItem = () => {
        let category = prompt("카테고리 입력(식비/교통비/쇼핑/관광/기타)");
        let title = prompt("내용 입력");
        let price = parseInt(prompt("금액 입력"));
        let date = prompt("날짜 입력");

        // category, title, price, date 값의 유효성 검사
        if (!category || !title || isNaN(price) || !date) {
            alert("올바른 입력 값을 제공하지 않았습니다.");
            return;
        }

        // id 값 설정
        let id = 1; // 기본값으로 1 설정

        // account에서 selectedNote에 해당하는 리스트 가져오기
        const selectedList = account.find((list) => list.tId === selectedNote);

        // 만약 리스트가 있다면
        if (selectedList) {
            // 선택한 리스트의 daily 배열 가져오기
            const dailyList = selectedList.daily;

            // dailyList에서 선택한 date에 해당하는 daily 객체 가져오기
            const selectedDaily = dailyList.find(
                (daily) => daily.date === date
            );

            // 만약 선택한 date에 해당하는 daily가 있다면
            if (selectedDaily) {
                // 해당 daily의 content에서 가장 큰 id 값을 찾아서 1을 더합니다.
                const maxId = Math.max(
                    ...selectedDaily.content.map((item) => item.id)
                );
                id = maxId + 1;
            }
        }

        // item 객체 생성
        const newItem = {
            id: id,
            category: category,
            title: title,
            price: price,
        };

        // 만약 account의 selectedNote에 해당하는 tId를 가진 list가 없다면 생성
        if (!account.find((list) => list.tId === selectedNote)) {
            setAccount([
                ...account,
                {
                    tId: selectedNote,
                    daily: [
                        {
                            dateId: 1,
                            date: date,
                            content: [newItem], // newItem 추가
                        },
                    ],
                },
            ]);
        }
        // 만약 account의 selectedNote에 해당하는 tId를 가진 list가 있다면
        else {
            // 해당 tId를 가진 list의 daily에 해당 날짜가 있는지 확인
            if (
                account
                    .find((list) => list.tId === selectedNote)
                    .daily.find((e) => e.date === date)
            ) {
                // 해당 날짜가 있다면 해당 날짜의 content에 item 추가
                setAccount(
                    account.map((list) => {
                        if (list.tId === selectedNote) {
                            return {
                                ...list,
                                daily: list.daily.map((e) => {
                                    if (e.date === date) {
                                        return {
                                            ...e,
                                            content: [...e.content, newItem], // newItem 추가
                                        };
                                    }
                                    return e;
                                }),
                            };
                        }
                        return list;
                    })
                );
            }
            // 해당 tId를 가진 list의 daily에 해당 날짜가 없다면
            else {
                // 해당 날짜를 추가하고 content에 item 추가
                setAccount(
                    account.map((list) => {
                        if (list.tId === selectedNote) {
                            return {
                                ...list,
                                daily: [
                                    ...list.daily,
                                    {
                                        dateId: list.daily.length + 1,
                                        date: date,
                                        content: [newItem], // newItem 추가
                                    },
                                ],
                            };
                        }
                        return list;
                    })
                );
            }
        }
    };

    const deleteItem = (tId, dateId, id) => {
        // create item in account
        setAccount(
            account.map((list) => {
                if (list.tId === tId) {
                    return {
                        ...list,
                        daily: list.daily.map((e) => {
                            if (e.dateId === dateId) {
                                return {
                                    ...e,
                                    content: e.content.filter(
                                        (item) => item.id !== id
                                    ),
                                };
                            }
                            return e;
                        }),
                    };
                }
                return list;
            })
        );
    };

    return (
        <div className="account-daily">

            <div
                className="account-item-container"
                key="{`${list.tId}-${e.dateId}`}"
            >
                <div className="account-item-daily-header">
                    <div className="account-item-date">
                        11월
                    </div>
                </div>
                <div
                    className="account-input-form"
                >
                    <div
                        style={{width:"90px", height:"20px",}}
                    ></div>
                    <div className="account-input-expense-box">
                    <ExpenseButtons></ExpenseButtons> 
                    {/* <select id="account-input-expense" className="account-input-expense">
                        <option value="" disabled selected hidden>카테고리</option>
                        <option value="식비">식비</option>
                        <option value="교통비">교통비</option>
                        <option value="쇼핑">쇼핑</option>
                        <option value="관광">관광</option>
                        <option value="기타">기타</option>
                    </select> */}
                    </div>

                    <div className="account-input-description-box">
                    <input
                        type="text"
                        value={detail}
                        placeholder="세부 사항"
                        className="account-input-description"
                        onChange={handleDetailChange}
                    >
                    </input>
                    </div>
                    <div className="account-input-price-box">
                        <input
                            type="text"
                            value={price}
                            placeholder="가격"
                            className="account-input-price"
                            onChange={handlePriceChange}
                        >
                        </input>
                        <div
                            className="account-add-btn"
                            style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}
                        >
                            <img
                                src={add_btn}
                                alt="add_btn"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    createItem();
                                }}
                            />
                        </div>                        
                    </div>
                </div>
                <div className="account-daily-div-line"></div>
            </div>            
            {account.map((list) => {
                if (list.tId === selectedNote) {
                    return list.daily.map((e) => {
                        if (e.content.length !== 0) {
                            return (
                                <div
                                    className="account-item-container"
                                    key={`${list.tId}-${e.dateId}`}
                                >
                                    <div className="account-item-daily-header">
                                        <div className="account-item-date">
                                            {e.date}
                                        </div>
                                        <div className="account-item-daily-cost">
                                            {/* 합계 금액 */}
                                            {e.content
                                                .map((item) => item.price)
                                                .reduce((a, b) => a + b, 0)
                                                .toString()
                                                .replace(
                                                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )}
                                            원
                                        </div>
                                    </div>
                                    {e.content.map((item) => {
                                        if (item && item.price !== undefined) {
                                            // item 객체가 정의되어 있는지 확인
                                            return (
                                                <div
                                                    className="account-item"
                                                    key={`${list.tId}-${e.dateId}-${item.id}`}
                                                >
                                                    {/* 삭제 버튼 */}
                                                    {noteList.map((note) => {
                                                        if (
                                                            note.tid ===
                                                            selectedNote
                                                        ) {
                                                            return note.isEdit ? (
                                                                <img
                                                                    className="account-item-del-btn"
                                                                    src={
                                                                        del_btn
                                                                    }
                                                                    alt="del_btn"
                                                                    onClick={() => {
                                                                        deleteItem(
                                                                            list.tId,
                                                                            e.dateId,
                                                                            item.id
                                                                        );
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="account-item-del-btn-diable"></div>
                                                            );
                                                        }
                                                    })}

                                                    <div className="account-item-category-box">
                                                        <div className="account-item-category">
                                                            {item.category}
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="account-item-title-box">
                                                        <div className="account-item-title">
                                                            {item.title}
                                                        </div>
                                                    </div>
                                                    <div className="account-item-price-box">
                                                        <div className="account-item-price">
                                                            {item.price !==
                                                            undefined ? (
                                                                <>
                                                                    {item.price
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
                                        <div
                                            className="account-input-form"
                                        >
                                            <div
                                                style={{width:"90px", height:"20px",}}
                                            ></div>
                                            <div className="account-input-expense-box">
                                            <ExpenseButtons></ExpenseButtons> 
                                            {/* <select id="account-input-expense" className="account-input-expense">
                                                <option value="" disabled selected hidden>카테고리</option>
                                                <option value="식비">식비</option>
                                                <option value="교통비">교통비</option>
                                                <option value="쇼핑">쇼핑</option>
                                                <option value="관광">관광</option>
                                                <option value="기타">기타</option>
                                            </select> */}
                                            </div>

                                            <div className="account-input-description-box">
                                            <input
                                                type="text"
                                                value={detail}
                                                placeholder="세부 사항"
                                                className="account-input-description"
                                                onChange={handleDetailChange}
                                            >
                                            </input>
                                            </div>
                                            <div className="account-input-price-box">
                                                <input
                                                    type="text"
                                                    value={price}
                                                    placeholder="가격"
                                                    className="account-input-price"
                                                    onChange={handlePriceChange}
                                                >
                                                </input>
                                                <div
                                                    className="account-add-btn"
                                                    style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}
                                                >
                                                    <img
                                                        src={add_btn}
                                                        alt="add_btn"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            createItem();
                                                        }}
                                                    />
                                                </div>                        
                                            </div>
                                        </div>
                                    </div>   
                                    <div className="account-daily-div-line"></div>
                                </div>
                            );
                        }
                    });
                }
            })}
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
