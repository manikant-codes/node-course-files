import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../../consts/consts";

const FooterPaper = styled(Paper)(() => {
  return {
    borderRadius: "0px",
  };
});

function FooterAdmin() {
  return (
    <FooterPaper variant="outlined" className="flex py-4 px-8 justify-between">
      <p>
        &copy;{COMPANY_NAME} {new Date().getFullYear()}
      </p>
      <ul className="flex items-center gap-8">
        <li>
          <Link to="/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </FooterPaper>
  );
}

export default FooterAdmin;
