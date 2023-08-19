import React, { useEffect, useState } from "react";
import "./NotePage.css";
import { useRecoilState } from "recoil";
import { noteState } from "../../recoil/atoms/noteState";
import { selectedNoteId } from "../../recoil/atoms/noteState";
import { AccountBookMode } from "../../recoil/atoms/noteState";
import { userInfoState } from "../../recoil/atoms/userState";
import axios from "axios";
import CheckList from "./CheckList";
import AccountBook from "./AccountBook";
import Nav from "../../components/Nav/Nav";
import Vector from "../../assets/images/Vector.png";
import Ellipse from "../../assets/images/Ellipse.png";

function NotePage() {
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [checktoggle, setCheckToggle] = useState(true);
    const [AccountMode, setAccountMode] = useRecoilState(AccountBookMode);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    // Server Address
    const serverUrl = "http://15.164.232.95:9000";

    // 나의 여행 목록 조회
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(
                    `${serverUrl}/users/my_travels`,
                    {
                        headers: {
                            Authorization: `${userInfo.accessToken}`,
                        },
                    }
                );
                console.log("여행(노트) 조회 성공");
                console.log("response : ", response);
                console.log("result : ", response.data.result);
                setNoteList(response.data.result);
                console.log("noteList : ", noteList);
            } catch (error) {
                console.log(error);
                console.log("여행(노트) 조회 실패");
            }
        };
        fetchNotes();
    }, []);

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
