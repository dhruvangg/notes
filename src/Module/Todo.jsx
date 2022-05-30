import { useState, useEffect } from "react";
import { TodoList, TodoForm, TodoInput, TodoHeader } from "../Components/Todo"

export default function Todo() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
    const [newTodo, setNewTodo] = useState("");

    const onAddTodo = (e) => {
        e.preventDefault();
        if (newTodo) {
            setTodos((previousTodos) => [...previousTodos, { id: Date.now(), text: newTodo, isCompleted: false }])
            setNewTodo("");
        }
    }

    const onUpdateTodoState = (e) => {
        setNewTodo(e.target.value);
    }

    const removeTodo = (id) => {
        setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
    }

    const onUpdateTodo = (id, text) => {
        if (text) {
            setTodos((previousTodos) => previousTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
        }
    }

    const updateTodoState = (id) => {
        setTodos((previousTodos) => previousTodos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
    }

    const clearAllTodos = () => {
        setTodos([]);
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])


    return (
        <section className="max-w-2xl my-4 mx-auto">
            <TodoHeader title="Champ" clearAllTodos={clearAllTodos} />
            <TodoForm onAddTodo={onAddTodo}>
                <TodoInput
                    todoInputValue={newTodo}
                    onUpdateTodoState={onUpdateTodoState}
                />
            </TodoForm>
            <TodoList todos={todos} actions={{ removeTodo, onUpdateTodo, updateTodoState }} removeTodo={removeTodo} updateTodoState={updateTodoState} />
        </section>
    )
}
