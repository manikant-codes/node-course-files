import React, { useEffect, useState } from "react";
import CommonListItem from "./CommonListItem";
import { Alert, Box, CircularProgress } from "@mui/material";

function CommonList({
  getAllData,
  deleteData,
  entity,
  fields,
  renderImage,
  renderSubtitle,
}) {
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

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <ul className="flex flex-col [&>li]:border-b [&>li]:border-b-gray-300 [&>li:last-child]:border-b-0">
        {data.map((item) => {
          return (
            <CommonListItem
              key={item._id}
              item={item}
              handleDelete={handleDelete}
              link={`/admin/${entity}/${item._id}`}
              fields={fields}
              renderSubtitle={renderSubtitle}
              renderImage={renderImage}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default CommonList;
