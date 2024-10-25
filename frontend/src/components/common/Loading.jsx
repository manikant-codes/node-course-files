import { CircularProgress } from "@mui/material";
import React from "react";
import { height as h } from "../../consts/consts";

function Loading({ isFullPage }) {
  const height = isFullPage ? h : "h-full";
  return (
    <div className={`${height} flex items-center justify-center`}>
      <CircularProgress />
    </div>
  );
}

export default Loading;
