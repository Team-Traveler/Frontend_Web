import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import TravelCard from "./TravelCard";

function MyTravelCreateLists({ setView, selectedTID, ...props }) {
    const TAG = "MyTravelCreateLists";
    const [Place, setPlace] = useState("");
    const [searchSubmit, setSearchSubmit] = useRecoilState(searchSubmitState);
    const [hide, setHide] = useState(true);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [searchState, setplaceSearchState] = useRecoilState(placeSearchState);
    const [recoilPlaces, setRecoilPlaces] = useRecoilState(setPlaceStateSelector);
    const navigate = useNavigate();
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
                    data: {
                        numofDay: calculateDaysBetweenDates(
                            selectedCourse.start_date,
                            selectedCourse.end_date
                        )+1
                    },
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    }
                });
                console.log("날짜별 코스 생성", response.data); // 받아온 응답 데이터를 콘솔에 출력
                setTravelCourse(response.data.result);
            } catch (error) {
                console.error("Error posting travel new data:", error);
            }
        }
        //getNewTravel();
    }, []);

    useEffect(() => {
    }, [travelCourse]);

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

        setSearchSubmit(searchState);
        setplaceSearchState(null);
    };

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
                                setplaceSearchState = {setplaceSearchState}
                                recoilPlaces={recoilPlaces}
                                days = {selectedCourse.courses.length}
                                selectedCourse = {selectedCourse}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="button-create-container">
                <button className="button" onClick={() => {navigate("/mypage")}}>
                    목록으로
                </button>
            </div>
        </div>
    );
}

export default MyTravelCreateLists;
