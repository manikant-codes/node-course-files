import { Button, Paper, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCategory,
  getCategory,
  updateCategory,
} from "../../../services/apiServices";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddUpdateCategoryForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const navigate = useNavigate();
  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          image: null,
        }
      : null
  );
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (!isAdd) {
      getCategory(id).then((data) => {
        console.log("data", data);
        setFormState(data.data);
        setImageURL(data.data.image);
      });
    }
  }, []);

  function handleNameChange(e) {
    setFormState({
      ...formState,
      name: e.target.value,
      slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
    });
  }

  function handleImageChange(e) {
    setFormState({ ...formState, image: e.target.files[0] });
    const url = URL.createObjectURL(e.target.files[0]);
    setImageURL(url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formState", formState);

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("image", formState.image);

    try {
      if (isAdd) {
        await addCategory(formData);
      } else {
        await updateCategory(formState._id, formData);
      }
      navigate("/admin/categories");
    } catch (error) {
      alert(error.message);
    }
  }

  if (!formState) return null;

  return (
    <div>
      <AdminPageTitle text={(isAdd ? "Add" : "Update") + " Category"} />
      <Paper
        className="p-4 mt-8 gap-4 grid grid-cols-1 md:grid-cols-2"
        variant="outlined"
      >
        <Paper variant="outlined" className="overflow-hidden w-full h-[300px]">
          <img src={imageURL} alt="" className="w-full h-full object-contain" />
        </Paper>
        <Paper variant="outlined" className="overflow-hidden w-full p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Category Name"
              variant="outlined"
              name="name"
              value={formState.name}
              onChange={handleNameChange}
            />
            <TextField
              id="slug"
              disabled
              label="Category Slug"
              variant="outlined"
              name="slug"
              value={formState.slug}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Category Image
              <VisuallyHiddenInput
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Button>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </form>
        </Paper>
      </Paper>
    </div>
  );
}

export default AddUpdateCategoryForm;
