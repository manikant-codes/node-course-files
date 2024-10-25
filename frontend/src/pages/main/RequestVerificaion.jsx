import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function RequestVerificaion() {
  return (
    <div className="border border-gray-300 rounded p-4 max-w-[600px] mx-auto">
      <p className="text-2xl text-green-700 mb-2">Signed-Up Successfully, :)</p>
      <p className="mb-8">Please check your email for the verification link!</p>
      <Button LinkComponent={Link} to="/" variant="contained">
        Back to Home
      </Button>
    </div>
  );
}

export default RequestVerificaion;
