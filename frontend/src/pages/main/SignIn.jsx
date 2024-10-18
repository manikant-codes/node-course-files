import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/apiServices";

function SignIn() {
  const navigate = useNavigate();

  function goToSignUp() {
    navigate("/signup");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const result = await signIn(formData);
      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        alert("Log-in failed!");
      }
    } catch (error) {
      console.log("Error: ", error.message);
      alert("Log-in failed!");
    }
  }

  return (
    <Paper
      component={"form"}
      onSubmit={handleSubmit}
      variant="outlined"
      className="p-4 max-w-[500px] mx-auto"
    >
      <div>
        <h2 className="text-2xl mb-4">LogIn</h2>
      </div>
      <div className="flex flex-col gap-4">
        <TextField id="email" name="email" label="Email" />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
        />
        <div className="flex flex-col gap-1">
          <Button type="submit" variant="contained">
            Log In
          </Button>
          <p className="text-center">or</p>
          <Button onClick={goToSignUp} variant="outlined">
            Sign Up
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default SignIn;
