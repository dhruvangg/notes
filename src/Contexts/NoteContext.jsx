import { useContext, createContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

export const NoteContext = createContext()

export function useNoteContext() {
    return useContext(NoteContext)
}

export default function NoteProvider({ children }) {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [])
    // const createNote = (title = 'New Note', tasks = []) => {
    //     const newNote = {
    //         id: uuidv4(),
    //         title: title,
    //         tasks: tasks,
    //     }
    //     setNotes((prevNotes) => [...prevNotes, newNote])
    // }

    const createNote = (obj) => {
        for (var key in obj) {
            obj[key] === null && delete obj[key];
        }
        const newNote = { id: uuidv4(), ...obj }
        setNotes((prevNotes) => [...prevNotes, newNote])
    }

    const updateNote = (id, text) => {
        setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? { ...note, title: text } : note)))
    }

    const removeNote = (id) => {
        setNotes((prevNotes) => {
            return prevNotes.filter(note => note.id !== id)
        })
    }

    const addTask = (id, text) => {
        setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? { ...note, tasks: [...note.tasks, { id: Date.now(), text, isCompleted: false }] } : note)))
    }

    const updateTask = (noteId, id, text, isCompleted) => {
        setNotes((prevNotes) => prevNotes.map((note) => (note.id === noteId ? { ...note, tasks: note.tasks.map((task) => (task.id === id ? { ...task, text, isCompleted } : task)) } : note)))
    }

    const removeTask = (noteId, id) => {
        setNotes((prevNotes) => {
            const newnotes = [...prevNotes]
            const note = newnotes.find(note => note.id === noteId)
            note.tasks = note.tasks.filter(task => task.id !== id)
            return newnotes
        })
    }

    const addUpdateMemo = (noteId, memo = '') => {
        setNotes((prevNotes) => {
            const newnotes = [...prevNotes]
            const note = newnotes.find(note => note.id === noteId)
            note.memo = memo
            return newnotes
        })
    }

    const cloneNote = (noteId) => {
        const newNotes = [...notes]
        const note = newNotes.find(note => note.id === noteId)
        newNotes.push({ ...note, id: uuidv4() })
        setNotes(newNotes)
    }

    const value = {
        createNote,
        updateNote,
        removeNote,
        cloneNote,
        addTask,
        updateTask,
        removeTask,
        addUpdateMemo,
        notes
    }

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    useEffect(() => {
        const oldVersion = JSON.parse(localStorage.getItem("todos")) || null
        if (oldVersion) {
            createNote({ title: 'Old Version todos', tasks: oldVersion })
            localStorage.removeItem("todos")
            localStorage.setItem("oldVersion", oldVersion)
        }
    }, [])

    return <NoteContext.Provider value={value}>
        {children}
    </NoteContext.Provider>
}