export function TodoInput({ todoInputValue, onUpdateTodoState }) {
    return (
        <input
            type="text"
            className="border border-gray-200 px-4 py-2 w-full focus:outline-none"
            placeholder="What needs to be done?"
            onChange={onUpdateTodoState}
            value={todoInputValue}
        />
    )
}
