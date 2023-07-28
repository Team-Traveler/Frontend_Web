import { useRecoilState } from "recoil";
import { noteState } from "../../recoil/atoms/noteState";
import { selectedNoteId } from "../../recoil/atoms/noteState";

function AccountBook() {
    const [noteList, setNoteList] = useRecoilState(noteState);
    const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);

    return (
        <div>
            {/* show selected note id's accountcontent */}
            {noteList[selectedNote - 1].accountcontent}
        </div>
    );
}

export default AccountBook;
