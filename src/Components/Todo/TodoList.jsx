export function TodoList({ todos, actions }) {
    const { removeTodo, updateTodoState } = actions
    if (todos.length === 0) {
        return <p className="mt-4 text-center border border-gray-200 p-4">No todos Available</p>
    }


    return (
        <ul className="mt-4 border border-gray-200">
            {todos.sort((a, b) => a.id < b.id ? 1 : -1).map((todo, i) => (
                <li key={todo.id} className={`flex flex-row items-center justify-between px-4 py-2 border-gray-200 ${(i !== 0) ? 'border-t' : ''}`}>
                    <label>
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
