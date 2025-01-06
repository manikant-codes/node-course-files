import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import CommonListItem from "./CommonListItem";
import MessageBox from "./MessageBox";
import { toast } from "react-toastify";

function CommonList({ getData, deleteData, getFieldValues }) {
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
    try {
      const isSure = confirm("Are you sure you want to delete this?");
      if (!isSure) return;
      const result = await deleteData(id);
      if (!result.success) {
        toast(result.msg, { type: "error" });
        return;
      }

      toast("Data deleted successfully.", { type: "success" });
      handleFetch();
    } catch (error) {
      toast("Failed to delete data.", { type: "error" });
    }
  }

  if (loading) {
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );
  }

  if (error) {
    return (
      <MessageBox
        icon={HiExclamation}
        message="Failed to fetch data."
        status="error"
      />
    );
  }

  function renderList() {
    if (data.length > 0) {
      return (
        <ul className="bg-cyan-50 border border-cyan-200 p-4 rounded-xl">
          {data.map((entity, index) => {
            const { image, title, desc } = getFieldValues(entity);
            return (
              <CommonListItem
                key={index}
                id={entity._id}
                image={image}
                title={title}
                desc={desc}
                entity={entity}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                index={index}
                length={data.length}
              />
            );
          })}
        </ul>
      );
    } else {
      return <MessageBox icon={HiArchiveBoxXMark} message="No data to show." />;
    }
  }

  return <>{renderList()}</>;
}

export default CommonList;
