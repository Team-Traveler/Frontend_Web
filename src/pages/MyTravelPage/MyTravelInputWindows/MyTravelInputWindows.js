import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { userInfoState } from "../../../recoil/atoms/userState";
import { useRecoilState } from "recoil";
import {
    travelsState,
    modifyTravels,
} from "../../../recoil/atoms/travelsListStates";
import { noteState } from "../../../recoil/atoms/noteState";
import "./styles.css";
import { selectedTIDState, setSelectedTIDSelector } from '../../../recoil/atoms/travelSpecificState'; 


const MyTravelInputWindows = ({ onTravelInfoSubmit, isFromEdit, setView,setIsTravelDataCreated }) => {
    const [name, setName] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startDatePicker, setStartDatePicker] = useState(null);
    const [endDatePicker, setEndDatePicker] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [travels, setTravels] = useRecoilState(travelsState); // Recoil state 가져오기
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [selectedTID, setSelectedTID] = useRecoilState(selectedTIDState);

    // 여행 생성 api 호출
    async function postTravelData(travelInfo) {
        try {
            const response = await axios({
                method: 'POST',
                url: "http://15.164.232.95:9000/travel",
                headers: {
                    Authorization: `${userInfo.accessToken}` 
                },
                data: {
                    title: travelInfo.name,
                    destination: travelInfo.category,
                    start_date: travelInfo.start,
                    end_date: travelInfo.end,
                    write_status: travelInfo.write_status
                }
            });
    
            console.log(response.data); // 받아온 응답 데이터를 콘솔에 출력
    
        } catch (error) {
            console.error("Error posting travel data:", error);
        }
    }

    // 여행 수정 api 호출
    async function patchTravelData(travelInfo,selectedTID) {
        try {
            const response = await axios({
                method: 'PATCH',
                url: `http://15.164.232.95:9000/travel/${selectedTID}`,
                headers: {
                    Authorization: `${userInfo.accessToken}` 
                },
                data: {
                    title: travelInfo.name,
                    destination: travelInfo.category,
                    start_date: travelInfo.start,
                    end_date: travelInfo.end,
                    write_status: travelInfo.write_status
                }
            });
    
            console.log(response.data); // 받아온 응답 데이터를 콘솔에 출력
    
        } catch (error) {
            console.error("Error posting travel data:", error);
        }
    }

    const handleExampleComponent = () => {
        // 지도로 확인 버튼
    };

    const handleDateInput = (type) => {
        if (type === "start") {
            setShowStartDatePicker(true);
        } else {
            setShowEndDatePicker(true);
        }
    };

    const handleDateChange = (date, type) => {
        if (type === "start") {
            setStartDatePicker(date);
            setStartDate(date);
        } else if (type === "end") {
            setEndDatePicker(date);
            setEndDate(date);
        }
    };

    const handleSubmit = (isFromEdit) => {
        const newTid = travels.length + 1;
        const travelInfo = {
            id: newTid, 
            name: name,
            category: category,
            start: formatPostDate(startDate),
            end: formatPostDate(endDate),
            write_status: 1,
        };
        if(isFromEdit){ // 여행 편집

            patchTravelData(travelInfo,selectedTID);


        }else{  // 여행 생성
                //axios 통신
                postTravelData(travelInfo);

                setTravels((prevTravels) => [...prevTravels, travelInfo]); // 새 여행 정보 추가
                setNoteList([
                    ...noteList,
                    {
                        id: noteList.length + 1,
                        title: name,
                    },
                ]);
        };
        setIsTravelDataCreated(true);
        setView("list");

    };

    useEffect(() => {
        console.log(noteList);
    }, [noteList]);

    const getSpanClass = (date) => {
        if (date) return "calender-text"; // 날짜가 있으면 calender-text 스타일
        return "calender-empty-text"; // 날짜가 없으면 calender-empty-text 스타일 적용
    };

    // 날짜 포맷 변환 함수
    const formatDate = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}년 ${month}월 ${day}일`;
    };

    const formatPostDate = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <div className="container">
                <div className="input-window" style={{ marginRight: "1.79vw" }}>
                    <h3 className="title">여행 코스 이름</h3>
                    <input
                        className="input"
                        placeholder="여행 코스 이름"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* 키보드 입력을 활성화하는 버튼 로직 구현 필요 */}
                    <button className="pencil-button"></button>
                </div>

                <div className="input-window" style={{ marginRight: "1.79vw" }}>
                    <h3 className="title">어디로?</h3>
                    <input
                        type="text"
                        className="input"
                        placeholder="지도로 확인하세요."
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <button
                        className="location-button"
                        onClick={handleExampleComponent}
                    ></button>
                </div>

                <div className="input-window">
                    <h3 className="title">언제?</h3>
                    <div className="date">
                        <div className="date-section">
                            <span>출발</span>
                            <span
                                className={getSpanClass(startDate)}
                                data-placeholder="2023년 00월 00일"
                            >
                                {formatDate(startDate) || "2023년 00월 00일"}
                            </span>
                            {showStartDatePicker && (
                                <DatePicker
                                    calendarClassName="datepicker-calendar"
                                    inline
                                    selected={startDatePicker}
                                    onChange={(date) =>
                                        handleDateChange(date, "start")
                                    }
                                    placeholderText="2023년 00월 00일"
                                    dateFormat="yyyy년 MM월 dd일"
                                    onSelect={() =>
                                        setShowStartDatePicker(false)
                                    } // 선택 후 숨기기
                                />
                            )}
                            <button
                                className="calendar-button"
                                onClick={() => handleDateInput("start")}
                            ></button>
                        </div>
                        <div className="date-section">
                            <span>도착</span>
                            <span
                                className={getSpanClass(endDate)}
                                data-placeholder="2023년 00월 00일"
                            >
                                {formatDate(endDate) || "2023년 00월 00일"}
                            </span>
                            {showEndDatePicker && (
                                <DatePicker
                                    calendarClassName="datepicker-calendar"
                                    inline
                                    selected={endDatePicker}
                                    onChange={(date) =>
                                        handleDateChange(date, "end")
                                    }
                                    placeholderText="2023년 00월 00일"
                                    dateFormat="yyyy년 MM월 dd일"
                                    onSelect={() => setShowEndDatePicker(false)} // 선택 후 숨기기
                                />
                            )}
                            <button
                                className="calendar-button"
                                onClick={() => handleDateInput("end")}
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button className="button" onClick={() => handleSubmit(isFromEdit)}>
                    {isFromEdit ? "여행 편집 완료" : "여행 만들기"}
                </button>
            </div>
        </>
    );
};

export default MyTravelInputWindows;
