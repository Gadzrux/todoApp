import { useEffect, useState } from "react";
import "./App.css";
import Createtodo from "./components/Createtodo";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/todos").then(async (res) => {
      const todoData = await res.json();
      setTodos(todoData);
    });
  }, [todos]);

  return (
    <>
      <Createtodo />
      <br />
      <Todos todos={todos} />
    </>
  );
}
export default App;
