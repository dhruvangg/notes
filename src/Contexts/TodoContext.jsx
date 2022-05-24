import { useContext, createContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext()

export function useTodoContext() {
    return useContext(TodoContext)
}

export default function TodoProvider({ children }) {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("notes")) || [])
    const createNewTodo = () => {
        const newTodo = {
            id: uuidv4(),
            title: 'New Note',
            tasks: [],
        }
        setTodos((previousTodos) => [...previousTodos, newTodo])
    }

    const updateTodo = (id, text) => {
        setTodos((previousTodos) => previousTodos.map((todo) => (todo.id === id ? { ...todo, title: text } : todo)))
    }

    const removeTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== id)
        })
    }

    const addTask = (id, text) => {
        setTodos((previousTodos) => previousTodos.map((todo) => (todo.id === id ? { ...todo, tasks: [...todo.tasks, { id: Date.now(), text, isCompleted: false }] } : todo)))
    }

    const updateTask = (noteId, id, text, isCompleted) => {
        // setTodos((previousTodos) => previousTodos.map((todo) => (todo.tasks.map((task) => (task.id === id ? { ...task, text, isCompleted } : task)))))
        setTodos((previousTodos) => previousTodos.map((todo) => (todo.id === noteId ? { ...todo, tasks: todo.tasks.map((task) => (task.id === id ? { ...task, text, isCompleted } : task)) } : todo)))
    }

    const removeTask = (noteId, id) => {
        setTodos((prevTodos) => {
            const newTodos = [...prevTodos]
            const todo = newTodos.find(todo => todo.id === noteId)
            todo.tasks = todo.tasks.filter(task => task.id !== id)
            return newTodos
        })
    }

    const value = {
        createNewTodo,
        updateTodo,
        removeTodo,
        addTask,
        updateTask,
        removeTask,
        todos
    }

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(todos))
    }, [todos])

    return <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
}