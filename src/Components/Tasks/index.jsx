import { useNoteContext } from "Contexts/NoteContext"
import { useRef, useEffect } from "react"

export default function Tasks({ data }) {
    const { noteId, tasks } = data
    const { addTask, updateTask, removeTask } = useNoteContext()
    const taskRef = useRef()
    const addNewTask = (e) => {
        const { value } = e.target
        if (e.keyCode === 13 && value) {
            addTask(noteId, value)
            e.target.value = ""
        }
    }
    useEffect(() => {
        if (taskRef.current) {
            //taskRef.current.querySelector("input[type='text']").focus()
        }
    }, [tasks])

    const handleFocus = (e) => {
        e.target.matches(".blankSpace") && e.target.querySelector("input[name=newTask]").focus()
    }

    return (
        <div className="flex-1 cursor-pointer blankSpace" onClick={handleFocus}>
            {tasks.map((task, i) => (
                <div key={task.id} ref={taskRef} className="group flex flex-row items-center justify-between px-4 py-2 border-gray-300 border-t">
                    <input type="checkbox" checked={task.isCompleted} onChange={e => updateTask(noteId, task.id, task.text, e.target.checked)} tabIndex="true" />
                    <input type="text"
                        tabIndex="true" className={`ml-2 focus:outline-none flex-1 bg-transparent ${task.isCompleted ? 'line-through' : ''}`}
                        value={task.text}
                        aria-label={task.text}
                        onChange={(e) => { updateTask(noteId, task.id, e.target.value, task.isCompleted) }} />
                    <button onClick={() => removeTask(noteId, task.id)} aria-label="Remove Task" tabIndex="true" className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-6  00" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            ))}
            <div className="flex flex-row items-center justify-between px-4 py-2 border-gray-200 border-t">
                <input type="text" name="newTask" className="w-full ml-2 focus:outline-none" aria-label="New Task" aria-required="true"
                    onKeyUp={addNewTask}
                    placeholder="Add Task" />
            </div>
        </div >
    )
}
