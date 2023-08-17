import { useRecoilState } from "recoil";
import { accountState } from "../../../recoil/atoms/accountState";
import { selectedNoteId } from "../../../recoil/atoms/noteState";
import { noteState } from "../../../recoil/atoms/noteState";
import { useEffect } from "react";
import "./Daily.css";
import del_btn from "../../../assets/images/del_btn.png";

function Daily() {
    const [account, setAccount] = useRecoilState(accountState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [noteList, setNoteList] = useRecoilState(noteState);

    return (
        <div className="account-daily">
            {account.map((list) => {
                if (list.tId === selectedNote) {
                    return list.daily.map((e) => {
                        return (
                            <div className="account-item-container">
                                <div className="account-item-daily-header">
                                    <div className="account-item-date">
                                        {e.date}
                                    </div>
                                    <div className="account-item-daily-cost">
                                        합계 금액
                                    </div>
                                </div>
                                {e.content.map((item) => {
                                    return (
                                        <div className="account-item">
                                            {noteList.map((note) => {
                                                if (note.id === selectedNote) {
                                                    return note.isEdit ? (
                                                        <img
                                                            className="account-item-del-btn"
                                                            src={del_btn}
                                                            alt="del_btn"
                                                            onClick={() => {
                                                                // delete item from account
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="account-item-del-btn-diable"></div>
                                                    );
                                                }
                                            })}

                                            <div className="account-item-category">
                                                {item.category}
                                            </div>
                                            <div className="account-item-title">
                                                {item.title}
                                            </div>
                                            <div className="account-item-price">
                                                {item.price}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    });
                }
            })}
            {/* {account.map((item) => (
                <div className="account-item-container">
                    <div className="account-item-daily-header">
                        <div className="account-item-date">{item.date}</div>
                        <div className="account-item-daily-cost">합계 금액</div>
                    </div>
                    {item.content.map((item) => (
                        <div className="account-item">
                            <div className="account-item-category">
                                {item.category}
                            </div>
                            <div className="account-item-title">
                                {item.title}
                            </div>
                            <div className="account-item-price">
                                {item.price}
                            </div>
                        </div>
                    ))}
                </div>
            ))} */}
        </div>
    );
}

export default Daily;
