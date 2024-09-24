import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function CategoriesListItem({ category, handleDelete, handleEdit }) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div>
        <Avatar alt={category.name} src={category.image} />
      </div>
      <div className="grow-[1]">
        <Typography>{category.name}</Typography>
      </div>
      <div>
        <IconButton
          onClick={() => {
            handleEdit(category._id);
          }}
          aria-label="delete"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            handleDelete(category._id);
          }}
          aria-label="delete"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default CategoriesListItem;
