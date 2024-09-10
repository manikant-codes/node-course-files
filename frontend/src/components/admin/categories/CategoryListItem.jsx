import { Delete, Edit } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function CategoryListItem({ category, handleDelete, link }) {
  return (
    <li className="flex items-center gap-4 py-4">
      <Avatar
        alt="Remy Sharp"
        src={category.image}
        sx={{
          height: { xs: "2rem", md: "3rem" },
          width: { xs: "2rem", md: "3rem" },
        }}
      />
      <div className="flex-grow-[1]">
        <Typography>{category.name}</Typography>
      </div>
      <div>
        <IconButton
          LinkComponent={Link}
          to={link}
          color="secondary"
          aria-label="add an alarm"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => {
            handleDelete(category._id);
          }}
          color="error"
          aria-label="add an alarm"
        >
          <Delete />
        </IconButton>
      </div>
    </li>
  );
}

export default CategoryListItem;
