import { useState } from 'react'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import Todo from './components/Todo'
import './App.css'

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Изучить React', completed: false },
    { id: 2, name: 'Сделать Todo-приложение', completed: false },
    { id: 3, name: 'Опубликовать на GitHub', completed: true }
  ])
  const [filter, setFilter] = useState('All')

  const addTask = (name) => {
    const newTask = {
      id: Date.now(),
      name: name,
      completed: false
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => task.id !== id)
    setTasks(remainingTasks)
  }

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const filteredTasks = tasks.filter(FILTER_MAP[filter])
  
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const taskList = filteredTasks.map(task => (
    <Todo
      key={task.id}
      task={{ ...task, toggleCompleted: toggleTaskCompleted }}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  const tasksNoun = taskList.length !== 1 ? 'задач' : 'задача'
  const headingText = `${taskList.length} ${tasksNoun} осталось`

  return (
    <div className="app">
      <h1>Мои задачи</h1>
      <Form addTask={addTask} />
      <div className="filters">
        {filterList}
      </div>
      <h2>{headingText}</h2>
      <ul className="todo-list">
        {taskList}
      </ul>
    </div>
  )
}

export default App