import React, { useEffect, useState } from "react";
import CommonListItem from "./CommonListItem";
import { Spinner } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function CommonList({ getData, deleteData }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleFetch() {
    getData()
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleEdit(id) {
    navigate(id);
  }

  async function handleDelete(id) {
    const isSure = confirm("Are you sure you want to delete this?");
    if (!isSure) return;
    await deleteData(id);
    handleFetch();
  }

  useEffect(() => {
    handleFetch();
  }, []);

  if (loading)
    return (
      <div className="w-full flex items-center">
        <div className="flex items-center bg-gray-100 dark:text-gray-200 rounded-lg w-full p-4">
          <Spinner aria-label="Default status example" />
          <p className="ml-3">Loading...</p>
        </div>
      </div>
    );

  if (error) {
    return (
      <div className="w-full flex items-center">
        <div className="flex items-center bg-red-100 dark:text-red-200 rounded-lg w-full p-4">
          <HiExclamation className="text-red-500 dark:bg-red-800 h-6 w-6" />
          <div className="ml-3 font-normal">Failed to fetch data.</div>
        </div>
      </div>
    );
  }

  return (
    <ul className="bg-cyan-50 border border-cyan-200 p-4 rounded-xl">
      {data.map((entity, index) => {
        return (
          <>
            <CommonListItem
              entity={entity}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            {index < data.length - 1 && (
              <hr className="border-b border-b-cyan-100 outline-0" />
            )}
          </>
        );
      })}
    </ul>
  );
}

export default CommonList;
