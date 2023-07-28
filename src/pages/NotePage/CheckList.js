import { useRecoilState } from "recoil";
import { noteState } from "../../recoil/atoms/noteState";
import { selectedNoteId } from "../../recoil/atoms/noteState";
import "./CheckList.css";

function CheckList() {
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);

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
            {noteList
                .find((note) => note.id === selectedNote)
                .checkcontent.map((check) => (
                    <div className="check-list-box">
                        {check.isedit ? (
                            // edit on
                            <div className="check-list-box-header">
                                {/* 리스트 제목 수정 박스 */}
                                <input
                                    type="text"
                                    value={check.title}
                                    onChange={(e) => {
                                        setNoteList(
                                            noteList.map((note) => {
                                                if (note.id === selectedNote) {
                                                    return {
                                                        ...note,
                                                        checkcontent:
                                                            note.checkcontent.map(
                                                                (item) => {
                                                                    if (
                                                                        item.id ===
                                                                        check.id
                                                                    ) {
                                                                        return {
                                                                            ...item,
                                                                            title: e
                                                                                .target
                                                                                .value,
                                                                        };
                                                                    }
                                                                    return item;
                                                                }
                                                            ),
                                                    };
                                                }
                                                return note;
                                            })
                                        );
                                    }}
                                ></input>

                                {/* 리스트 제목 수정 완료 버튼 */}
                                <button
                                    onClick={() => {
                                        // set check.isedit to false
                                        setNoteList(
                                            noteList.map((note) => {
                                                if (note.id === selectedNote) {
                                                    return {
                                                        ...note,
                                                        checkcontent:
                                                            note.checkcontent.map(
                                                                (item) => {
                                                                    if (
                                                                        item.id ===
                                                                        check.id
                                                                    ) {
                                                                        return {
                                                                            ...item,
                                                                            isedit: false,
                                                                        };
                                                                    }
                                                                    return item;
                                                                }
                                                            ),
                                                    };
                                                }
                                                return note;
                                            })
                                        );
                                        // set check.title to input value
                                    }}
                                >
                                    save
                                </button>
                            </div>
                        ) : (
                            // edit off
                            <div className="check-list-box-header">
                                {check.title}

                                {/* 리스트 제목 수정 버튼 */}
                                <button
                                    onClick={() => {
                                        // set check.isedit to true
                                        setNoteList(
                                            noteList.map((note) => {
                                                if (note.id === selectedNote) {
                                                    return {
                                                        ...note,
                                                        checkcontent:
                                                            note.checkcontent.map(
                                                                (item) => {
                                                                    if (
                                                                        item.id ===
                                                                        check.id
                                                                    ) {
                                                                        return {
                                                                            ...item,
                                                                            isedit: true,
                                                                        };
                                                                    }
                                                                    return item;
                                                                }
                                                            ),
                                                    };
                                                }
                                                return note;
                                            })
                                        );
                                    }}
                                >
                                    edit
                                </button>

                                {/* 리스트 삭제 버튼 */}
                                <button
                                    onClick={
                                        // delete check list by check id
                                        () => {
                                            setNoteList(
                                                noteList.map((note) => {
                                                    if (
                                                        note.id === selectedNote
                                                    ) {
                                                        return {
                                                            ...note,
                                                            checkcontent:
                                                                note.checkcontent.filter(
                                                                    (item) =>
                                                                        item.id !==
                                                                        check.id
                                                                ),
                                                        };
                                                    }
                                                    return note;
                                                })
                                            );
                                        }
                                    }
                                >
                                    delete
                                </button>

                                {/* 항목 추가 버튼 */}
                                <button
                                    onClick={
                                        // add new content
                                        () => {
                                            setNoteList(
                                                noteList.map((note) => {
                                                    if (
                                                        note.id === selectedNote
                                                    ) {
                                                        return {
                                                            ...note,
                                                            checkcontent:
                                                                note.checkcontent.map(
                                                                    (item) => {
                                                                        if (
                                                                            item.id ===
                                                                            check.id
                                                                        ) {
                                                                            return {
                                                                                ...item,
                                                                                content:
                                                                                    [
                                                                                        ...item.content,
                                                                                        {
                                                                                            id: item.nextid,
                                                                                            content:
                                                                                                "",
                                                                                            ischecked: false,
                                                                                        },
                                                                                    ],
                                                                                nextid:
                                                                                    item.nextid +
                                                                                    1,
                                                                            };
                                                                        }
                                                                        return item;
                                                                    }
                                                                ),
                                                        };
                                                    }
                                                    return note;
                                                })
                                            );
                                        }
                                    }
                                >
                                    +
                                </button>
                            </div>
                        )}

                        {/* 체크리스트 항목들 */}
                        {check.content.map((content) => (
                            <div className="check-list-item-container">
                                <input
                                    className="check-list-item-checkbox"
                                    type="checkbox"
                                    checked={content.ischecked}
                                    onChange={(e) => {
                                        setNoteList(
                                            noteList.map((note) => {
                                                if (note.id === selectedNote) {
                                                    return {
                                                        ...note,
                                                        checkcontent:
                                                            note.checkcontent.map(
                                                                (item) => {
                                                                    if (
                                                                        item.id ===
                                                                        check.id
                                                                    ) {
                                                                        return {
                                                                            ...item,
                                                                            content:
                                                                                item.content.map(
                                                                                    (
                                                                                        c
                                                                                    ) => {
                                                                                        if (
                                                                                            c.id ===
                                                                                            content.id
                                                                                        ) {
                                                                                            return {
                                                                                                ...c,
                                                                                                ischecked:
                                                                                                    !c.ischecked,
                                                                                            };
                                                                                        }
                                                                                        return c;
                                                                                    }
                                                                                ),
                                                                        };
                                                                    }
                                                                    return item;
                                                                }
                                                            ),
                                                    };
                                                }
                                                return note;
                                            })
                                        );
                                    }}
                                ></input>

                                {/* 체크리스트 항목 */}
                                <input
                                    className="check-list-item"
                                    type="text"
                                    value={content.item}
                                    placeholder="항목을 입력하세요"
                                    // edit item by item id
                                    onChange={(e) => {
                                        setNoteList(
                                            noteList.map((note) => {
                                                if (note.id === selectedNote) {
                                                    return {
                                                        ...note,
                                                        checkcontent:
                                                            note.checkcontent.map(
                                                                (item) => {
                                                                    if (
                                                                        item.id ===
                                                                        check.id
                                                                    ) {
                                                                        return {
                                                                            ...item,
                                                                            content:
                                                                                item.content.map(
                                                                                    (
                                                                                        c
                                                                                    ) => {
                                                                                        if (
                                                                                            c.id ===
                                                                                            content.id
                                                                                        ) {
                                                                                            return {
                                                                                                ...c,
                                                                                                item: e
                                                                                                    .target
                                                                                                    .value,
                                                                                            };
                                                                                        }
                                                                                        return c;
                                                                                    }
                                                                                ),
                                                                        };
                                                                    }
                                                                    return item;
                                                                }
                                                            ),
                                                    };
                                                }
                                                return note;
                                            })
                                        );
                                    }}
                                ></input>

                                <button
                                    className="check-list-item-delete"
                                    onClick={
                                        // delete item by item id
                                        () => {
                                            setNoteList(
                                                noteList.map((note) => {
                                                    if (
                                                        note.id === selectedNote
                                                    ) {
                                                        return {
                                                            ...note,
                                                            checkcontent:
                                                                note.checkcontent.map(
                                                                    (item) => {
                                                                        if (
                                                                            item.id ===
                                                                            check.id
                                                                        ) {
                                                                            return {
                                                                                ...item,
                                                                                content:
                                                                                    item.content.filter(
                                                                                        (
                                                                                            c
                                                                                        ) =>
                                                                                            c.id !==
                                                                                            content.id
                                                                                    ),
                                                                            };
                                                                        }
                                                                        return item;
                                                                    }
                                                                ),
                                                        };
                                                    }
                                                    return note;
                                                })
                                            );
                                        }
                                    }
                                >
                                    -
                                </button>
                            </div>
                        ))}
                    </div>
                ))}

            {/* 체크리스트 추가 버튼 */}
            <button
                onClick={() => {
                    setNoteList(
                        noteList.map((note) => {
                            if (note.id === selectedNote) {
                                return {
                                    ...note,
                                    nextCheckListId: note.nextCheckListId + 1,
                                    checkcontent: [
                                        ...note.checkcontent,
                                        {
                                            id: note.nextCheckListId + 1,
                                            title: "새로운 체크리스트",
                                            content: [
                                                {
                                                    id: 1,
                                                    item: "",
                                                    ischecked: false,
                                                },
                                            ],
                                            nextid: 2,
                                            isedit: false,
                                        },
                                    ],
                                };
                            }
                            return note;
                        })
                    );
                }}
            >
                +
            </button>
        </div>
    );
}

export default CheckList;
