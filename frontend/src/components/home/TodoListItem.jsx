import { Button } from "flowbite-react";
import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

function TodoListItem({ todo }) {
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
        <Button pill>
          <HiPencil />
        </Button>
        <Button pill color="failure">
          <HiTrash />
        </Button>
      </div>
    </li>
  );
}

export default TodoListItem;
