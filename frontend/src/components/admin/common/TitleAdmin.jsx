import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function TitleAdmin({ title, btnTxt, to }) {
  return (
    <div className="flex items-center justify-between">
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      {btnTxt && (
        <Button
          startIcon={<AddIcon />}
          LinkComponent={Link}
          to={to}
          variant="contained"
        >
          {btnTxt}
        </Button>
      )}
    </div>
  );
}

export default TitleAdmin;
