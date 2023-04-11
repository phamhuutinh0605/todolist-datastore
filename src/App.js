import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <AddTodoForm/>
      <TodoList/>
    </>
  );
}

export default withAuthenticator(App);