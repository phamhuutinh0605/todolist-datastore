import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { Amplify, Auth, Storage } from 'aws-amplify';


function App({ signOut, user }) {
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      await Storage.put(file.name, file, {
        contentType: "image/png", // contentType is optional
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function uploadImg() {
    Storage.list("photos/") // for listing ALL files without prefix, pass '' instead
      .then(({ results }) => console.log(results))
      .catch((err) => console.log(err));
  }
  return (
    <>
      <h1>Hello {user.username}</h1>
      <input type="file" onChange={onChange} />
      <Button
        type="button"
        onClick={signOut}
        variation="default"
        className="btn__logout"
      >
        Log out
      </Button>
      <AddTodoForm uploadImg={uploadImg}/>
      <TodoList />
    </>
  );
}

export default withAuthenticator(App);
