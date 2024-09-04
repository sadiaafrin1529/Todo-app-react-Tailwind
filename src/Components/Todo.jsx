import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems';
const Todo = () => {
  // useState is a hook that allows you to store and manage state within a functional component.
  // const [todoList, settodoList] = useState([])
  const [todoList, settodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  
  const inputRef = useRef();
  const add = () => {
    // trim() remove the extra space
    const inputText = inputRef.current.value.trim();
    // console.log(inputText);
    // nothing will be added to the input field when it's empty.
    if (inputText === "") {
      return null;
    }
    //state will be changed
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    // here the previous todo will also be there. and also added new todo
    settodoList((prev) => [...prev, newTodo]);
    // clear the input field
    inputRef.current.value = "";
  };

  //delete todo Items
  const deleteTodo = (id) => {
    settodoList((prevTodos) => {
    return  prevTodos.filter((todo)=>todo.id !== id)
    })
  }

  const toggle = (id) => {

    settodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo;
      })
    })
  }
//localstorage
  useEffect(() => {
    // console.log(todoList)
    localStorage.setItem("todos", JSON.stringify(todoList));
  },[todoList])

  return (
    <div className="bg-white flex place-self-center min-h-[550px] w-11/12 max-w-md flex-col p-7 rounded-xl ">
      {/* titlle */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">Todo List</h1>
      </div>
      {/* inputBox */}
      <div className="flex items-center my-7 rounded-full bg-gray-200">
        <input 
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2  placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none bg-orange-600 rounded-full h-14 w-32 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
        {/* static value */}
        {/* <TodoItems text="Learn Code" /> */}
      </div>
    </div>
  );
}

export default Todo
