import axios from "axios";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";
import {
    myAllTravelsState,
    isTravelDataCreatedState,
    toggleIsTravelDataCreated,
    updateState,
} from "../../../recoil/atoms/myAllTravelsState.js";
import "./MyTravelMain.css";
import MyTravelProfile from "../MyTravelProfile/MyTravelProfile";
import MyTravelSpecifics from "../MyTravelSpecifics/MyTravelSpecifics";
import HorizontalNavigation from "../TravelHorizontalNavigation/HorizontalNavigation";
import MyTravelLists from "../MyTravelLists/MyTravelLists";
import MyTravelAdd from "../MyTravelAdd/MyTravelAdd";
import MyTravelEdit from "../MyTravelEdit/MyTravelEdit";
import MyTravelProfileEdit from "../MyTravelProfileEdit/MyTravelProfileEdit";
import Nav from "../../../components/Nav/Nav";
import { selectedTravelState } from "../../../recoil/atoms/placeSearchState";
import {
    withoutAllTravelsState,
    withoutApiState,
    withoutProfileState,
} from "../../../recoil/atoms/withoutAPI";
import { API } from "../../../config.js";
import MyTravelCreateLists from "../MyTravelCreateLists/MyTravelCreateLists.js";
import { profileState } from "../../../recoil/atoms/profileState.js";

function MyTravelMain() {
    const TAG = "MyTravelMain";
    const [view, setView] = useState("list");
    const [selectedTravel, setSelectedTravel] = useState(null); //상세보기 활성화 여부
    const [selectedTravelId, setSelectedTravelId] = useState(null);
    const [selectTravel, setSelectTravel] = useRecoilState(selectedTravelState);
    const [isEditMode, setIsEditMode] = useState(false); // 목록 편집 활성화 여부
    const profileRef = React.useRef();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [travelData, setTravelData] = useRecoilState(myAllTravelsState);
    const [update, setUpdate] = useRecoilState(updateState);
    const [IsTravelDataCreated, setIsTravelDataCreated] = useRecoilState(
        isTravelDataCreatedState
    );
    const [profileData, setProfileData] = useRecoilState(profileState);

    const updateProfileImgAndName = (newImgSrc, newName) => {
        setProfileData((prevData) => ({
            ...prevData,
            imgSrc: newImgSrc,
            name: newName,
        }));
    };

    const handleDetailClick = (travel) => {
        setSelectedTravel(travel);
        setView("specifics");
    };

    const fetchTravelData = async () => {
        await axios
            .get(`${API.HEADER}/users/my_travels`, {
                headers: { Authorization: userInfo.accessToken },
            })
            .then((response) => {
                if (response.data.isSuccess) {
                    const travelData = response.data;
                    setTravelData(travelData.result);
                    setProfileData((prevData) => ({
                        ...prevData,
                        numTravel: travelData.result.length,
                    }));

                    //console.log(TAG, travelData);
                }
            })
            .catch((error) => {
                console.log("MyTravelMain : /users/my_travels 통신에러", error);
            });
    };

    const fetchProfileData = async () => {
        await axios
            .get(`${API.HEADER}/users/profile`, {
                headers: { Authorization: userInfo.accessToken },
            })
            .then((response) => {
                if (response.data.isSuccess) {
                    const profile = response.data;
                    updateProfileImgAndName(
                        profile.result.profile_image_url,
                        profile.result.nickname
                    );
                }
            })
            .catch((e) => {
                console.log("error", e);
            });
    };

    const fetchProfileLikedData = async () => {
        await axios
            .get(`${API.HEADER}/users/myLike`, {
                headers: { Authorization: userInfo.accessToken },
            })
            .then((response) => {
                if (response.status === 200) {
                    const liked = response.data;
                    setProfileData((prevData) => ({
                        ...prevData,
                        numLiked: liked.result.length,
                    }));
                    //console.log(TAG + "-찜한목록 : ", liked);
                }
            })
            .catch((error) => {
                console.error("Error fetching like data:", error);
            });
    };

    useEffect(() => {
        fetchTravelData();
        fetchProfileData();
        fetchProfileLikedData();
        console.log(TAG, "통신 완료");
        console.log(profileData);
    }, [view, update]);

    return (
        <div className="myTravelMain">
            <Nav />
            {/* {console.log(view)} */}
            {view === "list" && (
                <div>
                    <div className="my-travel-profile" ref={profileRef}>
                        <MyTravelProfile setView={setView} />
                    </div>
                    <HorizontalNavigation
                        setView={setView}
                        toggleEditMode={() => setIsEditMode(!isEditMode)}
                    />
                </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
                {/*나의 여행*/}
                {view === "list" && (
                    <div className="my-travel-main-container">
                        <MyTravelLists
                            setView={setView}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                            view={view}
                            travelData={travelData}
                            setSelectedTravelId={setSelectedTravelId}
                        />
                    </div>
                )}

                {/* 여행 만들기 */}
                {view === "add" && (
                    <div>
                        <MyTravelAdd
                            setView={setView}
                            setIsTravelDataCreated={setIsTravelDataCreated}
                        />
                    </div>
                )}

                {/* 여행 코스 편집 */}
                {view === "edit" && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            height: "62.6vh",
                        }}
                    >
                        <MyTravelEdit setView={setView} />
                    </div>
                )}

                {/* 프로필 편집 */}
                {view === "profile" && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            height: "62.6vh",
                        }}
                    >
                        <MyTravelProfileEdit
                            profileData={profileData}
                            setProfileData={setProfileData}
                        />
                    </div>
                )}

                {/* 상세보기 */}
                {view === "specifics" && (
                    <div style={{ flexGrow: 1 }}>
                        <MyTravelSpecifics setView={setView} />
                    </div>
                )}

                {/* 찜한 여행 */}
                {view === "like" && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            height: "62.6vh",
                        }}
                    >
                        찜한여행
                    </div>
                )}

                {/* 리뷰 작성 */}
                {view === "review" && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            height: "62.6vh",
                        }}
                    >
                        리뷰작성
                    </div>
                )}

                {/* 공유 */}
                {view === "share" && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            height: "62.6vh",
                        }}
                    >
                        공유하기
                    </div>
                )}

                <div
                    style={{
                        position: "absolute",
                        left: "2.2vw",
                        bottom: "3.1vh",
                        zIndex: 1000,
                    }}
                ></div>
            </div>
        </div>
    );
}

export default MyTravelMain;
