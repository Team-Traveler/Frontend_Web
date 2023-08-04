import React, { useState } from "react";
import "./NotePage.css";
import { useRecoilState } from "recoil";
import { noteState } from "../../recoil/atoms/noteState";
import { selectedNoteId } from "../../recoil/atoms/noteState";
import { nextNoteId } from "../../recoil/atoms/noteState";
import axios from "axios";
import CheckList from "./CheckList";
import AccountBook from "./AccountBook";
import Nav from "../../components/Nav/Nav";
// import Vector.png
import Vector from "./Vector.png";
import Ellipse from "./Ellipse.png";

function NotePage() {
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [nextid, setNextid] = useRecoilState(nextNoteId);
    const [checktoggle, setCheckToggle] = useState(true);

    // useEffect(() => {
    //     const fetchNotes = async () => {
    //         try {
    //             const response = await axios.get("api/notes");
    //             setNoteList(response.data);
    //             console.log("axios 성공!");
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     fetchNotes();
    // }, []);

    const addNote = () => {
        setNoteList([
            ...noteList,
            {
                id: nextid,
                title: "새로운 여행",
                istoggle: false,
                nextCheckListId: 1,
                checkcontent: [
                    {
                        title: "새로운 여행 체크리스트",
                        content: [],
                        isedit: false,
                    },
                ],
                accountcontent: "새로운 여행 가계부",
            },
        ]);
        setNextid(nextid + 1);
    };

    // const addNote = () => {
    //     try {
    //         const response = await axios.post("api/notes", {
    //             id: noteList.length + 1,
    //             title: "새로운 여행",
    //             istoggle: false,
    //             checkcontent: [
    //                 {
    //                     title: "새로운 여행 체크리스트",
    //                     content: [],
    //                 },
    //             ],
    //             accountcontent: "새로운 여행 가계부",
    //         });
    //         setNoteList([...noteList, response.data]);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <div className="note-page">
            <Nav />
            <div className="note">
                <div className="note-container">
                    <div className="note-list">
                        {noteList.map((note) => (
                            <div className="note-list-item " key={note.id}>
                                <div className="note-list-item-header">
                                    <button
                                        className="note-list-item-btn"
                                        onClick={() => {
                                            setNoteList(
                                                noteList.map((item) => {
                                                    if (item.id === note.id) {
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
                                        {/* {note.id} */}
                                    </button>
                                    {/* <div>
                                        <button
                                            onClick={
                                                //delete note
                                                () => {
                                                    setNoteList(
                                                        noteList.filter(
                                                            (item) =>
                                                                item.id !==
                                                                note.id
                                                        )
                                                    );
                                                }
                                            }
                                        >
                                            -
                                        </button>
                                    </div> */}
                                </div>

                                {note.istoggle ? (
                                    <div className="note-list-item-box">
                                        <button
                                            className="note-list-item-check"
                                            onClick={() => {
                                                setCheckToggle(true);
                                                setSelectedNote(note.id);
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
                                                setSelectedNote(note.id);
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
                </div>

                <div className="note-content">
                    {checktoggle ? <CheckList /> : <AccountBook />}
                </div>
            </div>
        </div>
    );
}

export default NotePage;
