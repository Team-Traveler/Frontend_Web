import { useRecoilState } from "recoil";
import { noteState } from "../../recoil/atoms/noteState";
import { selectedNoteId } from "../../recoil/atoms/noteState";
import { checkListState } from "../../recoil/atoms/noteState";
import { userInfoState } from "../../recoil/atoms/userState";
import "./CheckList.css";
import edit_btn from "../../assets/images/edit_btn.png";
import add_btn from "../../assets/images/add_btn.png";
import del_btn from "../../assets/images/del_btn.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { el } from "date-fns/locale";
import { set } from "date-fns";

function CheckList() {
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [checkList, setCheckList] = useRecoilState(checkListState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    // Server Address
    const serverUrl = "http://15.164.232.95:9000";

    // 나의 여행 목록 조회	GET	/users/my_travels
    // 체크리스트 생성	POST	/category/{travelId}
    // 체크리스트 조회	GET	/category/{travelId}
    // 체크리스트 제목 변경	PATCH	/category/{cId}
    // 체크리스트 삭제	DELETE	/category/{cId}
    // 준비물 작성	POST	/checklist/{categoryId}/item
    // 준비물 변경	PATCH	/checklist/{categoryId}/item/{itemId}
    // 준비물 삭제	DELETE	/checklist/{categoryId}/item/{itemId}
    // 준비물 체크 상태 변경	PATCH	/{categoryId}/item/{itemId}/status

    // useEffect(() => {
    //     const fetchCheckList = async (travelId) => {
    //         try {
    //             const response = await axios.get(
    //                 `${serverUrl}/category/${travelId}`,
    //                 {
    //                     headers: {
    //                         Authorization: `${userInfo.accessToken}`,
    //                     },
    //                 }
    //             );
    //             console.log(response);
    //             setNoteList(response.data);
    //         } catch (error) {
    //             console.log(error);
    //             console.log("체크리스트 조회 실패");
    //         }
    //     };
    //     fetchCheckList();
    // }, []);

    // 체크리스트 생성
    const createCheckList = async (travelId) => {
        try {
            const response = await axios.post(
                `${serverUrl}/category/${travelId}`,
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            );
            console.log(response);
            setCheckList(response.data);
        } catch (error) {
            console.log(error);
            console.log("체크리스트 생성 실패");
        }
    };

    // 체크리스트 제목 변경
    const updateCheckListTitle = async (cId, newTitle) => {
        try {
            const response = await axios.patch(`${serverUrl}/category/${cId}`, {
                body: {
                    title: newTitle,
                },
            });
            console.log(response);
            // setCheckList(response.data);
        } catch (error) {
            console.log(error);
            console.log("체크리스트 제목 변경 실패");
        }
    };

    // 체크리스트 삭제
    const deleteCheckList = async (cId) => {
        try {
            const response = await axios.delete(`${serverUrl}/category/${cId}`);
            console.log(response);
        } catch (error) {
            console.log(error);
            console.log("체크리스트 삭제 실패");
        }
    };

    // 준비물 생성
    const createItem = async (cId) => {
        try {
            const response = await axios.post(
                `${serverUrl}/checklist/${cId}/items`
            );
            console.log(response);
            // setCheckList(response.data);
            setCheckList(
                checkList.map((list) => {
                    if (list.id === cId) {
                        return {
                            ...list,
                            item: [...list.item, response.data],
                        };
                    }
                    return list;
                })
            );
        } catch (error) {
            console.log(error);
            console.log("준비물 생성 실패");
        }
    };

    // 준비물 제목 변경
    const updateItemTitle = async (cId, itemId, newTitle) => {
        try {
            const response = await axios.patch(
                `${serverUrl}/checklist/${cId}/items/${itemId}`,
                {
                    body: {
                        name: newTitle,
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
            console.log("준비물 제목 변경 실패");
        }
    };

    // 준비물 삭제
    const deleteItem = async (cId, itemId) => {
        try {
            const response = await axios.delete(
                `${serverUrl}/checklist/${cId}/items/${itemId}`
            );
            console.log(response);
        } catch (error) {
            console.log(error);
            console.log("준비물 삭제 실패");
        }
    };

    // 준비물 체크 상태 변경
    const updateItemStatus = async (cId, itemId) => {
        try {
            const response = await axios.patch(
                `${serverUrl}/checklist/${cId}/item/${itemId}/status`
            );
            console.log(response);
        } catch (error) {
            console.log(error);
            console.log("준비물 체크 상태 변경 실패");
        }
    };

    const selectedNoteObject = noteList.find(
        (note) => note.id === selectedNote
    );

    if (!selectedNoteObject) {
        // Handle the case when the selectedNote ID is not found in noteList
        return (
            <div className="note-not-selected">
                왼쪽 리스트에서 노트를 선택해 주세요.
            </div>
        );
    }

    return (
        <div className="check-list">
            <div className="check-list-add-btn-container">
                {/* 체크리스트 추가 버튼 */}
                <div
                    className="check-list-add-btn"
                    onClick={() => {
                        createCheckList(selectedNote);
                        setCheckList([
                            ...checkList,
                            {
                                id: checkList.length + 1,
                                travelId: selectedNote,
                                title: "새로운 체크리스트",
                                isedit: true,
                                item: [],
                            },
                        ]);
                    }}
                >
                    체크리스트 추가
                    <img src={add_btn} alt="add_btn" />
                </div>
            </div>

            {checkList.find((list) => list.travelId === selectedNote) ? null : (
                <div>체크리스트를 추가해 주세요.</div>
            )}

            {/* {console.log("checklist: ", checkList)} */}

            {checkList.map((list) => {
                if (list.travelId === selectedNote) {
                    return (
                        <div className="check-list-box" key={list.id}>
                            {list.isedit ? (
                                <div className="check-list-box-header">
                                    {/* 리스트 삭제 버튼 */}
                                    <img
                                        className="check-list-del-btn"
                                        src={del_btn}
                                        alt="del_btn"
                                        onClick={() => {
                                            deleteCheckList(list.id);
                                            setCheckList(
                                                checkList.filter(
                                                    (i) => i.id !== list.id
                                                )
                                            );
                                        }}
                                    />

                                    {/* 리스트 제목 수정 박스 */}
                                    <input
                                        className="check-list-title-edit-box"
                                        type="text"
                                        value={list.title}
                                        onChange={(e) => {
                                            setCheckList(
                                                checkList.map((i) => {
                                                    if (i.id === list.id) {
                                                        return {
                                                            ...i,
                                                            title: e.target
                                                                .value,
                                                        };
                                                    }
                                                    return i;
                                                })
                                            );
                                        }}
                                    ></input>

                                    {/* 항목 추가 버튼 */}
                                    <button
                                        className="check-list-add-item-btn"
                                        onClick={
                                            // add new content
                                            () => {
                                                createItem(list.id);
                                                setCheckList(
                                                    checkList.map((i) => {
                                                        if (i.id === list.id) {
                                                            return {
                                                                ...i,
                                                                item: [
                                                                    ...i.item,
                                                                    {
                                                                        id:
                                                                            i
                                                                                .item
                                                                                .length +
                                                                            1,
                                                                        name: "",
                                                                        isChecked: false,
                                                                    },
                                                                ],
                                                            };
                                                        }
                                                        return i;
                                                    })
                                                );
                                            }
                                        }
                                    >
                                        항목추가
                                    </button>

                                    {/* 리스트 제목 수정 완료 버튼 */}
                                    <button
                                        className="check-list-save-btn"
                                        onClick={() => {
                                            updateCheckListTitle(
                                                list.id,
                                                list.title
                                            );
                                            checkList.map((e) => {
                                                console.log("수정완료 버튼", e);
                                                if (e.id === list.id) {
                                                    // updateItemTitle all items
                                                    e.item.map((i) => {
                                                        // console.log(
                                                        //     "list.id: ",
                                                        //     list.id,
                                                        //     "i.id: ",
                                                        //     i.id,
                                                        //     "i.name: ",
                                                        //     i.name
                                                        // );
                                                        updateItemTitle(
                                                            list.id,
                                                            i.id,
                                                            i.name
                                                        );
                                                    });
                                                }
                                            });
                                            setCheckList(
                                                checkList.map((e) => {
                                                    if (e.id === list.id) {
                                                        return {
                                                            ...e,
                                                            isedit: !e.isedit,
                                                            title: list.title,
                                                        };
                                                    }
                                                    return e;
                                                })
                                            );
                                        }}
                                    >
                                        완료
                                    </button>
                                </div>
                            ) : (
                                // edit off
                                <div className="check-list-box-header">
                                    <div className="check-list-title">
                                        {list.title}
                                    </div>

                                    {/* 리스트 수정 버튼 */}
                                    <img
                                        className="check-list-edit-btn"
                                        src={edit_btn}
                                        alt="edit_btn"
                                        onClick={() => {
                                            // set list.isedit to true
                                            setCheckList(
                                                checkList.map((e) => {
                                                    if (e.id === list.id) {
                                                        return {
                                                            ...e,
                                                            isedit: !e.isedit,
                                                        };
                                                    }
                                                    return e;
                                                })
                                            );
                                        }}
                                    />
                                </div>
                            )}

                            {/* 체크리스트 항목들 */}
                            <div className="check-list-item-wrapper">
                                {list.item.map((item) => (
                                    <div
                                        className="check-list-item-container"
                                        key={item.id}
                                    >
                                        {/* 체크박스 */}
                                        <input
                                            className="check-list-item-checkbox"
                                            type="checkbox"
                                            checked={item.isChecked}
                                            onChange={() => {
                                                console.log(
                                                    "check item / list.id: ",
                                                    list.id,
                                                    "item.id: ",
                                                    item.id
                                                );
                                                updateItemStatus(
                                                    list.id,
                                                    item.id
                                                );
                                                setCheckList(
                                                    checkList.map((e) => {
                                                        if (e.id === list.id) {
                                                            return {
                                                                ...e,
                                                                item: e.item.map(
                                                                    (i) => {
                                                                        if (
                                                                            i.id ===
                                                                            item.id
                                                                        ) {
                                                                            return {
                                                                                ...i,
                                                                                isChecked:
                                                                                    !i.isChecked,
                                                                            };
                                                                        }
                                                                        return i;
                                                                    }
                                                                ),
                                                            };
                                                        }
                                                        return e;
                                                    })
                                                );
                                            }}
                                        />

                                        {/* 체크리스트 항목 */}
                                        {list.isedit ? (
                                            <input
                                                className="check-list-item"
                                                type="text"
                                                value={item.name}
                                                placeholder="항목을 입력하세요"
                                                onChange={(e) => {
                                                    setCheckList(
                                                        checkList.map((i) => {
                                                            if (
                                                                i.id === list.id
                                                            ) {
                                                                return {
                                                                    ...i,
                                                                    item: i.item.map(
                                                                        (j) => {
                                                                            if (
                                                                                j.id ===
                                                                                item.id
                                                                            ) {
                                                                                return {
                                                                                    ...j,
                                                                                    name: e
                                                                                        .target
                                                                                        .value,
                                                                                };
                                                                            }
                                                                            return j;
                                                                        }
                                                                    ),
                                                                };
                                                            }
                                                            return i;
                                                        })
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <div className="check-list-item">
                                                {item.name
                                                    ? item.name
                                                    : "빈 항목"}
                                            </div>
                                        )}

                                        {/* 항목 삭제 버튼 */}
                                        {list.isedit ? (
                                            <img
                                                className="check-list-item-delete"
                                                src={del_btn}
                                                alt="del_btn"
                                                onClick={() => {
                                                    console.log(
                                                        "delete item / list.id: ",
                                                        list.id,
                                                        "item.id: ",
                                                        item.id
                                                    );
                                                    deleteItem(
                                                        list.id,
                                                        item.id
                                                    );
                                                    setCheckList(
                                                        checkList.map((i) => {
                                                            if (
                                                                i.id === list.id
                                                            ) {
                                                                return {
                                                                    ...i,
                                                                    item: i.item.filter(
                                                                        (j) =>
                                                                            j.id !==
                                                                            item.id
                                                                    ),
                                                                };
                                                            }
                                                            return i;
                                                        })
                                                    );
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default CheckList;
