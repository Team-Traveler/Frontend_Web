import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MyTravelMap from "../MyTravelMap/MyTravelMap";
import "./styles.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { setPlaceStateSelector } from "../../../recoil/atoms/placeState";
import {
    searchSubmitState,
    selectedTravelState,
    fromPlaceSearchState,
    placeSearchState,
} from "../../../recoil/atoms/placeSearchState";
import { userInfoState } from "../../../recoil/atoms/userState";
import {
    travelCourseIndex,
    travelCourseState,
    setTravelSpecificStateSelector,
    selectedTIDState,
    travelSpecificState,
    getCourseByDcIdSelector,
    setCourseByDcIdSelector,
    travelCourseDcid,
} from "../../../recoil/atoms/travelSpecificState";

import Map from "../MyTravelMap/api/Map";
import axios from "axios";
import { createPlaceState } from "../../../recoil/atoms/createPlaceState";
import { create } from "@mui/material/styles/createTransitions";
import {
    isTravelDataCreatedState,
    myAllTravelsState,
    travelCoursesByTidSelector,
} from "../../../recoil/atoms/myAllTravelsState";
import { API } from "../../../config";
import CreateSpot from "./CreateSpot";

function TravelCard({ index, selectedTID, Place, setPlace, setplaceSearchState, InputText, recoilPlaces, setInputText, inputPlaceholder,...props }) {
    const [createPlace, setCreatePlace] = useRecoilState(createPlaceState); // 여행 임시 저장 state

    /* Input */
    const [search, setSearch] = useState("");
    const [isFromSearch, setIsFromSearch] = useRecoilState(fromPlaceSearchState);
    const onChange = (e) => {
        setInputText(e.target.value);
    };
    const [modal, setModal] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setPlace(InputText);
        setInputText("");
    };

    function handleItemClick(item) {
        setplaceSearchState(item);
        setIsFromSearch(true);
        //console.log("Clicked item:", item);
    }

    const handleEditSpecificsClick = (course) => {};

    const handleDeleteClick = (spotNum) => {};

    const convertDistance = (distance) => {
        if (distance >= 1000) {
            return `${distance / 1000}km`;
        }
        return `${distance}m`;
    };

    function getDayOfWeek(input, index) {
        const date = new Date(input);
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const nextDayIndex = (date.getDay() + index) % 7;

        // 월과 일을 추출
        const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
        const day = date.getDate();
        
        // 월.일 형태로 포맷팅
        const formattedDateString = `${month}.${day}`;
        return `${formattedDateString} (${days[nextDayIndex]})`;
    }

    useEffect(()=>{
        if(InputText){
            setModal(true);
        }
        else setModal(false);
    },[InputText,Place])

    const SpotDisplay = ({ num, spot, distance }) => (
        <div className="spot-wrapper">
            <div className="spot-container">
                <div className="num-box">{`${num}`}</div>
                <div className="travel-card-places">{spot}</div>
                <div
                    className="travel-carrd-delete"
                    onClick={handleDeleteClick(num)}
                >
                    삭제
                </div>
            </div>
            {distance && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        marginTop: "10px",
                        marginBottom: "10px",
                        marginLeft: "10px",
                        marginRight: "40px",
                    }}
                >
                    <div className="div-size">|</div>
                    <div>{convertDistance(distance)}</div>
                </div>
            )}
        </div>
    );

    return (
        <div className="travel-card-box">
            <div className="travel-card-create-header">
                <span className="numofDay">{index + 1}일 차</span>
                <span className="day">
                   {getDayOfWeek(createPlace.start_date, index)}
                </span>
            </div>
            <div className="travel-create-card">
                {createPlace.courses[index].spot1.title == null ? (
                    <div className="inputFormContainer">
                        <form className="inputform" onSubmit={handleSearch}>
                            <input
                                className="search-"
                                placeholder={inputPlaceholder}
                                onChange={onChange}
                                value={InputText}
                            />
                        </form>
                    {modal&&(
                    <div className="result-Style">
                        {recoilPlaces.map((item, i) => (
                            <div
                                key={i}
                                className="item-search-create-container"
                                onClick={() => handleItemClick(item)}
                            >
                                <div>
                                    <span
                                        style={{
                                            fontSize: "23px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.place_name}
                                    </span>
                                    {item.road_address_name ? (
                                        <div
                                            style={{
                                                fontSize: "19px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <span>
                                                {item.road_address_name}
                                            </span>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                fontSize: "19px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <span>{item.address_name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="pagi-nation" id="pagination"></div>
                        </div>
                    )
                    }
                    </div>
                
                ) : (
                    <SpotDisplay
                        num="1"
                        spot={createPlace.courses[index].spot1}
                        distance={createPlace.courses[index].first}
                    />
                )}
                {createPlace.courses[index].spot2.title && (
                    <SpotDisplay
                        num="2"
                        spot={createPlace.courses[index].spot2}
                        distance={createPlace.courses[index].second}
                    />
                )}
                {createPlace.courses[index].spot3.title && (
                    <SpotDisplay
                        num="3"
                        spot={createPlace.courses[index].spot3}
                        distance={createPlace.courses[index].third}
                    />
                )}
                {createPlace.courses[index].spot4.title && (
                    <SpotDisplay
                        num="4"
                        spot={createPlace.courses[index].spot4}
                    />
                )}
            </div>
        </div>
    );
}

function MyTravelCreateLists({ setView, selectedTID, ...props }) {
    const TAG = "MyTravelCreateLists";
    const [Place, setPlace] = useState("");
    const [searchSubmit, setSearchSubmit] = useRecoilState(searchSubmitState);
    const [InputText, setInputText] = useState("");
    const [inputPlaceholder, setInputPlaceholder] = useState("장소를 검색해 보세요");
    const [hide, setHide] = useState(true);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [searchState, setplaceSearchState] = useRecoilState(placeSearchState);
    const [recoilPlaces, setRecoilPlaces] = useRecoilState(setPlaceStateSelector);

    const [selectTravel, setSelectTravel] = useRecoilState(selectedTravelState);
    const [travelCourse, setTravelCourse] = useRecoilState(travelCourseState);
    const [travelIndex, setTraveIndex] = useRecoilState(travelCourseIndex);

    const [travelData, setTravelData] = useRecoilState(myAllTravelsState); // 여행 전체정보 state
    const [isTravelCreate, setIsTravelCreate] = useRecoilState(
        isTravelDataCreatedState
    ); // 여행 생성 유무 확인 state
    const [createPlace, setCreatePlace] = useRecoilState(createPlaceState); // 여행 임시 저장 state (X)

    //선택된 여행
    const selectedCourse = travelData.find(
        (travel) => travel.tid === selectedTID
    );

    function calculateDaysBetweenDates(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end - start;
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return Math.ceil(daysDiff);
    }

    //여행 상세 생성 api 호출
    useEffect(() => {
        async function getNewTravel() {
            try {
                const response = await axios({
                    method: "GET",
                    url: `${API.HEADER}/travel/${selectedTID}/course`,
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                    data: {
                        numofDay: calculateDaysBetweenDates(
                            selectedCourse.start_date,
                            selectedCourse.end_date
                        ),
                    },
                });
                console.log("떼온 데이터", response.data); // 받아온 응답 데이터를 콘솔에 출력
                setTravelCourse(response.data.result);
            } catch (error) {
                console.error("Error posting travel new data:", error);
            }
        }
        getNewTravel();
    }, []);

    useEffect(() => {
        console.log("travelCourse", travelCourse);
    }, [travelCourse]);

    //여행 상세 추가 api 호출
    async function postTravelData(title, lat, lng, dcid) {
        try {
            const response = await axios({
                method: "POST",
                url: `${API.HEADER}/travel/course/${dcid}/spot`,
                headers: {
                    Authorization: `${userInfo.accessToken}`,
                },
                data: {
                    title: title,
                    latitude: lat,
                    longitude: lng,
                },
            });
            console.log(response.data); // 받아온 응답 데이터를 콘솔에 출력
            console.log(response.data.result);
        } catch (error) {
            console.error("Error posting travel specific data:", error);
        }
    }

    const handleSubmit = () => {
        const courseindex = +travelIndex.index;
        console.log(searchState);
        if (searchState == null) {
            alert("장소 입력을 완료해주세요.");
            return;
        }
        // console.log("디버깅", selectedCourse);

        // 1. 여기 들어오면서 날짜 만큼 칸 파고, 해당 데이터만큼 화면에 뿌려주기
        // 2. 뿌린거 아래에 검색 창 달기
        // 3. 검색창 엔터 치면 걍 바로 코스 만들기
        // 4. 완성 버튼 누르면 뒤로가기

        postTravelData(
            searchState.place_name,
            parseFloat(searchState.y),
            parseFloat(searchState.x),
            selectedCourse.dcId
        );

        setSearchSubmit(searchState);
        setplaceSearchState(null);
    };

    useEffect(() => {
        const newPlaceholder =
            Place && Place.place_name
                ? Place.place_name
                : "장소를 검색해 보세요";
        setInputPlaceholder(newPlaceholder);
    }, [Place]);

    return (
        <div>
            <div className="specific-box">
                <div className="map-box">
                    {/* <MyTravelMap isTravelCreate={isTravelCreate}/> */}
                    <Map
                        isFromCreate={true}
                        searchPlace={Place}
                        setRecoilPlaces={setRecoilPlaces}
                    />
                </div>
                <div>
                    <div className="my-travel-create-lists">
                        <div>
                            <TravelCard
                                index={createPlace.nunOfCourse}
                                selectedTID={selectedTID}
                                Place = {Place}
                                setPlace = {setPlace}
                                InputText = {InputText}
                                setInputText = {setInputText}
                                inputPlaceholder = {inputPlaceholder}
                                setplaceSearchState = {setplaceSearchState}
                                recoilPlaces={recoilPlaces}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="button-create-container">
                <button className="button" onClick={() => handleSubmit()}>
                    {"완성"}
                </button>
            </div>
        </div>
    );
}

export default MyTravelCreateLists;
