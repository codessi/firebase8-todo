import React from "react";
import Todos from "./Todos";

const signInWithGoogle = () => { };

const SignIn = () => {
  return (
    <main>
      <button onClick={ signInWithGoogle }>Sign in with google</button>
    </main>
  )
}

const App = () => {

  const user = "test"
  return (
    <div>
     {user? <Todos /> : <SignIn /> }
      
    </div>
  );
}

export default App;
