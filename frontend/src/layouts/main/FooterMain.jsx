import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../../consts/main";

const FooterPaper = styled(Paper)(() => {
  return {
    padding: "24px 32px",
    borderRadius: "0px",
    display: "flex",
    justifyContent: "space-between",
  };
});

function FooterMain() {
  return (
    <FooterPaper variant="outlined">
      <p>
        &copy;{COMPANY_NAME} {new Date().getFullYear()}
      </p>

      <ul className="list-none flex gap-4">
        <li>
          <Link to="#">Privacy Policy</Link>
        </li>
        <li>
          <Link to="#">Contact</Link>
        </li>
      </ul>
    </FooterPaper>
  );
}

export default FooterMain;
