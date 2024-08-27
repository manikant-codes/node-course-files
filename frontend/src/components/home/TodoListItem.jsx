import { Button } from "flowbite-react";
import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

function TodoListItem() {
  return (
    <li className="flex items-center justify-between py-4">
      <div>
        <p className="text-xl">Titel</p>
        <p className="text-sm">Due: 2024-08-27</p>
        <p className="text-sm">Priority: A</p>
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
