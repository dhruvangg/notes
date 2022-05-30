import { useNoteContext } from "Contexts/NoteContext"
import { Memo, NoteHeader } from "Components/Notes"
import Tasks from "Components/Tasks"
import { debounce } from "Utils/debounce"

export default function Notes() {
    const { createNote, notes } = useNoteContext()
    return (
        <section className="container my-4 mx-auto">
            <div className="flex justify-center mb-8">
                <button onClick={e => debounce(createNote())}
                    className="flex items-center bg-indigo-700 text-white py-1 px-2 rounded font-semibold"
                    aria-label="Create New Note" aria-required="true" tabIndex="true">Create Note</button>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8">
                {notes.map(note => (
                    <div key={note.id} className="flex flex-col hover:shadow-lg rounded-lg border border-gray-100 transition duration-200 ease-in-out" >
                        <NoteHeader data={{ noteId: note.id, title: note.title }} />
                        {note.hasOwnProperty("memo") && <Memo data={{ noteId: note.id, memo: note.memo }} />}
                        <Tasks data={{ noteId: note.id, tasks: note.tasks }} />
                    </div >
                ))}
            </div>
        </section >
    )
}
