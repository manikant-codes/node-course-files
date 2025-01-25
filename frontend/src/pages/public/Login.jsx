import React from "react";
import MyTextInput from "../../components/admin/common/form/MyTextInput";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/apiServices";

function Login() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    try {
      const result = await login(formData);

      if (!result.success) {
        alert(result.msg);
        return;
      }

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      alert("Logged in successfully.");
      navigate("/");
    } catch (error) {
      console.log(first);
    }
  }

  return (
    <div className="p-8">
      <div className="border border-gray-300 rounded-lg p-8 max-w-[400px] m-auto">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <MyTextInput name="email" type="email" label="Email" />
          <MyTextInput name="password" type="password" label="Password" />
          <Button type="submit" className="mt-4">
            Submit
          </Button>
          <p className="text-center">OR</p>
          <Link className="text-center" to="/register">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
