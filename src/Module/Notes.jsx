import { useRef, useEffect } from "react"
import { useTodoContext } from "Contexts/TodoContext"
import { NoteHeader } from "Components/Notes"
import Tasks from "Components/Tasks"
import { debounce } from "Utils/debounce"

export default function Notes() {
    const { createNewTodo, updateTodo, removeTodo, todos } = useTodoContext()
    return (
        <section className="container my-4 mx-auto">
            <button onClick={e => debounce(createNewTodo())}
                className="flex items-center bg-indigo-700 text-white py-1 px-2 rounded">New Note</button>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8">
                {todos.map(todo => (
                    <div key={todo.id} className="flex flex-col hover:shadow-lg rounded-lg border border-gray-100 transition duration-200 ease-in-out">
                        <NoteHeader data={{ noteId: todo.id, title: todo.title }} />
                        <Tasks data={{ noteId: todo.id, tasks: todo.tasks }} />
                    </div >
                ))
                }
            </div >

        </section >
    )
}
