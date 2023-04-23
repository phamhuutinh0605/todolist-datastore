import { useState } from 'react';
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from "./models";
import { Button, TextField } from '@aws-amplify/ui-react';

const AddTodoForm=({uploadImg})=> {
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
    <form onSubmit={handleSubmit} className='frm__add'>
      <h3>Add a new todo:</h3>
      <TextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br />
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        multiline
      />
      <br />
      <Button variant="contained" color="primary" type="submit" onClick={uploadImg}>Add</Button>
    </form>
  )
}

export default AddTodoForm;
