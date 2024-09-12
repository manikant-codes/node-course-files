import { Delete, Edit } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function CommonListItem({ item, handleDelete, link, fields, renderSubtitle }) {
  return (
    <div>
      <li className="flex items-center gap-4 py-4">
        <Avatar
          alt={item[fields.title]}
          src={item[fields.image]}
          sx={{
            height: { xs: "2rem", md: "3rem" },
            width: { xs: "2rem", md: "3rem" }
          }}
        />
        <div className="flex-grow-[1]">
          <Typography>{item[fields.title]}</Typography>
          {(renderSubtitle || fields.subTitle) && (
            <Typography color="textSecondary">
              {renderSubtitle ? renderSubtitle(item) : item[fields.subTitle]}
            </Typography>
          )}
        </div>
        <div>
          <IconButton LinkComponent={Link} to={link} color="secondary">
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDelete(item._id);
            }}
            color="error"
          >
            <Delete />
          </IconButton>
        </div>
      </li>
    </div>
  );
}

export default CommonListItem;
