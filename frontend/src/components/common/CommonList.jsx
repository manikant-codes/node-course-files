import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import CommonListItem from "./CommonListItem";
import MessageBox from "./MessageBox";

function CommonList({ getData, deleteData }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleFetch();
  }, []);

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

  if (loading)
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );

  if (error) {
    return (
      <MessageBox
        icon={HiExclamation}
        message="Failed to fetch data."
        status="error"
      />
    );
  }

  return (
    <ul className="bg-cyan-50 border border-cyan-200 p-4 rounded-xl">
      {data.length > 0 ? (
        data.map((entity, index) => {
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
        })
      ) : (
        <MessageBox icon={HiArchiveBoxXMark} message="No data to show." />
      )}
    </ul>
  );
}

export default CommonList;
