import { Button } from "flowbite-react";
import React from "react";
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";

function MyCommonListItem({
  id,
  image,
  title,
  subTitle,
  handleDelete,
  handleEdit,
  index,
  length
}) {
  return (
    <>
      <li className="flex items-center py-2 gap-4">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={image}
          alt=""
        />
        <div className="grow-[1]">
          <h3 className="text-gray-900">{title}</h3>
          <p className="text-gray-500">{subTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              handleEdit(id);
            }}
            size="xs"
            color="primary"
          >
            <HiMiniPencilSquare className="h-4 w-4" />
          </Button>
          <Button
            size="xs"
            color="failure"
            onClick={() => {
              handleDelete(id);
            }}
          >
            <HiMiniTrash className="h-4 w-4" />
          </Button>
        </div>
      </li>
      {index < length - 1 && <hr className="border-b border-b-violet-300" />}
    </>
  );
}

export default MyCommonListItem;
