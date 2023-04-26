import { Button, Link, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { Amplify, Auth, Storage } from "aws-amplify";
import { useEffect, useState } from "react";

function App({ signOut, user }) {
  async function uploadImg(e) {
    const file = e.target.files[0];
    console.log("file", file);
    try {
      await Storage.put(user.attributes.sub + "/avatar", file, {
        contentType: "image/png", // contentType is optional
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const [image, setImage] = useState();
  useEffect(() => {
    // Storage.list("", { level: "public" }) // for listing ALL files without prefix, pass '' instead
    //   .then(({ results }) => {
    //     console.log("results", results);
    // Storage.get(`avatar/${user.attributes.sub}`, {
    //   level: "public",
    // })
    //   .then((results) => console.log("avatar",results))
    //   .catch((err) => console.log(err));

    Storage.get(`${user.attributes.sub}/avatar`, {
      level: "public",
    })
      .then((results) => setImage(results))
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <>
      <div style={{ maxWidth: 1024, margin: "auto" }}>
        <h1 className="">
          Hello {user.username} - <Link href={image}>Avatar</Link>
        </h1>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <input type="file" onChange={uploadImg} />
          <Button
            type="button"
            onClick={signOut}
            variation="default"
            className="btn__logout"
          >
            Log out
          </Button>
        </div>
        <AddTodoForm />
        <TodoList image={image} />
      </div>
    </>
  );
}

export default withAuthenticator(App);
