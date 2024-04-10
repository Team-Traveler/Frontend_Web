import React, { useEffect, useState } from "react";
import "./NotePage.css";
import { useRecoilState } from "recoil";
import { noteState } from "../../recoil/atoms/noteState";
import { selectedNoteId } from "../../recoil/atoms/noteState";
import { AccountBookMode } from "../../recoil/atoms/noteState";
import { userInfoState } from "../../recoil/atoms/userState";
import axios from "axios";
import CheckList from "./CheckList/CheckList";
import AccountBook from "./AccountBook/AccountBook";
import Nav from "../../components/Nav/Nav";
import Vector from "../../assets/images/Vector.png";
import Ellipse from "../../assets/images/Ellipse.png";
import { API } from "../../config";
function NotePage() {
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [checktoggle, setCheckToggle] = useState(true);
    const [AccountMode, setAccountMode] = useRecoilState(AccountBookMode);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const fetchProfilelData = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "http://15.164.232.95:9000/users/profile",
                headers: {
                    Authorization: `${userInfo.accessToken}`,
                },
            });

            if (response.status === 200) {
                setUserInfo({
                    ...userInfo,
                    id: response.data.result.id,
                    name: response.data.result.name,
                    email: response.data.result.email,
                    nickname: response.data.result.nickname,
                    profileImage: response.data.result.profile_image_url,
                    isLogin: true,
                });
                console.log("유저인포 set 확인");
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    useEffect(()=>{
        async function fetchProfilelData() {
            try {
                const response = await axios({
                    method: "GET",
                    url: "https://traveler-back.shop/users/profile",
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                });
    
                if (response.status === 200) {
                    setUserInfo({
                        ...userInfo,
                        id: response.data.result.id,
                        name: response.data.result.name,
                        email: response.data.result.email,
                        nickname: response.data.result.nickname,
                        profileImage: response.data.result.profile_image_url,
                        isLogin: true,
                    });
                    console.log("유저인포 set 확인");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchProfilelData();
    },[]);

    // 나의 여행 목록 조회
    useEffect(() => {
        fetchProfilelData();
        setSelectedNote(0);
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${API.HEADER}/users/my_travels`, {
                headers: {
                    Authorization: `${userInfo.accessToken}`,
                },
            });
            console.log("여행(노트) 조회 성공");
            console.log("여행 조회 response : ", response);
            setNoteList(response.data.result);

            // const initialSelectedNote =
            //     response.data.result.length > 0
            //         ? response.data.result[0].tid
            //         : 0;

            // setSelectedNote(initialSelectedNote);
            // console.log("selectedNote : ", initialSelectedNote);
        } catch (error) {
            console.log(error);
            console.log("여행(노트) 조회 실패");
        }
    };

    return (
        <div className="note-page">
            {/* selectedNoteId : {selectedNote} */}
            <Nav />
            <div className="note">
                <div className="note-container">
                    {noteList.length > 0 ? (
                        <div className="note-list">
                            {noteList.map((note) => (
                                <div className="note-list-item " key={note.tid}>
                                    <div className="note-list-item-header">
                                        <button
                                            className="note-list-item-btn"
                                            onClick={() => {
                                                setNoteList(
                                                    noteList.map((item) => {
                                                        if (
                                                            item.tid ===
                                                            note.tid
                                                        ) {
                                                            console.log(item);
                                                            return {
                                                                ...item,
                                                                istoggle:
                                                                    !item.istoggle,
                                                            };
                                                        }
                                                        return item;
                                                    })
                                                );
                                            }}
                                        >
                                            <img
                                                src={Vector}
                                                alt="Vector"
                                                className="mr-5"
                                                style={{ transform: note.istoggle ? 'rotate(90deg)' : 'none' }}
                                            />
                                            {note.title}
                                        </button>
                                    </div>

                                    {note.istoggle ? (
                                        <div className="note-list-item-box">
                                            <button
                                                className="note-list-item-check"
                                                onClick={() => {
                                                    setCheckToggle(true);
                                                    setSelectedNote(note.tid);
                                                }}
                                                style={{ 
                                                    backgroundColor: note.tid==selectedNote&&checktoggle ? '#98B4A6' : 'white',
                                                    color: note.tid==selectedNote&&checktoggle ? 'white' : 'black' 
                                                }}
                                            >
                                                <img
                                                    src={Ellipse}
                                                    alt="Ellipse"
                                                    className="mr-5"
                                                />
                                                체크리스트
                                            </button>
                                            <button
                                                className="note-list-item-account"
                                                onClick={() => {
                                                    setCheckToggle(false);
                                                    setSelectedNote(note.tid);
                                                    setAccountMode(0);
                                                }}

                                                style={{ 
                                                    backgroundColor: note.tid==selectedNote&&!checktoggle ? '#98B4A6' : 'white',
                                                    color: note.tid==selectedNote&&!checktoggle ? 'white' : 'black' 
                                                }}
                                            >
                                                <img
                                                    src={Ellipse}
                                                    alt="Ellipse"
                                                    className="mr-5"
                                                />
                                                가계부
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="note-list">노트가 없습니다.</div>
                    )}
                </div>

                <div className="note-content">
                    {checktoggle ? <CheckList /> : <AccountBook />}
                </div>
            </div>
        </div>
    );
}

export default NotePage;
