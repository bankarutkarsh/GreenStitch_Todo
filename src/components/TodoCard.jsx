import React from "react";
import { useDispatch } from "react-redux";
import { removeProgress, removeTodo, setActiveCard, toCompleted, toProgress } from "../redux/todo.slice";
import axios from "axios";

function TodoCard(props) {
  const dispatch = useDispatch();

  // Function to get the current date in the format "DD/MM/YY, HH"
  function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${mins}`;
  }

  const handleStart = async (item) => {
    try {
      const taskToProgress = await axios.post("http://localhost:3004/progress", item);
      dispatch(toProgress(taskToProgress.data));
      dispatch(removeTodo(item));
    } catch (error) {
      console.error("Error moving task to progress:", error);
    }
  };

  const handleComplete = async (item) => {
    const taskToCompleted = {
      task: item.task,
      description: item.description,
      date: getCurrentDate(),
    };

    try {
      const newTask = await axios.post('http://localhost:3004/completed', taskToCompleted);
      dispatch(toCompleted(newTask.data));
      dispatch(removeProgress(item));
    } catch (error) {
      console.error("Error moving task to completed:", error);
    }
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("task", JSON.stringify(item));
    dispatch(setActiveCard(item));
  };

  return (
    <li
      className="dd-item"
      draggable
      onDragStart={(e) => handleDragStart(e, props.task)}
      onDragEnd={() => dispatch(setActiveCard(null))}
    >
      <h3 className="title dd-handle">{props.task.task}</h3>
      {props.button === "pending" ? (
        <button onClick={() => handleStart(props.task)}>Start</button>
      ) : props.button === "progress" ? (
        <button onClick={() => handleComplete(props.task)}>Complete</button>
      ) : (
        props.task.date && <button>{props.task.date}</button>
      )}
      <div className="text">{props.task.description}</div>
    </li>
  );
}

export default TodoCard;
