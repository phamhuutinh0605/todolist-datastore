import { useState } from 'react'
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from "./models";
const AddTodoForm=()=> {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async event => {
    // event.preventDefault()

    const newTodo = {
      name,
      description,
      completed: false,
    }

    try {
      await DataStore.save(new Todo({...newTodo}))
      setName('')
      setDescription('')
    } catch (error) {
      console.log('error creating todo:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new todo:</h3>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add</button>
    </form>
  )
}
export default AddTodoForm;