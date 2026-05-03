import { useState } from 'react'

function Form({ addTask }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      addTask(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача..."
      />
      <button type="submit">Добавить</button>
    </form>
  )
}

export default Form