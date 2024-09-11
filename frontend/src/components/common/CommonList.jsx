import React, { useEffect, useState } from "react";
import CommonListItem from "./CommonListItem";

function CommonList({ getAllData, deleteData, entity, fields }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function fetchData() {
    try {
      const result = await getAllData();
      setData(result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    const userInput = window.confirm("Are your sure you want to delete this?");
    try {
      if (userInput) {
        await deleteData(id);
        alert("Deleted successfully!");
        fetchData();
      }
    } catch (error) {
      alert(`Failed to delete. Error: ${error.message}`);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul className="flex flex-col [&>li]:border-b [&>li]:border-b-gray-300 [&>li:last-child]:border-b-0">
        {data.map((item) => {
          return (
            <CommonListItem
              key={data._id}
              item={item}
              handleDelete={handleDelete}
              link={`/admin/${entity}/${data._id}`}
              fields={fields}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default CommonList;
