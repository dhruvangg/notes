import TodoProvider from 'Contexts/TodoContext';
import Notes from 'Module/Notes';

export default function App() {
  return (
    <main className="container mx-auto min-h-screen p-8">
      <TodoProvider>
        <Notes />
      </TodoProvider>
    </main>
  )
}
