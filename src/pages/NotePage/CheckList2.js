{
    noteList
        .find((note) => note.id === selectedNote)
        .checkcontent.map((check) => (
            <div className="check-list-box" key={check.id}>
                {check.isedit ? (
                    // edit on
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
                            value={check.title}
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
                        <div className="check-list-title">{check.title}</div>

                        {/* 리스트 수정 버튼 */}
                        <img
                            className="check-list-edit-btn"
                            src={edit_btn}
                            alt="edit_btn"
                            onClick={() => {
                                // set check.isedit to true
                            }}
                        />
                    </div>
                )}

                {/* 체크리스트 항목들 */}
                <div className="check-list-item-wrapper">
                    {check.content.map((content) => (
                        <div
                            className="check-list-item-container"
                            key={content.id}
                        >
                            <input
                                className="check-list-item-checkbox"
                                type="checkbox"
                                checked={content.ischecked}
                                onChange={(e) => {}}
                            ></input>

                            {/* 체크리스트 항목 */}
                            <input
                                className="check-list-item"
                                type="text"
                                value={content.item}
                                placeholder="항목을 입력하세요"
                                // edit item by item id
                                onChange={(e) => {}}
                            ></input>
                            {check.isedit ? (
                                <img
                                    src={del_btn}
                                    alt="del_btn"
                                    className="check-list-item-delete"
                                    onClick={
                                        // delete item by item id
                                        () => {}
                                    }
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        ));
}
