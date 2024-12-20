import React, { useEffect, useState } from "react";
import CommonListItem from "./CommonListItem";
import { Spinner } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

function CommonList({ getData }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
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
    <ul>
      {data.map((entity) => {
        return <CommonListItem entity={entity} />;
      })}
    </ul>
  );
}

export default CommonList;
