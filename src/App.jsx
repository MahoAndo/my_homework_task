import './App.css'
import { useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from "uuid"
import { addTodo, deleteTodo, toggleTodo, editTodo } from "./actions/actions"

function App() {
  const todos = useSelector(state => state.todos);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [showFlag, setShowFlag] = useState(true); 

  const handleClick = () => {
    // dispatch(
      // { type: "ADD_TODO", 
      //   payload: { 
      //     id: uuidv4(), 
      //     text: inputRef.current.value, 
      //     completed: false 
      //   } 
      // }
    // )

    const data = {
      id: uuidv4(), 
      text: inputRef.current.value, 
      completed: false 
    };

    dispatch(addTodo(data))
    inputRef.current.value = "";
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  }

  // write a function for edit todo to dispatch to reducer
  const inputFocusClick = () =>{
    this.refs['text-cell'].focus();
  }
  const handleEdit = (id, text, completed) => {
    //inputFocusClick;

    console.log(id, text, completed);
    const data = {
      id, 
      text: text,
      completed
    }
    dispatch(editTodo(data));
    setShowFlag(true);
  }

  //change text to input 
  const editClick = (id, text, completed) => {
    setShowFlag(false);
    const data = {
      id, 
      text: text,
      completed
    }

    dispatch(editTodo(data));
  };

  return (
    <div className="App">
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Add</button>
      {
        todos.map((todo) => {
          return (
            <div key={todo.id}>
              <li className='todo'>
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                {showFlag ?
                <b className={todo.completed ? 'completed-todo': ""}>{todo.text}</b> :
                <input 
                  type="text" 
                  value={todo.text}
                />
                }
                {/* once you click to edit button, its going to have an input instead of text and once you type and submit, you need to dispatch to reducer. */}
                <button 
                  onClick={editClick}>
                    Edit
                  </button>
                <button 
                  onClick={() => handleEdit(todo.id, todo.text, todo.completed)}>
                    Submit
                  </button>
                <button 
                  onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
              </li>
            </div>
          )
        }) 
      }
    </div>
  )
}

export default App
