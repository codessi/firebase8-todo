import React from "react";
import { auth } from "./firebase";
import Todos from "./Todos";
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "./firebase";

const signInWithGoogle = () => {
  return (auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
};

const SignIn = () => {
  return (
    <main>
      <button onClick={ signInWithGoogle }>Sign in with google</button>
    </main>
  )
}

const App = () => {

  const [user] = useAuthState(auth)
  // const user = ""
  console.log(user)
  return (
    <div>
     {user? <Todos /> : <SignIn /> }
      
    </div>
  );
}

export default App;
