import { useRecoilState } from "recoil";
import { noteState } from "../../recoil/atoms/noteState";
import { selectedNoteId } from "../../recoil/atoms/noteState";
import { checkListState } from "../../recoil/atoms/noteState";
import { userInfoState } from "../../recoil/atoms/userState";
import "./CheckList.css";
import edit_btn from "../../assets/images/edit_btn.png";
import add_btn from "../../assets/images/add_btn.png";
import del_btn from "../../assets/images/del_btn.png";
import { useEffect } from "react";
import axios from "axios";
import { el } from "date-fns/locale";

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
            setNoteList(response.data);
        } catch (error) {
            console.log(error);
            console.log("체크리스트 생성 실패");
        }
    };

    // 체크리스트 제목 변경
    const updateCheckListTitle = async (cId) => {
        try {
            const response = await axios.patch(`${serverUrl}/category/${cId}`, {
                body: {
                    title: "새로운 제목",
                },
            });
            console.log(response);
            setNoteList(response.data);
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
            setNoteList(response.data);
        } catch (error) {
            console.log(error);
            console.log("체크리스트 삭제 실패");
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
                        createCheckList();
                    }}
                >
                    체크리스트 추가
                    <img src={add_btn} alt="add_btn" />
                </div>
            </div>

            {checkList.find((list) => list.travelId === selectedNote) ? null : (
                <div>체크리스트를 추가해 주세요.</div>
            )}
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
                                            deleteCheckList();
                                        }}
                                    />

                                    {/* 리스트 제목 수정 박스 */}
                                    <input
                                        className="check-list-title-edit-box"
                                        type="text"
                                        value={list.title}
                                        onChange={(e) => {}}
                                    ></input>

                                    {/* 항목 추가 버튼 */}
                                    <button
                                        className="check-list-add-item-btn"
                                        onClick={
                                            // add new content
                                            () => {}
                                        }
                                    >
                                        항목추가
                                    </button>

                                    {/* 리스트 제목 수정 완료 버튼 */}
                                    <button
                                        className="check-list-save-btn"
                                        onClick={() => {
                                            // set check.isedit to false
                                            // set check.title to input value
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
                                                checkList.map((item) => {
                                                    if (item.id === list.id) {
                                                        return {
                                                            ...item,
                                                            isedit: !item.isedit,
                                                        };
                                                    }
                                                    return item;
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
                                            checked={item.ischecked}
                                            onChange={() => {}}
                                        />

                                        {/* 체크리스트 항목 */}
                                        <input
                                            className="check-list-item"
                                            type="text"
                                            value={item.item}
                                            placeholder="항목을 입력하세요"
                                            onChange={() => {}}
                                        />

                                        {list.isedit ? (
                                            <img
                                                className="check-list-item-delete"
                                                src={del_btn}
                                                alt="del_btn"
                                                onClick={() => {}}
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
