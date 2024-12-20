import React from "react";

function CommonListItem({ entity }) {
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
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          $320
        </div>
      </div>
    </li>
  );
}

export default CommonListItem;
