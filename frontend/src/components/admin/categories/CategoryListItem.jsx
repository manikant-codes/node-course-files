import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { Delete, Edit, EditNote } from "@mui/icons-material";
import React from "react";

function CategoryListItem({ category }) {
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
        <IconButton color="secondary" aria-label="add an alarm">
          <Edit />
        </IconButton>
        <IconButton color="error" aria-label="add an alarm">
          <Delete />
        </IconButton>
      </div>
    </li>
  );
}

export default CategoryListItem;
