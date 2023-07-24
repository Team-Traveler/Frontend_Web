import React, { useState, useEffect } from "react";
import "./NotePage.css";
import { useRecoilState } from "recoil";
import { noteState } from "../../recoil/atoms/noteState";
import axios from "axios";
import CheckList from "./CheckList";
import AccountBook from "./AccountBook";
import Nav from "../../components/Nav/Nav";

function NotePage() {
    const [noteList, setNoteList] = useRecoilState(noteState);

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

    // const addNote = async () => {
    //     try {
    //         const response = await axios.post("api/notes", {
    //             title: "새로운 노트",
    //             istoggle: false,
    //         });
    //         setNoteList([...noteList, response.data]);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const addNote = () => {
        setNoteList([
            ...noteList,
            {
                id: noteList.length + 1,
                title: "새로운 여행",
                istoggle: false,
            },
        ]);
    };

    return (
        <div className="note-page">
            <Nav />
            <div className="note">
                <div className="note-container">
                    <div className="note-list">
                        {noteList.map((note) => (
                            <div className="note-list-item " key={note.id}>
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
                                    {note.title}
                                </button>

                                {note.istoggle ? (
                                    <div className="note-list-item-box">
                                        <div className="note-list-item-check">
                                            체크리스트
                                        </div>
                                        <div className="note-list-item-account">
                                            가계부
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <div className="note-list-add-btn-container">
                        <button
                            className="note-list-add-btn"
                            onClick={() => {
                                addNote();
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="note-content">
                    <CheckList />
                    {/* <AccountBook /> */}
                </div>
            </div>
        </div>
    );
}

export default NotePage;
