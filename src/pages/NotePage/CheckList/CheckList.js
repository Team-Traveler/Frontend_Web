import { useRecoilState } from "recoil";
import { noteState } from "../../../recoil/atoms/noteState";
import { selectedNoteId } from "../../../recoil/atoms/noteState";
import { checkListState } from "../../../recoil/atoms/noteState";
import { userInfoState } from "../../../recoil/atoms/userState";
import "./CheckList.css";
import edit_btn from "../../../assets/images/edit_btn.png";
import add_btn from "../../../assets/images/add_btn.png";
import del_btn from "../../../assets/images/del_btn.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { el } from "date-fns/locale";
import { set } from "date-fns";
import CheckListModal from "../CheckListModal/CheckListModal";

function CheckList() {
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [checkList, setCheckList] = useRecoilState(checkListState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('');
    const [invalidInput, setInvalidInput] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기에 제출(submit) 로직을 추가할 수 있습니다.
        // 이 예시에서는 입력된 텍스트를 콘솔에 출력합니다.
        console.log('입력된 텍스트:', text);
        setText('');
    };
    const handleInputChange = (event) => {
        setText(event.target.value);

      };
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    // Server Address
    const serverUrl = "https://traveler-back.shop";

    // selectedNote 값이 변할 때만 fetchCheckList 함수 호출, 처음에는 호출 안 함
    useEffect(() => {
        if (selectedNote !== 0) {
            fetchCheckList(selectedNote);
        }
    }, [selectedNote]);

    // 체크리스트 조회
    const fetchCheckList = async (tid) => {
        try {
            const response = await axios.get(
                `${serverUrl}/checklist/travel/${tid}`,
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            );
            console.log("체크리스트 조회 성공");
            console.log(
                "체크리스트 조회 response.data.result : ",
                response.data.result
            );
            setCheckList(response.data.result);
        } catch (error) {
            console.log("체크리스트 조회 실패");
            console.log(error);
        }
    };

    // 체크리스트 생성
    const createCheckList = async (tid) => {
        try {
            const response = await axios.post(
                `${serverUrl}/checklist/${tid}`,
                {
                    title: "new title",
                    items: [],
                },
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            );
            console.log("체크리스트 생성 성공!");
            console.log("체크리스트 생성 response : ", response);
            setCheckList([...checkList, response.data.result]);
            console.log("체크리스트 생성 결과 checkList : ", checkList);
        } catch (error) {
            console.log(error);
            console.log("체크리스트 생성 실패");
        }
    };

    // 체크리스트 제목 변경
    const updateCheckListTitle = async (cid, newTitle) => {
        try {
            const response = await axios.patch(
                `${serverUrl}/checklist/${cid}/title`,
                {
                    newTitle: newTitle,
                },
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            );
            console.log("체크리스트 제목 변경 성공!");
            console.log("체크리스트 제목 변경 response : ", response);
            
            // setCheckList(
            //     checkList.map((list) => {
            //         if (list.cid === cid) {
            //             return {
            //                 ...list,
            //                 items: [...list.items, res.data.result],
            //             };
            //         }
            //         return list;
            //     })
            // );
        } catch (error) {
            console.log(error);
            console.log("체크리스트 제목 변경 실패");
            console.log("checklist : ", checkList);
        }
    };

    // 체크리스트 삭제
    const deleteCheckList = async (cid) => {
        try {
            const response = await axios.delete(
                `${serverUrl}/checklist/${cid}`,
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            );
            console.log("체크리스트 삭제 성공!");
            console.log("체크리스트 삭제 response : ", response);
            setCheckList(
                checkList.filter((list) => {
                    return list.cid !== cid;
                })
            );
            console.log("체크리스트 삭제 결과 checkList : ", checkList);
        } catch (error) {
            console.log(error);
            console.log("체크리스트 삭제 실패");
        }
    };

    // 준비물 생성
    const createItem = async (cid, itemTitle) => {
        try {
            console.log("Authorization : ", userInfo.accessToken);
            const response = await axios.post(
                `${serverUrl}/checklist/${cid}/items`,
                {},
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            ).then((res)=>{
                console.log("준비물 생성 성공!");
                console.log(
                    "준비물 생성 response.data.result : ",
                    res.data.result
                );
                const newItem = res.data.result;
                newItem.name = itemTitle;
                // setCheckList(response.data);
                setCheckList(
                    checkList.map((list) => {
                        if (list.cid === cid) {
                            return {
                                ...list,
                                items: [...list.items, newItem],
                            };
                        }
                        return list;
                    })
                );
                // updateItemTitle(cid, res.data.result.iid, itemTitle);
                console.log("준비물 생성 결과 checkList : ", checkList);                
            });
        } catch (error) {
            console.log(error);
            console.log("준비물 생성 실패");
        }
    };

    // 준비물 제목 변경
    const updateItemTitle = async (cid, iid, newTitle) => {
        try {
            const response = await axios.patch(
                `${serverUrl}/checklist/${cid}/items/${iid}/name`,
                {
                    name: newTitle,
                },
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            ).then((res)=>{
                console.log("준비물 제목 변경 성공!");
                console.log("준비물 제목 변경 response : ", res);
                // setCheckList(
                //     checkList.map((list) => {
                //         if (list.cid === cid) {
                //             return {
                //                 ...list,
                //                 items: list.items.map((i) => {
                //                         if (i.iid === iid) {
                //                             return {
                //                                 ...i,
                //                                 name: res.data.result.name,
                //                             };
                //                         }
                //                         return i;
                //                     }
                //                 ),
                //             };
                //         }
                //         return list;
                //     })
                // );                   
                console.log("준비물 제목 변경 res.data.result.name : ", res.data.result.name);  
                console.log("준비물 제목 변경 checkList : ", checkList);         
            });
        } catch (error) {
            console.log(error);
            console.log("준비물 제목 변경 실패");
        }
    };

    // 준비물 체크 상태 변경
    const updateItemStatus = async (cid, iid) => {
        try {
            const response = await axios.patch(
                `${serverUrl}/checklist/${cid}/items/${iid}`,
                {},
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            );
            console.log("준비물 체크 상태 변경 성공!");
            console.log(response);
        } catch (error) {
            console.log("준비물 체크 상태 변경 실패");
            console.log(error);
        }
    };

    // 준비물 삭제
    const deleteItem = async (cid, iid) => {
        try {
            const response = await axios.delete(
                `${serverUrl}/checklist/${cid}/items/${iid}`,
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                    },
                }
            );
            console.log("준비물 삭제 성공!");
            console.log("준비물 삭제 response : ", response);
        } catch (error) {
            console.log(error);
            console.log("준비물 삭제 실패");
        }
    };

    // console.log("noteList: ", noteList);
    const selectedNoteObject = noteList.find(
        (note) => note.tid === selectedNote
    );

    if (!selectedNoteObject) {
        // Handle the case when the selectedNote ID is not found in noteList
        return (
            <div 
                className="note-not-selected"
                style={{ 
                    color: '#C7C7C7'
                }}
            >
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
                    }}
                >
                    체크리스트 추가
                    <img style={{marginLeft: "10px"}}
                    src={add_btn} alt="add_btn" />
                </div>
            </div>

            {/* {console.log("find 위쪽 checkList: ", checkList)} */}
            {checkList.find((list) => list.tid === selectedNote) ? null : (
                <div
                    style={{ 
                        display: 'flex',
                        height: '700px',
                        alignItems: 'center',
                        color: '#C7C7C7'
                    }}
                >
                항목을 추가해 보아요.</div>
            )}

            {checkList.map((list) => {
                if (list.tid === selectedNote) {
                    return (
                        <div className="check-list-box" key={list.cid}>
                            {list.isedit ? (
                                <div 
                                    className="check-list-box-header"                       
                                >
                                    <div 
                                        className="check-list-title"
                                        // style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            openModal();
                                            console.log(list);
                                            // set list.isedit to true
                                            setCheckList(
                                                checkList.map((e) => {
                                                    if (e.cid === list.cid) {
                                                        return {
                                                            ...e,
                                                            isedit: !e.isedit,
                                                        };
                                                    }
                                                    return e;
                                                })
                                            );
                                        }}     
                                    >
                                        {list.title}
                                    </div>                                    

                                    {showModal && (
                                        <CheckListModal
                                            closeModal={closeModal}
                                            headerTitle={                                    
                                            <input
                                                className="check-list-title-edit-box-modal"
                                                type="text"
                                                value={list.title}
                                                style={{textAlign: 'left'}}
                                                onChange={(e) => {
                                                    setCheckList(
                                                        checkList.map((i) => {
                                                            if (i.cid === list.cid) {
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
                                            ></input>}
                                        >
                                            <div>
                                                <form 
                                                    onSubmit={handleSubmit}
                                                    style={{}}
                                                >
                                                    <input
                                                        type="text"
                                                        value={text}
                                                        placeholder="준비물 이름 입력"
                                                        style={{ 
                                                            width: '260px',
                                                            borderBottom: '1px solid',
                                                            margin: '10px',
                                                            padding: '10px',
                                                            fontWeight: '400',
                                                        }}
                                                        onChange={handleInputChange}
                                                    >

                                                    </input>
                                                    
                                                    <button
                                                    type="submit"
                                                    className="check-list-add-item-btn"
                                                    // style={{ 
                                                    //     borderRadius: '0px',
                                                    // }}
                                                    onClick={
                                                            // add new content
                                                            () => {                                                            
                                                                setText(text);
                                                                if(text===''){
                                                                    setInvalidInput('준비물 이름이 입력되지 않았습니다.');
                                                                    return;
                                                                } else {
                                                                    setInvalidInput('');
                                                                }
                                                                createItem(list.cid, text);
                                                                console.log(text);
                                                            }
                                                    }
                                                    >
                                                    추가
                                                    </button> 
                                                </form>

                                    
                                                {/* 체크리스트 항목들 */}
                                                <div 
                                                    className="check-list-item-wrapper"
                                                    style={{display: 'block', height: '300px',}}
                                                >
                                                    {list.items.map((item) => (
                                                        <div
                                                            className="check-list-item-container"
                                                            key={item.iid}
                                                        >
                                                            {/* 체크박스 */}
                                                            <input
                                                                className="check-list-item-checkbox"
                                                                type="checkbox"
                                                                checked={item.isChecked}
                                                                onChange={() => {
                                                                    console.log(
                                                                        "check item / list.cid: ",
                                                                        list.cid,
                                                                        "item.id: ",
                                                                        item.iid
                                                                    );
                                                                    updateItemStatus(
                                                                        list.cid,
                                                                        item.iid
                                                                    );
                                                                    setCheckList(
                                                                        checkList.map((e) => {
                                                                            if (
                                                                                e.cid === list.cid
                                                                            ) {
                                                                                return {
                                                                                    ...e,
                                                                                    items: e.items.map(
                                                                                        (i) => {
                                                                                            if (
                                                                                                i.iid ===
                                                                                                item.iid
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
                                                                    className="check-list-item-modal"
                                                                    type="text"
                                                                    value={item.name}
                                                                    placeholder="항목을 입력하세요"
                                                                    onChange={(e) => {
                                                                        console.log(
                                                                            "iId: ",
                                                                            item.iid
                                                                        );
                                                                        console.log(
                                                                            "cId: ",
                                                                            list.cid
                                                                        );
                                                                        setCheckList(
                                                                            checkList.map((i) => {
                                                                                if (
                                                                                    i.cid ===
                                                                                    list.cid
                                                                                ) {
                                                                                    return {
                                                                                        ...i,
                                                                                        items: i.items.map(
                                                                                            (j) => {
                                                                                                if (
                                                                                                    j.iid ===
                                                                                                    item.iid
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
                                                                        : ""}
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
                                                                            list.cid,
                                                                            "item.id: ",
                                                                            item.iid
                                                                        );
                                                                        deleteItem(
                                                                            list.cid,
                                                                            item.iid
                                                                        );
                                                                        setCheckList(
                                                                            checkList.map((i) => {
                                                                                if (
                                                                                    i.cid ===
                                                                                    list.cid
                                                                                ) {
                                                                                    return {
                                                                                        ...i,
                                                                                        items: i.items.filter(
                                                                                            (j) =>
                                                                                                j.iid !==
                                                                                                item.iid
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
                                                {invalidInput && <p style={{ color: 'red', fontSize: '15px', height: '20px', margin: '0', textAlign: 'center', }}>{invalidInput}</p>}               
                                                <div
                                                    style={{textAlign: 'center', }}
                                                >
                                                {/* 리스트 제목 수정 완료 버튼 */}
                                                <button
                                                    className="check-list-save-btn"
                                                    onClick={async () => {
                                                        let hasInvalidInput = false;
                                                        if(list.title ===''){
                                                            setInvalidInput('체크리스트 제목이 입력되지 않았습니다.');
                                                            hasInvalidInput = true;
                                                            return;
                                                        }
                                                        
                                                        list.items.map((item)=>{
                                                            if(item.name ===''){
                                                                setInvalidInput('준비물 이름이 입력되지 않았습니다.');
                                                                hasInvalidInput = true;
                                                                return;
                                                            } else {
                                                                setInvalidInput('');
                                                                hasInvalidInput = false;
                                                                return;
                                                            }
                                                        });
                                                        if(hasInvalidInput){
                                                            return;
                                                        }
                                                        try{ 
                                                            const updateItemPromises = [];
                                                        updateCheckListTitle(
                                                            list.cid,
                                                            list.title
                                                        );
                                                        checkList.map((e) => {
                                                            if (e.cid === list.cid) {
                                                                e.items.map((i) => {
                                                                    updateItemPromises.push(updateItemTitle(list.cid, i.iid, i.name));
                                                                });
                                                            }
                                                        });
                                                        await Promise.all(updateItemPromises);

                                                        setCheckList(
                                                            checkList.map((e) => {
                                                                if (e.cid === list.cid) {
                                                                    console.log("e.isedit : ");
                                                                    console.log(!e.isedit);
                                                                    return {
                                                                        ...e,
                                                                        isedit: !e.isedit,
                                                                        title: list.title,
                                                                    };
                                                                }
                                                                return e;
                                                            })
                                                        );
                                                        console.log(list);
                                                        console.log(checkList);
                                                        closeModal();
                                                        }  catch (error) {
                                                            console.error("An error occurred:", error);
                                                        }
                                                    }

                                                }
                                                >
                                                    완료
                                                </button>                                        
                                                {/* 리스트 삭제 버튼 */}
                                                <button
                                                    className="check-list-del-btn"
                                                    onClick={() => {
                                                        deleteCheckList(list.cid);
                                                        setCheckList(
                                                            checkList.filter(
                                                                (i) => i.cid !== list.cid
                                                            )
                                                        );
                                                        closeModal();
                                                    }}
                                                >        
                                                삭제                            
                                                </button>                   
                                                </div>                           
                                            </div>
                                        </CheckListModal>
                                    )}    
                                                                            
                                </div>
                            ) : (
                                // edit off
                                <div className="check-list-box-header">
                                    <div 
                                        className="check-list-title"
                                        // style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            openModal();
                                            // set list.isedit to true
                                            setCheckList(
                                                checkList.map((e) => {
                                                    if (e.cid === list.cid) {
                                                        return {
                                                            ...e,
                                                            isedit: !e.isedit,
                                                        };
                                                    }
                                                    return e;
                                                })
                                            
                                            );
                                            console.log(list);
                                            console.log(checkList);
                                        }}     
                                    >
                                        {list.title}
                                    </div>
                                </div>
                                )
                            }
                            
                              

                            {/* 체크리스트 항목들 */}
                            <div className="check-list-item-wrapper">
                                {list.items.map((item) => (
                                    <div
                                        className="check-list-item-container"
                                        key={item.iid}
                                    >
                                        {/* 체크박스 */}
                                        <input
                                            className="check-list-item-checkbox"
                                            type="checkbox"
                                            checked={item.isChecked}
                                            onChange={() => {
                                                console.log(
                                                    "check item / list.cid: ",
                                                    list.cid,
                                                    "item.id: ",
                                                    item.iid
                                                );
                                                updateItemStatus(
                                                    list.cid,
                                                    item.iid
                                                );
                                                setCheckList(
                                                    checkList.map((e) => {
                                                        if (
                                                            e.cid === list.cid
                                                        ) {
                                                            return {
                                                                ...e,
                                                                items: e.items.map(
                                                                    (i) => {
                                                                        if (
                                                                            i.iid ===
                                                                            item.iid
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
                                            <div className="check-list-item">
                                                {item.name
                                                    ? item.name
                                                    : ""}
                                            </div>
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
