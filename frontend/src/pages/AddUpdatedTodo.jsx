import React from "react";
import AddUpdateTodoForm from "../components/addUpdateTodo/AddUpdateTodoForm";
import { useParams } from "react-router-dom";

function AddUpdatedTodo() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="mb-8 text-2xl font-semibold">
        {id === "add" ? "Add" : "Update"} Todo
      </h2>
      <AddUpdateTodoForm />
    </div>
  );
}

export default AddUpdatedTodo;
