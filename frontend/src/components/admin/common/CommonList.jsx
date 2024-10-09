import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonListItem from "./CommonListItem";

function CommonList({
  getAllData,
  deleteData,
  partOfURL,
  fields,
  showSubTitle,
  showImage
}) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function fetchAllData() {
    try {
      const data = await getAllData();
      setData(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  async function handleDelete(id) {
    const userChoice = window.confirm("Are you sure you want to delete this?");
    try {
      if (userChoice) {
        await deleteData(id);
        fetchAllData();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleEdit(id) {
    navigate(`/admin/${partOfURL}/${id}`);
  }

  return (
    <div className="mt-8">
      {data.map((item) => {
        return (
          <CommonListItem
            key={item._id}
            item={item}
            fields={fields}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showSubTitle={showSubTitle}
            showImage={showImage}
          />
        );
      })}
    </div>
  );
}

export default CommonList;
