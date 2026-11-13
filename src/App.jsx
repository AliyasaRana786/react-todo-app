import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), text: trimmedTask, completed: false },
    ]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((item) => item.id !== id));
  };

  const completedCount = tasks.filter((item) => item.completed).length;

  return (
    <main className="page">
      <section className="todo-card">
        <div className="heading">
          <span className="eyebrow">DAILY PLANNER</span>
          <h1>My Todo App</h1>
          <p>Make today productive, one task at a time.</p>
        </div>

        <div className="input-row">
          <input
            type="text"
            value={task}
            placeholder="What do you need to do?"
            onChange={(event) => setTask(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addTask();
            }}
            aria-label="New task"
          />
          <button className="add-button" onClick={addTask}>Add task</button>
        </div>

        <div className="summary">
          <span>{tasks.length} {tasks.length === 1 ? "task" : "tasks"}</span>
          <span>{completedCount} completed</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h2>No tasks yet</h2>
            <p>Add your first task above to get started.</p>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((item) => (
              <li className="task-item" key={item.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                  <span className={item.completed ? "task-text completed" : "task-text"}>
                    {item.text}
                  </span>
                </label>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(item.id)}
                  aria-label={`Delete ${item.text}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer>Built with React + Vite</footer>
      </section>
    </main>
  );
}

export default App;
