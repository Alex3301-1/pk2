import { useState } from 'react'

function Todo({ task, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(task.name)

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editTask(task.id, newName)
    setIsEditing(false)
  }

  const viewTemplate = (
    <div className="todo">
      <input
        type="checkbox"
        id={task.id}
        checked={task.completed}
        onChange={() => task.toggleCompleted?.(task.id)}
      />
      <label htmlFor={task.id}>{task.name}</label>
      <button onClick={() => setIsEditing(true)}>Редактировать</button>
      <button onClick={() => deleteTask(task.id)}>Удалить</button>
    </div>
  )

  const editingTemplate = (
    <form className="todo editing" onSubmit={handleSubmit}>
      <label>
        Новое название для "{task.name}":
        <input
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={() => setIsEditing(false)}>
        Отмена
      </button>
      <button type="submit">Сохранить</button>
    </form>
  )

  return isEditing ? editingTemplate : viewTemplate
}

export default Todo