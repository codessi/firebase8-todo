import React, { useState } from 'react'
import { auth, firestore } from './firebase'
import firebase from 'firebase'
import {useCollectionData} from "react-firebase-hooks/firestore"

const Todos = () => {
  const [todo, setTodo] = useState("")
  const todosRef = firestore.collection(`users/${auth.currentUser?.uid}/todos`)

  const [todos] = useCollectionData(todosRef, { idField: "id"})
console.log(todos)
  const signOut = () => {auth.signOut() };
  
  const onSubmitTodo = (event) => {
    event.preventDefault();

    
    todosRef.add({
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setTodo("")
  }
  return (
    <>
      <header>
        <button onClick={signOut}>Sign Out</button>
      </header>
      <main>
        <form onSubmit={onSubmitTodo}>
          <input
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder= "What's next?"
          />
          <button type='submit'>Add</button>
        </form>
        {todos && todos.map(todo => <Todo key={todo.id}{...todo} />)}
      </main>
    </>
  )
}

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser?.uid}/todos`)

  const onCompleteTodo = (id, complete) => { }
  
  const onDeleteTodo = (id) => { todosRef.doc(id).delete(); }

  return (
    <div className="todo">
      <button
        className={`todo-item ${complete ? "complete" : ""}`}
        tabIndex="0"
      onClick={()=> onCompleteTodo(id, complete)}
      >
        {text}
      </button>
      <button onClick={() => onDeleteTodo(id)}>x</button>
    </div>
  )
}

export default Todos