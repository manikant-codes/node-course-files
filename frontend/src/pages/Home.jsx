import React, { useEffect, useState } from "react";
import TodoListItem from "../components/home/TodoListItem";
import { getAllTodos } from "../services/apiServices";

function Home() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllTodos()
      .then((result) => {
        setTodos(result.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <ul className="flex flex-col [&>li]:border-b [&>li]:border-b-gray-300 [&>li:last-child]:border-b-0 ">
        {todos.map((todo) => {
          return <TodoListItem key={todo._id} todo={todo} />;
        })}
      </ul>
    </div>
  );
}

export default Home;
