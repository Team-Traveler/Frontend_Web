import axios from "axios";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";
import { myAllTravelsState } from "../../../recoil/atoms/myAllTravelsState.js";
import "./MyTravelMain.css";
import MyTravelProfile from "../MyTravelProfile/MyTravelProfile";
import MyTravelSpecifics from "../MyTravelSpecifics/MyTravelSpecifics";
import BtnMyTravelMenu from "../BtnMyTravelMenu/BtnMyTravelMenu";
import MyTravelLists from "../MyTravelLists/MyTravelLists";
import MyTravelAdd from "../MyTravelAdd/MyTravelAdd";
import profileTest from "./profileTest.png";
import MyTravelEdit from "../MyTravelEdit/MyTravelEdit";
import MyTravelProfileEdit from "../MyTravelProfileEdit/MyTravelProfileEdit";
import Nav from "../../../components/Nav/Nav";

function MyTravelMain() {
    const TAG = "MyTravelMain";
    const [view, setView] = useState("list");
    const [selectedTravel, setSelectedTravel] = useState(null); //상세보기 활성화 여부
    const [isEditMode, setIsEditMode] = useState(false); // 목록 편집 활성화 여부
    const profileRef = React.useRef();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [travelData, setTravelData] = useRecoilState(myAllTravelsState);
    const [IsTravelDataCreated, setIsTravelDataCreated] = useState(false);
    const [profileData, setProfileData] = useState({
        imgSrc: profileTest,
        name: "라이언",
        numTravel: 8,
        numLiked: 20,
        date: "2023.08.23",
    });

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

    async function fetchTravelData() {
        try {
            const response = await axios({
                method: "GET",
                url: "http://15.164.232.95:9000/users/my_travels",
                headers: {
                    Authorization: `${userInfo.accessToken}`,
                },
            });

            if (response.status === 200) {
                const travelData = response.data;
                setTravelData(travelData.result);
                setProfileData((prevData) => ({
                    ...prevData,
                    numTravel: travelData.result.length,
                }));
                console.log("토큰 : ", userInfo.accessToken);
                console.log(TAG + "-모든여행조회 : ", travelData);
            }
        } catch (error) {
            console.error("Error fetching travel data:", error);
            const travelData = [
                {
                    title: "통신에러",
                    destination: "여수",
                    start_date: "2023-08-18 09:00:00",
                    end_date: "2023-08-20 09:00:00",
                    created_at: "2023-08-17 01:07:27",
                    time_status: 1,
                    writeStatus: 0,
                    noteStatus: 0,
                    courses: [
                        {
                            dcId: 41,
                            spot1: {
                                title: "오동도 김밥",
                                latitude: 38.35901,
                                longitude: 37.9857,
                                sid: 170,
                            },
                            spot2: null,
                            spot3: null,
                            spot4: null,
                            first: null,
                            second: null,
                            third: null,
                            numOfDay: 1,
                        },
                    ],
                    tid: 1,
                    uid: 1,
                },
                {
                    title: "포항 투어",
                    destination: "포항",
                    start_date: "2023-08-18 09:00:00",
                    end_date: "2023-08-20 09:00:00",
                    created_at: "2023-08-17 01:07:46",
                    time_status: 1,
                    writeStatus: 0,
                    noteStatus: 0,
                    courses: [],
                    tid: 2,
                    uid: 1,
                },
            ];
            setTravelData(travelData);
        }
    }

    async function fetchProfilelData() {
        try {
            const response = await axios({
                method: "GET",
                url: "http://15.164.232.95:9000/users/profile",
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
                console.log(TAG + "-카카오프로필 : ", profileData);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }

    async function fetchProfilelLikedData() {
        try {
            const response = await axios({
                method: "GET",
                url: "http://15.164.232.95:9000/users/myLike",
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
                console.log(TAG + "-찜한목록 : ", liked);
            }
        } catch (error) {
            console.error("Error fetching like data:", error);
        }
    }

    useEffect(() => {
        fetchTravelData();
        fetchProfilelData();
        fetchProfilelLikedData();
    }, []);

    useEffect(() => {
        if (IsTravelDataCreated) {
            fetchTravelData();
            fetchProfilelData();
            setIsTravelDataCreated(false);
        }
    }, [IsTravelDataCreated]);

    return (
        <div className="myTravelMain">
            <Nav />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                    className="edit-done-button"
                    onClick={() => setIsEditMode(false)}
                    style={{
                        opacity: isEditMode ? 1 : 0,
                        pointerEvents: isEditMode ? "auto" : "none",
                    }}
                >
                    편집 완료
                </button>

                {view === "list" && (
                    <div className="my-travel-main-container">
                        <div className="my-travel-profile" ref={profileRef}>
                            <MyTravelProfile
                                imgSrc={profileData.imgSrc}
                                name={profileData.name}
                                numTravel={profileData.numTravel}
                                numLiked={profileData.numLiked}
                                date={profileData.date}
                            />
                            `
                        </div>
                        <div
                            style={{
                                flexGrow: 1,
                                marginLeft: "4.2vw",
                                height: profileRef.current
                                    ? profileRef.current.clientHeight
                                    : "auto",
                            }}
                        >
                            <MyTravelLists
                                setView={setView}
                                isEditMode={isEditMode}
                                setIsEditMode={setIsEditMode}
                                view={view}
                            />
                        </div>
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
                        <MyTravelEdit />
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
                        <MyTravelSpecifics travel={selectedTravel} />
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

                {/* 후기 작성 */}
                {view === "review" && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            height: "62.6vh",
                        }}
                    >
                        후기작성
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
                >
                    <BtnMyTravelMenu
                        toggleEditMode={() => setIsEditMode(!isEditMode)}
                        view={view}
                        setView={setView}
                    />
                </div>
            </div>
        </div>
    );
}

export default MyTravelMain;
