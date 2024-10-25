import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { minHeight } from "../../consts/consts";
import { signUp } from "../../services/apiServices";

function SignUp() {
  const navigate = useNavigate();

  function goToSignIn() {
    navigate("/signin");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Check kar rahe hai ke password aur confirmPassword same hai ya nahi.
    if (e.target["password"].value !== e.target["confirmPassword"].value) {
      alert("Passwords must match!");
      return;
    }

    const formData = new FormData(e.target);

    const result = await signUp(formData);

    if (result.success) {
      toast("Signed-up successfully!", { type: "success" });
      navigate("/requestVerification");
    } else {
      toast(result.msg, { type: "error" });
    }
  }

  return (
    <div className={`p-8 ${minHeight} flex items-center justify-center`}>
      <Paper
        component={"form"}
        variant="outlined"
        className="p-4 max-w-[500px] mx-auto"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl mb-4">SignUp</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <TextField id="fname" name="fname" label="First Name" />
            <TextField id="lname" name="lname" label="Last Name" />
          </div>
          <TextField id="email" name="email" label="Email" />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <div className="flex flex-col gap-1">
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
            <p className="text-center">or</p>
            <Button onClick={goToSignIn} variant="outlined">
              Log In
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default SignUp;
