import { useNoteContext } from "Contexts/NoteContext"
import { debounce } from "Utils/debounce"

export function Memo({ data }) {
    const { noteId, memo } = data
    const { addUpdateMemo } = useNoteContext()
    let timer;
    const UpdateMemo = (e) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            addUpdateMemo(noteId, e.target.value)
        }, 3000);
    }

    return (
        <textarea className="focus:outline-none px-4 py-2 border-t"
            placeholder="Make a Memo" rows={5}
            onKeyUp={UpdateMemo} defaultValue={memo} />
    )
}
