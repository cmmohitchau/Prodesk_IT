import { useState, useEffect } from "react"

type Task = {
  id: number
  text: string
  priority: "low" | "medium" | "high"
}

function App() {
  const [todo, setTodo] = useState<Task[]>(() => {
    const data = localStorage.getItem("todo")
    return data ? JSON.parse(data) : []
  })

  const [inProgress, setInProgress] = useState<Task[]>(() => {
    const data = localStorage.getItem("inProgress")
    return data ? JSON.parse(data) : []
  })

  const [done, setDone] = useState<Task[]>(() => {
    const data = localStorage.getItem("done")
    return data ? JSON.parse(data) : []
  })

  const [input, setInput] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low")
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo))
  }, [todo])

  useEffect(() => {
    localStorage.setItem("inProgress", JSON.stringify(inProgress))
  }, [inProgress])

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(done))
  }, [done])


  function addTodo() {
    if (!input.trim()) return

    const newTask: Task = {
      id: Date.now(),
      text: input,
      priority,
    }

    setTodo([...todo, newTask])
    setInput("")
  }

 
  function deleteTask(id: number, column: string) {
    if (column === "todo") {
      setTodo(todo.filter((t) => t.id !== id))
    } else if (column === "progress") {
      setInProgress(inProgress.filter((t) => t.id !== id))
    } else {
      setDone(done.filter((t) => t.id !== id))
    }
  }

 
  function moveTask(task: Task, from: string) {
    deleteTask(task.id, from)

    if (from === "todo") {
      setInProgress([...inProgress, task])
    } else if (from === "progress") {
      setDone([...done, task])
    }
  }


  function updateTask(id: number, newText: string, column: string) {
    const update = (list: Task[]) =>
      list.map((t) => (t.id === id ? { ...t, text: newText } : t))

    if (column === "todo") setTodo(update(todo))
    if (column === "progress") setInProgress(update(inProgress))
    if (column === "done") setDone(update(done))
  }

  
  function getBorder(priority: string) {
    if (priority === "high") return "border-red-500"
    if (priority === "medium") return "border-yellow-500"
    return "border-green-500"
  }

  function renderTasks(list: Task[], column: string) {
    return list.map((task) => (
      <li
        key={task.id}
        className={`mb-2 border-2 p-2 flex rounded-md justify-between ${getBorder(
          task.priority
        )}`}
      >
        {editingId === task.id ? (
          <input
            value={task.text}
            onChange={(e) => updateTask(task.id, e.target.value, column)}
            onBlur={() => setEditingId(null)}
            autoFocus
            className="border px-1"
          />
        ) : (
          <span
            onClick={() => setEditingId(task.id)}
            className="cursor-pointer"
          >
            {task.text}
          </span>
        )}

        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => deleteTask(task.id, column)}
          >
            Delete
          </button>

          {column !== "done" && (
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => moveTask(task, column)}
            >
              Move
            </button>
          )}
        </div>
      </li>
    ))
  }

  return (
    <div className="h-screen flex justify-center bg-gray-100">
      <div className="flex flex-col w-full max-w-5xl">
        <h1 className="text-3xl mt-4 font-bold text-center">
          Task Manager
        </h1>

        
        <div className="flex gap-2 mt-4 justify-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task..."
            className="border px-2 py-1"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            className="border px-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Add Task
          </button>
        </div>

        {/* 📋 Columns */}
        <div className="grid grid-cols-3 gap-4 mt-8 px-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold border-b mb-4">To Do</h2>
            <ul>{renderTasks(todo, "todo")}</ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold border-b mb-4">
              In Progress
            </h2>
            <ul>{renderTasks(inProgress, "progress")}</ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold border-b mb-4">Done</h2>
            <ul>{renderTasks(done, "done")}</ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App