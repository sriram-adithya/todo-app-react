import React, { useState } from "react";
import "./TodoApp.css";

const TodoApp = () => {

    const [todosItem, updateTodosItem] = useState([
       { title: 'item1' , completed: false},
       { title: 'item2' , completed: true}
    ]);

  return (
    <div className="todo-wrapper">
      <TodoForm  updateTodosItem = {updateTodosItem} todosItem={todosItem}/>
      <TodoList updateTodosItem = {updateTodosItem} todosItem={todosItem} />
    </div>
  );
};

const TodoForm = ({updateTodosItem, todosItem}) => {

    const[newTodoList, setNewTodoList] = useState("");

    const handleChange = (e) =>{
        setNewTodoList(e.target.value)
        
    }
    const handleAddItem = () =>{
        console.log(newTodoList)
        updateTodosItem([...todosItem, {title: newTodoList, completed: false}])

    }
  return (
    <div className="todo-form">
        <input onChange={handleChange} type="text" placeholder="Add Item" />
        <button onClick={handleAddItem}>Add</button>
    </div>
  );
};

const TodoList = ({todosItem, updateTodosItem}) => {

    const handleTodoCompletion = (e) =>{
        const currentIndex = Number(e.target.dataset.index);  /*Getting current index value */
        const updateTodo = {...todosItem[currentIndex], completed : e.target.checked };  
        const updatedTodos = [...todosItem]
        /*making a clone with updatedTodos to get splice method to replace with completed value*/
        updatedTodos.splice(currentIndex, 1, updateTodo)
        updateTodosItem(updatedTodos);

    }

  return (
    <div>
      <ul className="todo-list">
        {todosItem.length===0 ?<span>Add items...</span>: ""}   
        {todosItem.map((item, idx) => (
          <li className="todo-item">
            <input type="checkbox" onChange={handleTodoCompletion} data-index={idx} checked={item.completed} />
             <span className={item.completed ? "strike" : ""}>{item.title}</span>
         </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
