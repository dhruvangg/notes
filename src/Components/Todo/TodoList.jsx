import { useRef, useEffect } from "react"
import SortableMin from "sortablejs";

export function TodoList({ todos, actions }) {
    const listRef = useRef()
    const { removeTodo, updateTodoState } = actions

    useEffect(() => {
        SortableMin.create(listRef.current, {
            handle: ".handle",
            onChange: function (evt) {
                console.log(evt.item.dataset.id, evt.newIndex)
            }
        })
    }, [])

    if (todos.length === 0) {
        return <p className="mt-4 text-center border border-gray-200 p-4">No todos Available</p>
    }

    return (
        <ul className="mt-4 border border-gray-200 border-t-0" ref={listRef}>
            {todos.sort((a, b) => a.id < b.id ? 1 : -1).map((todo, i) => (
                <li key={todo.id} data-id={todo.id} className={`flex flex-row items-center justify-between px-4 py-2 border-gray-200 border-t`}>
                    <label className="flex justify-center items-center">
                        <span className="mr-4 cursor-pointer handle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        </span>
                        <input type="checkbox" className="mr-2" checked={todo.isCompleted} onChange={() => { updateTodoState(todo.id) }} />
                        <span className={`${todo.isCompleted ? 'line-through' : ''}`}>{todo.text}</span>
                    </label>
                    <button onClick={() => removeTodo(todo.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
            ))}
        </ul>
    )
}
