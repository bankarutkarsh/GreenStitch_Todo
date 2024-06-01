import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "./TodoCard";
import { setForm, setActiveCard, moveTask } from "../redux/todo.slice";
import FormModal from "./FormModal";
import DropArea from "./DropArea";

function Container() {
  const dispatch = useDispatch();
  const { form, pending, progress, completed } = useSelector((state) => state.todoapp);
  const { activeCard } = useSelector((state) => state.todoapp);

  const onDrop = (e, status) => {
    const task = JSON.parse(e.dataTransfer.getData("task"));
    if (task) {
      dispatch(moveTask({ task, status, targetIndex: Number(e.target.dataset.index) }));
      dispatch(setActiveCard(null));
    }
  };

  return (
    <>
      <div id="p1" className="mdl-progress mdl-js-progress" />
      <div className="kanban__title">
        <h1>To do list</h1>
        <button onClick={() => dispatch(setForm(true))}>Add New Todo</button>
      </div>
      <div className="dd">
        <ol className="kanban To-do" onDrop={(e) => onDrop(e, "pending")} onDragOver={(e) => e.preventDefault()}>
          <h2>Pending</h2>
          {pending.map((item, index) => (
            <React.Fragment key={item.id}>
              <DropArea index={index} status="pending" onDrop={(e) => onDrop(e, "pending")} />
              <TodoCard button={'pending'} task={item} />
            </React.Fragment>
          ))}
          <DropArea index={pending.length} status="pending" onDrop={(e) => onDrop(e, "pending")} />
        </ol>
        <ol className="kanban progress" onDrop={(e) => onDrop(e, "progress")} onDragOver={(e) => e.preventDefault()}>
          <h2>In progress</h2>
          {progress.map((item, index) => (
            <React.Fragment key={item.id}>
              <DropArea index={index} status="progress" onDrop={(e) => onDrop(e, "progress")} />
              <TodoCard button={'progress'} task={item} />
            </React.Fragment>
          ))}
          <DropArea index={progress.length} status="progress" onDrop={(e) => onDrop(e, "progress")} />
        </ol>
        <ol className="kanban Done" onDrop={(e) => onDrop(e, "completed")} onDragOver={(e) => e.preventDefault()}>
          <h2>Completed</h2>
          {completed.map((item, index) => (
            <React.Fragment key={item.id}>
              <DropArea index={index} status="completed" onDrop={(e) => onDrop(e, "completed")} />
              <TodoCard button={'completed'} task={item} />
            </React.Fragment>
          ))}
          <DropArea index={completed.length} status="completed" onDrop={(e) => onDrop(e, "completed")} />
        </ol>
      </div>
      {form && <FormModal />}
    </>
  );
}

export default Container;
