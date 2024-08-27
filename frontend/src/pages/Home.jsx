import React from "react";
import TodoListItem from "../components/home/TodoListItem";

function Home() {
  return (
    <div>
      <ul className="flex flex-col [&>li]:border-b [&>li]:border-b-gray-300 [&>li:last-child]:border-b-0 ">
        <TodoListItem />
        <TodoListItem />
        <TodoListItem />
        <TodoListItem />
      </ul>
    </div>
  );
}

export default Home;
