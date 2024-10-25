import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/apiServices";

function VerifyEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    verifyEmail(searchParams.get("userId"), searchParams.get("token"))
      .then((data) => {})
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="border rounded max-w-[600px] mx-auto p-4">
        <p className="text-3xl mb-2 text-red-700">Something went wrong, :(</p>
        <p className="mb-8">
          Please try again later, if the problem persists feel free to contact
          us. We will be happy to help.
        </p>
        <Button variant="contained" LinkComponent={Link} to="/signin">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="border rounded max-w-[600px] mx-auto p-4">
      <p className="text-3xl mb-2 text-green-700">
        You email has been verified, :)
      </p>
      <p className="mb-8">Now you can login.</p>
      <Button variant="contained" LinkComponent={Link} to="/signin">
        Go to Login
      </Button>
    </div>
  );
}

export default VerifyEmail;
