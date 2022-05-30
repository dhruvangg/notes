import { Menu } from '@headlessui/react'
import { useNoteContext } from "Contexts/NoteContext"

export function NoteHeader({ data }) {
    const { addUpdateMemo, updateNote, removeNote } = useNoteContext()
    const { noteId, title } = data
    return (
        <div className="flex flex-none items-center justify-between p-4">
            <h1 className="text-2xl font-semibold">
                <input type="text" value={title} className="focus:outline-none"
                    onChange={e => updateNote(noteId, e.target.value)} />
            </h1>
            <Menu className="relative" as="div">
                <Menu.Button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </Menu.Button>
                <Menu.Items className="absolute flex flex-col bg-white w-48 right-0 border rounded" as="div">
                    <Menu.Item className="px-4 py-2 flex flex-row items-center border-b" as="div">
                        <button className='mr-2 text-sm w-full text-left' onClick={e => removeNote(noteId)}>Delete note</button>
                    </Menu.Item>
                    <Menu.Item className="px-4 py-2 flex flex-row items-center border-b" as="div">
                        <button className='mr-2 text-sm w-full text-left' onClick={e => addUpdateMemo(noteId)}>Add Memo</button>
                    </Menu.Item>
                    <Menu.Item className="px-4 py-2 flex flex-row items-center" as="div">
                        <button className='mr-2 text-sm w-full text-left'>Make a Copy</button>
                    </Menu.Item>
                </Menu.Items>
            </Menu>
            {/* <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg> */}
            {/* <button onClick={e => removeNote(noteId)}
                className="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </button> */}
        </div >
    )
}
