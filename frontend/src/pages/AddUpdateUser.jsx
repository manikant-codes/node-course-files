import React, { useEffect, useState } from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, getSingleUser, updateUser } from "../services/apiServices";

const departments = ["sale", "admin", "worker", "hr", "account"];

function AddUpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Add ka case hai ya nahi wo store kar rahe hai.
  const isAdd = id === "add";

  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          department: "sale",
        }
      : null
  );

  useEffect(() => {
    if (!isAdd) {
      getSingleUser(id).then((data) => {
        console.log("data", data);
        setFormState(data.data);
      });
    }
  }, []);

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isAdd) {
      addUser(formState).then((data) => {
        alert("User Added!");
        navigate("/");
      });
    } else {
      updateUser(id, formState).then((data) => {
        alert("User Updated!");
        navigate("/");
      });
    }
  }

  if (!formState) return null;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <TextInput
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="department">Department</Label>
        <Select
          id="department"
          name="department"
          value={formState.department}
          onChange={handleChange}
        >
          {departments.map((value, index) => {
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
        </Select>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default AddUpdateUser;
