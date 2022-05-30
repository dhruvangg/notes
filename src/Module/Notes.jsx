import { useNoteContext } from "Contexts/NoteContext"
import { Memo, NoteHeader } from "Components/Notes"
import Tasks from "Components/Tasks"
import { debounce } from "Utils/debounce"

export default function Notes() {
    const { createNote, notes } = useNoteContext()
    return (
        <section className="container my-4 mx-auto">
            <div className="flex justify-center mb-8">
                <button onClick={e => debounce(createNote({ title: 'Tasks List', tasks: [] }))}
                    className="flex items-center bg-indigo-700 text-white rounded  py-2 px-4 mx-2"
                    aria-label="Create New Note" tabIndex="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span className="ml-1 text-sm">New Tasks</span>
                </button>

                <button onClick={e => debounce(createNote({ title: 'New Memo', memo: '' }))}
                    className="flex items-center bg-indigo-700 text-white rounded  py-2 px-4 mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="ml-1 text-sm">New Memo</span>
                </button>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-6">
                {notes.map(note => (
                    <div key={note.id} className="flex flex-col hover:shadow-lg rounded-lg border border-gray-200 transition duration-200 ease-in-out">
                        <NoteHeader data={{ noteId: note.id, title: note.title }} />
                        {note.hasOwnProperty("memo") && <Memo data={{ noteId: note.id, memo: note.memo }} />}
                        {note.hasOwnProperty("tasks") && <Tasks data={{ noteId: note.id, tasks: note.tasks }} />}
                    </div >
                ))}
            </div>
        </section >
    )
}
