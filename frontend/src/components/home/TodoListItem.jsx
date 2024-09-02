import { Button } from "flowbite-react";
import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { deleteTodo } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";

function TodoListItem({ todo }) {
  const navigate = useNavigate();
  async function handleDelete() {
    const userSelection = window.confirm("Are you sure?");
    if (userSelection) {
      try {
        await deleteTodo(todo._id);
        alert("Task deleted successfully!");
      } catch (error) {
        alert("Failed to delete task!");
      }
    }
  }

  function goToUpdate() {
    navigate(`/todo/${todo._id}`);
  }

  return (
    <li className="flex items-center justify-between py-4">
      <div>
        <p className="text-xl">{todo.title}</p>
        <p className="text-sm">
          Due:
          {todo.dueDate
            ? new Date(todo.dueDate).toLocaleDateString("en-in")
            : " N/A"}
        </p>
        <p className="text-sm">Priority: {todo.priority}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button pill onClick={goToUpdate}>
          <HiPencil />
        </Button>
        <Button pill color="failure" onClick={handleDelete}>
          <HiTrash />
        </Button>
      </div>
    </li>
  );
}

export default TodoListItem;
