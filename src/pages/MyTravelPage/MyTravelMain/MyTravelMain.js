import axios from "axios";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";
import {
    myAllTravelsState,
    isTravelDataCreatedState,
    toggleIsTravelDataCreated,
} from "../../../recoil/atoms/myAllTravelsState.js";
import "./MyTravelMain.css";
import MyTravelProfile from "../MyTravelProfile/MyTravelProfile";
import MyTravelSpecifics from "../MyTravelSpecifics/MyTravelSpecifics";
import HorizontalNavigation from "../TravelHorizontalNavigation/HorizontalNavigation";
import MyTravelLists from "../MyTravelLists/MyTravelLists";
import MyTravelAdd from "../MyTravelAdd/MyTravelAdd";
import profileTest from "./profileTest.png";
import MyTravelEdit from "../MyTravelEdit/MyTravelEdit";
import MyTravelProfileEdit from "../MyTravelProfileEdit/MyTravelProfileEdit";
import Nav from "../../../components/Nav/Nav";
import { updateState } from "../../../recoil/atoms/updateState.js";
import { selectedTravelState } from "../../../recoil/atoms/placeSearchState";
import {
    withoutAllTravelsState,
    withoutApiState,
    withoutProfileState,
} from "../../../recoil/atoms/withoutAPI";
import { API } from "../../../config.js";
import MyTravelCreateLists from "../MyTravelCreateLists/MyTravelCreateLists.js";

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
    const [profileData, setProfileData] = useState({
        imgSrc: profileTest,
        name: "라이언",
        numTravel: 8,
        numLiked: 20,
        date: "2023.08.23",
        email: "OOOOOOOOO@naver.com",
    });

    // import { withoutAllTravelsState,
    //     withoutApiState,

    //     }from "../../../recoil/atoms/withoutAPI";
    const [isWithoutApi, setIsWithoutApi] = useRecoilState(withoutApiState);
    const [withoutAllTravel, setWithoutAllTravel] = useRecoilState(
        withoutAllTravelsState
    );
    const [withoutProfile, setWithoutProfile] =
        useRecoilState(withoutProfileState);

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

    useEffect(() => {
        async function fetchTravelData() {
            try {
                const response = await axios({
                    method: "GET",
                    url: `${API.HEADER}/users/my_travels`,
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const travelData = response.data;
                    setTravelData(travelData.result);
                    if (isWithoutApi) {
                        setWithoutAllTravel(travelData.result);
                    }
                    setProfileData((prevData) => ({
                        ...prevData,
                        numTravel: travelData.result.length,
                    }));

                    const travelDat = {
                        numTravel: travelData.result.length,
                    };
                    //console.log(travelDat);
                    //setWithoutProfile(travelDat);
                    //console.log(TAG, travelData);
                }
            } catch (error) {
                console.log("MyTravelMain : /users/my_travels 통신에러", error);
                // if (!isWithoutApi) {
                //     const travelData = [
                //         {
                //             title: "통신에러",
                //             destination: "여수",
                //             start_date: "2023-08-18 09:00:00",
                //             end_date: "2023-08-20 09:00:00",
                //             created_at: "2023-08-17 01:07:27",
                //             time_status: 1,
                //             writeStatus: 0,
                //             noteStatus: 0,
                //             courses: [
                //                 {
                //                     dcId: 0,
                //                     spot1: null,
                //                     spot2: null,
                //                     spot3: null,
                //                     spot4: null,
                //                     first: null,
                //                     second: null,
                //                     third: null,
                //                     numOfDay: 1,
                //                 },
                //             ],
                //             tid: 1,
                //             uid: 1,
                //         },
                //     ];

                //     setTravelData(travelData);
                //     const travelDat = {
                //         numTravel: 0,
                //     };
                //     setWithoutProfile(travelDat);
                // }
            }
        }
        fetchTravelData();
    }, [view, update]);

    useEffect(() => {
        async function fetchProfilelData() {
            try {
                const response = await axios({
                    method: "GET",
                    url: `${API.HEADER}/users/profile`,
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const profile = response.data;
                    updateProfileImgAndName(
                        profile.result.profile_image_url,
                        profile.result.nickname
                    );
                    setWithoutProfile(profile.result);
                    //console.log(TAG + "-카카오프로필 : ", profileData);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        }
        fetchProfilelData();
    }, [travelData, update]);

    useEffect(() => {
        async function fetchProfilelLikedData() {
            try {
                const response = await axios({
                    method: "GET",
                    url: `${API.HEADER}/users/myLike`,
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const liked = response.data;
                    setProfileData((prevData) => ({
                        ...prevData,
                        numLiked: liked.result.length,
                    }));

                    //console.log(TAG + "-찜한목록 : ", liked);
                }
            } catch (error) {
                console.error("Error fetching like data:", error);
            }
        }

        fetchProfilelLikedData();
        withoutfetchProfile();
    }, [view, update]);

    function withoutfetchProfile() {
        setWithoutProfile(profileData.numTravel);
    }
    // useEffect(() => {
    //     console.log("여행생성Toggled-Recoil");
    //     if (IsTravelDataCreated) {
    //         fetchTravelData();
    //         fetchProfilelData();
    //         setIsTravelDataCreated(false);
    //     }
    // }, [IsTravelDataCreated]);

    // useEffect(() => {
    //     const handlePopState = () => {
    //         setIsTravelDataCreated(false);
    //     };

    //     // window.addEventListener('popstate', handlePopState);

    //     // // 컴포넌트 언마운트 시 이벤트 리스너 정리
    //     // return () => {
    //     //     window.removeEventListener('popstate', handlePopState);
    //     // };
    // }, []);

    return (
        <div className="myTravelMain">
            <Nav />
            {/* {console.log(view)} */}
            {view === "list" && (
                <div>
                    <div className="my-travel-profile" ref={profileRef}>
                        <MyTravelProfile
                            imgSrc={profileData.imgSrc}
                            name={profileData.name}
                            numTravel={profileData.numTravel}
                            numLiked={profileData.numLiked}
                            setView={setView}
                        />
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
