import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos, setDescription, postTodo } from './todoSlice';

const Todo = () => {

    const dispatch = useDispatch();
    const todos = useSelector(state => state.todo.data);
    const addTodoForm = useSelector(state => state.todo.addTodoForm);

    useEffect(() => {
        if (!todos.length) {
            dispatch(loadTodos());
        }
    })

  return (
    <>
      <h1>Todo</h1>
      <ul>
        { todos.map(todo => (
            <li key={todo.id}>{todo.description}</li>
        ))}
      </ul>
      <h2>Add new todo</h2>
      <input type="text" placeholder="Skriv todo här..." onChange={(event) => dispatch(setDescription(event.target.value))} value={addTodoForm.description}></input>
      <button onClick={() => dispatch(postTodo(addTodoForm))}>Lägg till</button>
    </>
  );
};

export default Todo;
