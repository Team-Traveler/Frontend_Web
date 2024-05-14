import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { userInfoState } from "../../../recoil/atoms/userState";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    travelsState,
    modifyTravels,
} from "../../../recoil/atoms/travelsListStates";
import { noteState } from "../../../recoil/atoms/noteState";
import "./styles.css";
import {
    selectedTIDState,
    setSelectedTIDSelector,
} from "../../../recoil/atoms/travelSpecificState";
import {
    addNewTravel,
    myAllTravelsState,
    isTravelDataCreatedState,
    updateTravelById,
    updateState,
} from "../../../recoil/atoms/myAllTravelsState.js";
import MyTravelSpecifics from "../MyTravelSpecifics/MyTravelSpecifics.js";
import { useNavigate, useHistory } from "react-router-dom";
import { API } from "../../../config.js";
import { createPlaceState } from "../../../recoil/atoms/createPlaceState.js";

const MyTravelInputWindows = ({ isFromEdit, setView, selectedTravelId }) => {
    const [name, setName] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startDatePicker, setStartDatePicker] = useState(null);
    const [endDatePicker, setEndDatePicker] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [travels, setTravels] = useRecoilState(myAllTravelsState); // Recoil state 가져오기
    const [createPlace, setCreatePlace] = useRecoilState(createPlaceState); // 여행 생성 임시 저장 state
    const setNewTravel = useSetRecoilState(addNewTravel);
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [selectedTID, setSelectedTID] = useRecoilState(selectedTIDState);
    const setUpdateTravel = useSetRecoilState(updateTravelById(selectedTID));
    const [editedTravelInfo, setEditedTravelInfo] = useRecoilState(
        updateTravelById(selectedTravelId)
    );
    const [isTravelDataCreated, setIsTravelDataCreated] = useRecoilState(
        isTravelDataCreatedState
    );
    const [update, setUpdate] = useRecoilState(updateState);
    const [isnotnull, setIsnotnull] = useState(false);
    // 여행 생성 api 호출
    async function postTravelData(travelInfo) {
        try {
            const response = await axios({
                method: "POST",
                url: `${API.HEADER}/travel`,
                headers: {
                    Authorization: `${userInfo.accessToken}`,
                },
                data: {
                    title: travelInfo.title,
                    destination: travelInfo.category,
                    start_date: travelInfo.start_date,
                    end_date: travelInfo.end_date,
                    write_status: travelInfo.write_status,
                },
            });

            const startDate = new Date(travelInfo.start_date);
            const endDate = new Date(travelInfo.end_date);
            const dateDiff = (endDate - startDate) / (1000 * 60 * 60 * 24);
            const tid = response.data.result.tid;
            // 날짜 차이, tid, uid 출력
            // console.log(
            //     `날짜 차이: ${dateDiff}일, tid: ${tid}, uid: ${response.data.result.uid}`
            // );

            for (let i = 1; i <= dateDiff+1; i++) {
                postTravelDate(i, tid);
            }
            //setNewTravel((prevTravels) => [...prevTravels, travelInfo]);
        } catch (error) {
            console.error("Error posting travel data:", error);
        }
    }

    // 여행 일정 생성 api 호출
    async function postTravelDate(date, tid) {
        try {
            const response = await axios({
                method: "POST",
                url: `${API.HEADER}/travel/${tid}/course`,
                headers: {
                    Authorization: `${userInfo.accessToken}`,
                },
                data: {
                    numofDay: date,
                },
            });

            //console.log(response.data); // 받아온 응답 데이터를 콘솔에 출력
        } catch (error) {
            console.error("Error posting travel date:", error);
        }
    }

    // 여행 수정 api 호출
    async function patchTravelData(travelInfo, selectedTID) {
        try {
            travelInfo.tid = selectedTID;
            //console.log("디버깅", travelInfo);
            setUpdateTravel(travelInfo);
            //updateMyAllTravelsState(travelInfo, selectedTID);
            const response = await axios({
                method: "PATCH",
                url: `${API.HEADER}/travel/${selectedTID}`,
                headers: {
                    Authorization: `${userInfo.accessToken}`,
                },
                data: {
                    title: travelInfo.title,
                    destination: travelInfo.category,
                    start_date: travelInfo.start_date,
                    end_date: travelInfo.end_date,
                    write_status: travelInfo.write_status,
                },
            });
            //console.log(response.data); // 받아온 응답 데이터를 콘솔에 출력
            if (response.status === 200) {
                //updateMyAllTravelsState(travelInfo, selectedTID);
            }
        } catch (error) {
            console.error("Error patchting travel data:", error);
        }
    }

    function updateMyAllTravelsState(tid, updatedTravelInfo) {
        setTravels((prevTravels) => {
            return prevTravels.map((travel) => {
                if (travel.tid === tid) {
                    // 수정된 여행 정보
                    return { ...travel, ...updatedTravelInfo };
                }
                return travel;
            });
        });
    }

    const handleExampleComponent = () => {
        // 지도로 확인 버튼
    };

    const handleCancel = () => {
        setIsTravelDataCreated(false);
        setView("list"); // 브라우저의 뒤로 가기 기능
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
            setIsnotnull(date !== null); // 여기서 isnotnull 상태 업데이트
        } else if (type === "end") {
            setEndDatePicker(date);
            setEndDate(date);
        }
    };

    const handleSubmit = async (isFromEdit) => {
        if (startDate === null || endDate === null) {
            alert("입력을 다시 확인해주세요");
            return;
        } else {
            const newTid = travels.length + 1;
            const travelInfo = {
                tid: newTid,
                title: name,
                category: category,
                start_date: formatPostDate(startDate),
                end_date: formatPostDate(endDate),
                write_status: 1,
            };

            try {
                if (isFromEdit) {
                    // 여행 편집
                    await patchTravelData(travelInfo, selectedTID);
                } else {
                    // 여행 생성
                    await postTravelData(travelInfo); // axios 통신을 기다림

                    setNewTravel(travelInfo); // 새 여행 정보 추가
                    setNoteList([
                        ...noteList,
                        {
                            id: noteList.length + 1,
                            title: name,
                        },
                    ]);
                }

                // 비동기 작업이 완료된 후 실행될 코드
                setIsTravelDataCreated(false);
                setUpdate(Math.random());
                setView("list");
            } catch (error) {
                console.error("여행 데이터 처리 중 오류 발생:", error);
                // 오류 처리 코드
            }
        }
    };

    useEffect(() => {
        // console.log(noteList);
    }, [noteList]);

    const getSpanClass = (date) => {
        if (date) return "calender-text"; // 날짜가 있으면 calender-text 스타일
        return "calender-empty-text"; // 날짜가 없으면 calender-empty-text 스타일 적용
    };

    // 날짜 포맷 변환 함수
    const formatDate = (date) => {
        if (!date) return;
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

    const today = new Date();

    const displayStartDate = startDate
        ? formatDate(startDate)
        : "출발 날짜 선택";
    const displayEndDate = endDate ? formatDate(endDate) : "도착 날짜 선택";

    const [placeHolderMessage, setPlaceHolderMessage] =
        useState("여행지를 선택하세요.");

    // 여행지 선택 input 클릭 핸들러
    const handlePlaceInputClick = () => {
        if (!name || !startDate || !endDate) {
            setPlaceHolderMessage("제목, 출발, 도착 날짜를 모두 입력해주세요.");
        } else {
            setIsTravelDataCreated(false);
            // setTimeout(() => {
            //     setIsTravelDataCreated(false);
            // }, 2000);
            // setCreatePlace((prevState) => ({
            //     ...prevState,
            //     title: name,
            //     start_date: startDate,
            //     end_date: endDate,
            // }));
            setPlaceHolderMessage("상세 보기에서 일정을 계획 해보세요.");
        }
    };

    return (
        <>
            {isTravelDataCreated ? (
                <>
                    <MyTravelSpecifics setView={setView} />
                </>
            ) : (
                <div className="container">
                    <div className="input-window-one">
                        <h3 className="title">여행 코스 이름</h3>
                        <input
                            className="input"
                            placeholder="여행 제목을 입력하세요."
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="container-second">
                        <div
                            className="input-window-two"
                            style={{ marginRight: "1.79vw" }}
                        >
                            <h3 className="title">여행지 선택</h3>
                            <input
                                type="text"
                                className="input"
                                placeholder={placeHolderMessage}
                                onChange={(e) => setCategory(e.target.value)}
                                onClick={handlePlaceInputClick}
                                disabled={isTravelDataCreated}
                            />
                        </div>
                        <div className="input-window-three">
                            <h3 className="title">여행 날짜</h3>
                            <div className="date-create">
                                <div className="date-section">
                                    <span
                                        className={getSpanClass(startDate)}
                                        onClick={() => handleDateInput("start")}
                                    >
                                        {displayStartDate}
                                    </span>
                                    {showStartDatePicker && (
                                        <DatePicker
                                            calendarClassName="datepicker-calendar"
                                            inline
                                            selected={startDatePicker}
                                            onChange={(date) =>
                                                handleDateChange(date, "start")
                                            }
                                            minDate={today}
                                            placeholderText="2024년 00월 00일"
                                            dateFormat="yyyy년 MM월 dd일"
                                            onSelect={() =>
                                                setShowStartDatePicker(false)
                                            }
                                        />
                                    )}
                                </div>
                                <div className="date-section">
                                    <span
                                        className={getSpanClass(endDate)}
                                        onClick={() => handleDateInput("end")}
                                    >
                                        {displayEndDate}
                                    </span>
                                    {showEndDatePicker && (
                                        <DatePicker
                                            calendarClassName="datepicker-calendar"
                                            inline
                                            selected={endDatePicker}
                                            onChange={(date) =>
                                                handleDateChange(date, "end")
                                            }
                                            minDate={startDate || today}
                                            placeholderText="2024년 00월 00일"
                                            dateFormat="yyyy년 MM월 dd일"
                                            onSelect={() =>
                                                setShowEndDatePicker(false)
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            취소
                        </button>

                        <button
                            className="button"
                            onClick={() => {
                                startDate && endDate
                                    ? handleSubmit(isFromEdit)
                                    : alert("입력을 다시 확인해주세요");
                            }}
                        >
                            {isFromEdit ? "여행 편집 완료" : "여행 만들기"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyTravelInputWindows;
