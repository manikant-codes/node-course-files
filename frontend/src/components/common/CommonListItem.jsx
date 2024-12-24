import { Button } from "flowbite-react";
import React from "react";
import { HiTrash, HiPencil } from "react-icons/hi2";

function CommonListItem({ entity, handleEdit, handleDelete }) {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="shrink-0 border rounded-full border-gray-300 h-[32px] w-[32px] overflow-hidden">
          <img
            alt="Neil image"
            src={entity.image}
            className="rounded-full h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {entity.name}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {entity.slug}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
          <Button
            pill
            size="sm"
            onClick={() => {
              handleEdit(entity._id);
            }}
          >
            <HiPencil />
          </Button>
          <Button
            pill
            size="sm"
            color="failure"
            onClick={() => {
              handleDelete(entity._id);
            }}
          >
            <HiTrash />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CommonListItem;
