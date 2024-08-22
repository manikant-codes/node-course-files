import React from "react";
import { useNavigate } from "react-router-dom";

function UserListItem({ user, handleDelete }) {
  const navigate = useNavigate();

  function goToUpdate() {
    navigate(`/user/${user._id}`);
  }

  return (
    <div className="flex items-center bg-gray-200 p-2 rounded-md">
      <div className="flex grow-[1] flex-col">
        <p className="flex items-center gap-2">
          <span>{user.name}</span>
        </p>
        <p>Department: {user.department}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={goToUpdate}
          className="bg-purple-500 hover:bg-purple-700 px-3 text-white py-1 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleDelete(user._id);
          }}
          className="bg-red-500 hover:bg-red-700 px-3 text-white py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserListItem;
