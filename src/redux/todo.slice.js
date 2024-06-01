import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
  name: 'TodoSlice',
  initialState: {
    form: false,
    pending: [],
    progress: [],
    completed: [],
    activeCard: null
  },
  reducers: {
    setForm(state, action) {
      state.form = action.payload;
    },
    setPending(state, action) {
      state.pending = action.payload;
    },
    addTodo(state, action) {
      state.pending.push(action.payload);
    },
    removeTodo(state, action) {
      let item = action.payload;
      state.pending = state.pending.filter((task) => task.id !== item.id);
    },
    toProgress(state, action) {
      state.progress.push(action.payload);
    },
    removeProgress(state, action) {
      let item = action.payload;
      state.progress = state.progress.filter((task) => task.id !== item.id);
    },
    toCompleted(state, action) {
      state.completed.push(action.payload);
    },
    setProgress(state, action) {
      state.progress = action.payload;
    },
    setCompleted(state, action) {
      state.completed = action.payload;
    },
    setActiveCard(state, action) {
      state.activeCard = action.payload;
    },
    moveTask(state, action) {
      const { task, status, targetIndex } = action.payload;
      let sourceList;
      let targetList;

      if (task.status === "pending") {
        sourceList = state.pending;
      } else if (task.status === "progress") {
        sourceList = state.progress;
      } else {
        sourceList = state.completed;
      }

      if (status === "pending") {
        targetList = state.pending;
      } else if (status === "progress") {
        targetList = state.progress;
      } else {
        targetList = state.completed;
      }

      // Remove task from source list
      const taskIndex = sourceList.findIndex(t => t.id === task.id);
      if (taskIndex > -1) {
        sourceList.splice(taskIndex, 1);
      }

      // Insert task into target list at the specified index
      targetList.splice(targetIndex, 0, { ...task, status });
    }
  }
});

export default TodoSlice;
export const {
  setForm,
  setCompleted,
  setPending,
  setProgress,
  addTodo,
  toProgress,
  removeTodo,
  removeProgress,
  toCompleted,
  setActiveCard,
  moveTask
} = TodoSlice.actions;
