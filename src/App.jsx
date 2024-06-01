import { useEffect } from "react";
import "./App.css";
import Container from "./components/Container";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCompleted, setPending, setProgress } from "./redux/todo.slice";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    async function fetchData(){
      const pendingList = await axios.get('http://localhost:3004/pending');
      const progressList = await axios.get('http://localhost:3004/progress');
      const completedList = await axios.get('http://localhost:3004/completed');

      dispatch(setPending(pendingList.data));
      dispatch(setProgress(progressList.data));
      dispatch(setCompleted(completedList.data));

    }
    fetchData();
  },[dispatch])

  return (
    <Container />
  );
}

export default App;
