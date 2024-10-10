import Paper from "@mui/material/Paper";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function SubCategoryCard({ subCategory }) {
  const navigate = useNavigate();

  function goToListPage() {
    navigate(`${subCategory.slug}`);
  }

  return (
    <Paper
      onClick={goToListPage}
      variant="outlined"
      className="!rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="h-[250px] overflow-hidden">
        <img
          src={subCategory.image}
          alt={subCategory.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-2">
        <h3>{subCategory.name}</h3>
      </div>
    </Paper>
  );
}

export default SubCategoryCard;
