import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/apiServices";

function VerifyEmail() {
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    verifyEmail(searchParams.get("userId"), searchParams.get("token"));
  }, []);

  return (
    <div>
      <p>You email has been verified!</p>
      <Button LinkComponent={Link} to="/signin">
        Go to Login
      </Button>
    </div>
  );
}

export default VerifyEmail;
