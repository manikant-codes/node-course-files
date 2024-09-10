import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import {
  addSubCategory,
  getAllCategories,
  getSubCategory,
  updateSubCategory,
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

function AddUpdateSubCategoryForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          image: null,
          categoryId: "",
        }
      : null
  );
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.log("Failed to get categories!");
      });
  }, []);

  useEffect(() => {
    if (!isAdd) {
      getSubCategory(id).then((data) => {
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

  function handleCategoryChange(e) {
    setFormState({ ...formState, categoryId: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formState", formState);

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("image", formState.image);
    formData.append("categoryId", formState.categoryId);

    console.log("formData", Array.from(formData.entries()));

    try {
      if (isAdd) {
        await addSubCategory(formData);
      } else {
        await updateSubCategory(formState._id, formData);
      }
      navigate("/admin/subCategories");
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
              label="Sub-Category Name"
              variant="outlined"
              name="name"
              value={formState.name}
              onChange={handleNameChange}
            />
            <TextField
              id="slug"
              disabled
              label="Sub-Category Slug"
              variant="outlined"
              name="slug"
              value={formState.slug}
            />

            <Select
              id="category"
              name="category"
              variant="outlined"
              label="Category"
              value={formState.categoryId}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => {
                return (
                  <MenuItem value={category._id}>{category.name}</MenuItem>
                );
              })}
            </Select>
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

export default AddUpdateSubCategoryForm;
