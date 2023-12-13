import { useRecoilState } from "recoil";
import { noteState } from "../../../recoil/atoms/noteState";
import { selectedNoteId } from "../../../recoil/atoms/noteState";
import { AccountBookMode } from "../../../recoil/atoms/noteState";
import Daily from "../AccountComponents/Daily";
import Monthly from "../AccountComponents/Monthly";
import Summary from "../AccountComponents/Summary";
import { useState } from "react";
import "./AccountBook.css";
import edit_btn from "../../../assets/images/edit_btn.png";

function AccountBook() {
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [AccountMode, setAccountMode] = useRecoilState(AccountBookMode);

    return (
        <div className="account-book">
            <div className="account-book-header">
                <div className="account-book-title">
                    {noteList.map((note) => {
                        if (note.tid === selectedNote) {
                            return note.title;
                        }
                    })}
                </div>
                <img
                    className="account-book-title-edit-btn"
                    src={edit_btn}
                    alt="edit_btn"
                    onClick={() => {
                        setNoteList(
                            noteList.map((note) => {
                                if (note.tid === selectedNote) {
                                    return {
                                        ...note,
                                        isEdit: !note.isEdit,
                                    };
                                }
                                return note;
                            })
                        );
                    }}
                />
            </div>

            <div className="account-book-nav">
                <button
                    className={`account-book-mode-btn${
                        AccountMode === 0 ? "-active" : ""
                    }`}
                    onClick={() => {
                        setAccountMode(0);
                    }}
                >
                    일일
                </button>
                <button
                    className={`account-book-mode-btn${
                        AccountMode === 1 ? "-active" : ""
                    }`}
                    onClick={() => {
                        setAccountMode(1);
                    }}
                >
                    월별
                </button>
                <button
                    className={`account-book-mode-btn${
                        AccountMode === 2 ? "-active" : ""
                    }`}
                    onClick={() => {
                        setAccountMode(2);
                    }}
                >
                    요약
                </button>
            </div>

            {AccountMode === 0 && <Daily />}
            {AccountMode === 1 && <Monthly />}
            {AccountMode === 2 && <Summary />}
        </div>
    );
}

export default AccountBook;
