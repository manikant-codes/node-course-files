import { Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { minHeight } from "../../consts/consts";
import { setUser } from "../../redux/slices/userSlice";
import { signIn } from "../../services/apiServices";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goToSignUp() {
    navigate("/signup");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const result = await signIn(formData);

      console.log(result);

      if (result.token) {
        localStorage.setItem("token", result.token);
        const user = jwtDecode(result.token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
        navigate("/");
        toast("Logged-In Successfully!", { type: "success" });
      } else {
        toast(result.msg, { type: "error" });
      }
    } catch (error) {
      toast("Failed to Log-In! Error: ", error.message, { type: "error" });
    }
  }

  return (
    <div className={`p-8 ${minHeight} flex items-center justify-center`}>
      <Paper
        component={"form"}
        onSubmit={handleSubmit}
        variant="outlined"
        className="p-4 min-w-[300px] max-w-[500px]"
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
    </div>
  );
}

export default SignIn;
