import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const TitleTypography = styled(Typography)(({ theme }) => {
  return {
    fontSize: "1.75rem",
    color: theme.palette.text.main,
  };
});

function AdminPageTitle({ text }) {
  return <TitleTypography variant="h2">{text}</TitleTypography>;
}

export default AdminPageTitle;
