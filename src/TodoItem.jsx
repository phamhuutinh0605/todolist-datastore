import { DataStore } from "aws-amplify";
import { useState } from "react";
import { Todo } from "./models";

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);

  const handleUpdate = async (event) => {
    // event.preventDefault();

    const updatedTodo = {
      id: todo.id,
      name,
      description,
      completed,
    };

    const original = await DataStore.query(updatedTodo, updatedTodo.id);

    // const updatedPost = await DataStore.save(
    //   Post.copyOf(original, updated => {
    //     updated.title = newTitle
    //   })
    // );

    try {
      await DataStore.save(
        Todo.copyOf(updatedTodo, (updated) => {
          updated = updatedTodo;
        })
      );
      setName("");
      setDescription("");
    } catch (error) {
      console.log("error creating todo:", error);
    }
  };

  const handleDelete = async () => {
    const deleteTodoInput = {
      id: todo.id,
    };
    try {
      const toDelete = await DataStore.query(Todo, deleteTodoInput.id);
      DataStore.delete(toDelete);
    } catch (error) {
      console.log("error deleting todo:", error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
          </label>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          {todo.name} - {todo.description} -{" "}
          {todo.completed ? "Completed" : "Not completed"}
          <br />
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};
export default TodoItem;
