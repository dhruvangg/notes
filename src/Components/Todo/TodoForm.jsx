export function TodoForm({ children, onAddTodo }) {
    return (
        <form onSubmit={onAddTodo}>
            {children}
        </form>
    )
}
