import { DataStore } from "aws-amplify";
import { useState } from "react";
import { Todo } from "./models";
import {
  Button,
  CheckboxField,
  Flex,
  Text,
  TextAreaField,
  TextField,
  View,
} from "@aws-amplify/ui-react";

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);

  const handleUpdate = async (event) => {
    const original = await DataStore.query(Todo, todo.id);

    await DataStore.save(
      Todo.copyOf(original, (updated) => {
        updated.name = name;
        updated.description = description;
        updated.completed = completed;
      })
    );
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
    <>
      {isEditing ? (
        <View>
          <form onSubmit={handleUpdate}>
            <TextField
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <TextAreaField
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
            <Button type="submit" variantion="link">
              Save
            </Button>
            <Button
              type="button"
              variantion="default"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </form>
        </View>
      ) : (
        <>
          <View>
            <Flex>
              <Text>
                {todo.name} - {todo.description} -{" "}
                {todo.completed ? "Completed" : "Not completed"}
              </Text>
              <Button
                type="button"
                variantion="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button
                type="button"
                variation="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Flex>
          </View>
        </>
      )}
    </>
  );
};
export default TodoItem;
