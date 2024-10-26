import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFilter,
  getFilter,
  updateFilter
} from "../../../services/apiServices";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

function AddUpdateFilterForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const navigate = useNavigate();
  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          options: [{ key: "", value: "" }]
        }
      : null
  );

  useEffect(() => {
    if (!isAdd) {
      getFilter(id).then((result) => {
        setFormState(result.data);
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
      slug:
        name === "name"
          ? value.toLowerCase().replace(/\s+/g, "-")
          : formState.slug
    });
  };

  const handleOptionChange = (index, e) => {
    const { name, value } = e.target;
    const newOptions = formState.options.map((option, i) =>
      i === index ? { ...option, [name]: value } : option
    );
    setFormState({
      ...formState,
      options: newOptions
    });
  };

  const addOption = () => {
    setFormState({
      ...formState,
      options: [...formState.options, { key: "", value: "" }]
    });
  };

  const removeOption = (index) => {
    const newOptions = formState.options.filter((_, i) => i !== index);
    setFormState({
      ...formState,
      options: newOptions
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (isAdd) {
        await addFilter(formState, true);
      } else {
        await updateFilter(formState._id, formState, true);
      }
      //   navigate("/admin/filters");
    } catch (error) {
      alert(error.message);
    }
  }

  if (!formState) return null;

  return (
    <div>
      <AdminPageTitle text={(isAdd ? "Add" : "Update") + " Filter"} />
      <Paper className="p-4 mt-8 flex flex-col gap-4" variant="outlined">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <TextField
              label="Name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Slug"
              name="slug"
              value={formState.slug}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              disabled
            />
          </div>
          <div className="flex items-center justify-between mt-4 mb-4">
            <Typography variant="h6" gutterBottom>
              Options
            </Typography>
            <Button
              onClick={addOption}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Option
            </Button>
          </div>
          {formState.options.map((option, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px"
              }}
            >
              <TextField
                label="Key"
                name="key"
                value={option.key}
                onChange={(e) => handleOptionChange(index, e)}
                required
                className="grow-[1]"
              />
              <TextField
                label="Value"
                name="value"
                value={option.value}
                onChange={(e) => handleOptionChange(index, e)}
                required
                className="grow-[1]"
              />
              <IconButton color="error" onClick={() => removeOption(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="!mt-4"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default AddUpdateFilterForm;
