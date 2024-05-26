import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ReactDOM from "react-dom";
import MyTravelMap from "../MyTravelMap/MyTravelMap";
import axios from "axios";
import MyTravelCreate from "../MyTravelCreate/MyTravelCreate";
import MyTravelSpecificsLists from "../MyTravelSpecificsLists/MyTravelSpecificsLists";
import MyTravelCreateLists from "../MyTravelCreateLists/MyTravelCreateLists";
import {
    travelSpecificState,
    getCourseByDcIdSelector,
    setCourseByDcIdSelector,
    travelCourseState,
} from "../../../recoil/atoms/travelSpecificState";
import { setPlaceStateSelector } from "../../../recoil/atoms/placeState";
import {
    selectedTIDState,
    setSelectedTIDSelector,
} from "../../../recoil/atoms/travelSpecificState";
import { selectedTravelState } from "../../../recoil/atoms/placeSearchState";
import "./styles.css";
import MapSection from "../MyTravelMap/Map";
import Map from "../MyTravelMap/api/Map";
import { API } from "../../../config";
import { userInfoState } from "../../../recoil/atoms/userState";
import {
    isTravelDataCreatedState,
    myAllTravelsState,
    travelCoursesByTidSelector,
} from "../../../recoil/atoms/myAllTravelsState";
import { createPlaceState } from "../../../recoil/atoms/createPlaceState";

function MyTravelSpecifics({ travel, setView, ...props }) {
    const TAG = "MyTravelSpecifics";
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [showCreateComponent, setShowCreateComponent] = useState(false);
    const [isTravelCreate, setIsTravelCreate] = useRecoilState(
        isTravelDataCreatedState
    );
    const [selectedTID, setSelectedTID] = useRecoilState(selectedTIDState);
    const [travelData, setTravelData] = useRecoilState(myAllTravelsState);
    const [Place, setPlace] = useState("");
    const [recoilPlaces, setRecoilPlaces] = useRecoilState(
        setPlaceStateSelector
    );
    const [selectedTravel, setSelectedTravel] =
        useRecoilState(selectedTravelState);

    const [travelCourse, setTravelCourse] = useRecoilState(travelCourseState);
    const [travelBuffer, setTravelBuffer] = useRecoilState(createPlaceState);

    const selectedCourse = travelData.find(
        (travel) => travel.tid === selectedTID
    );

    useEffect(() => {
        //console.log("useEffect 실행됨");
        //console.log(selectedCourse.courses.length);
        console.log(travelData);
    }, []);

    return (
        <div className="specific-body">
            <div className="group490">
                <h1 className="detailTitle">여행 코스 만들기</h1>
                <p className="subText-specific">여행 일정을 추가해보세요!</p>
                <div className="rectangle"></div>
            </div>

            <div>
                <div style={{ flexGrow: 1 }}>
                    {/* {console.log(TAG, selectedCourse)} */}

                    <MyTravelCreateLists
                        showCreateComponent={showCreateComponent}
                        setShowCreateComponent={setShowCreateComponent}
                        setIsTravelCreate={setIsTravelCreate}
                        selectedTID={selectedTID}
                        Places={Place}
                        setView={setView}
                    />
                    {/* ) : (
                        <>
                            <MyTravelSpecificsLists
                                showCreateComponent={showCreateComponent}
                                setShowCreateComponent={setShowCreateComponent}
                                setIsTravelCreate={setIsTravelCreate}
                                selectedTID={selectedTID}
                                setView={setView}
                            />
                        </>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default MyTravelSpecifics;
