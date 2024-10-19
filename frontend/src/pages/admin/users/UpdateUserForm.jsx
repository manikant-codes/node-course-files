import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../services/apiServices";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";

function UpdateUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState(null);

  useEffect(() => {
    getUser(id)
      .then((data) => {
        setFormState(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChange(e) {}

  function handleSubmit(e) {}

  if (!formState) return null;

  return (
    <>
      <AdminPageTitle text={"Update User"} />
      <Paper
        className="p-4 mt-8 gap-4 grid grid-cols-1 md:grid-cols-[300px_1fr]"
        variant="outlined"
      >
        <Paper variant="outlined" className="overflow-hidden w-full h-[300px]">
          <img
            src={formState.avatar}
            alt=""
            className="w-full h-full object-contain"
          />
        </Paper>

        <Paper variant="outlined" className="overflow-hidden w-full p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              id="fname"
              name="fname"
              label="First Name"
              variant="outlined"
              value={formState.fname}
              disabled
            />
            <TextField
              id="lname"
              name="lname"
              label="Last Name"
              variant="outlined"
              value={formState.lname}
              disabled
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formState.email}
              disabled
            />
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                id="role"
                name="role"
                variant="outlined"
                label="Role"
                value={formState.role}
                disabled
              >
                {["user", "admin"].map((role) => {
                  return <MenuItem value={role}>{role}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox name="isVerified" onChange={handleChange} />}
              label="Is Verified"
            />
          </form>
        </Paper>
      </Paper>
    </>
  );
}

export default UpdateUserForm;
