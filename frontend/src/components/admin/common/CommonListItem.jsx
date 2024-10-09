import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function CommonListItem({
  item,
  fields,
  showSubTitle,
  showImage,
  handleEdit,
  handleDelete
}) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div>
        <Avatar
          alt={item[fields.title]}
          src={showImage ? showImage(item) : item[fields.image]}
        />
      </div>
      <div className="grow-[1]">
        <Typography>{item[fields.title]}</Typography>
        {(fields.subTitle || showSubTitle) && (
          <Typography variant="body2" color="textDisabled">
            {showSubTitle ? showSubTitle(item) : item[fields.subTitle]}
          </Typography>
        )}
      </div>
      <div>
        <IconButton
          onClick={() => {
            handleEdit(item._id);
          }}
          aria-label="delete"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            handleDelete(item._id);
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

export default CommonListItem;
