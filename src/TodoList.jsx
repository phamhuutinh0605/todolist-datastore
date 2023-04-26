import { useState } from "react";
import { useEffect } from "react";
import TodoItem from "./TodoItem";
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from "./models";
import { View } from "@aws-amplify/ui-react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
       const todo=await DataStore.query(Todo)
        setTodos(todo);
      } catch (error) {
        console.log("error fetching todos:", error);
      }
    }

    fetchData();
  }, []);
  console.log(todos);
  return (
    <View>
      <ul>
      <h2>Todos:</h2>
        {todos.map((todo) => {
          return <TodoItem todo={todo} key={todo.id}/>;
        })}
      </ul>
    </View>
  );
};
export default TodoList;
