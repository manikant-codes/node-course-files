import React, { useEffect, useState } from "react";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Paper, TextField } from "@mui/material";
import MyFileUpload from "../../../components/common/MyFileUpload";
import SendIcon from "@mui/icons-material/Send";
import {
  addSubCategory,
  getAllCategories,
  getSubCategory,
  updateSubCategory,
} from "../../../services/apiServices";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AddUpdateSubCategory() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [imageURL, setImageURL] = useState("");
  const [formState, setFormState] = useState(
    isAdd
      ? {
          image: null,
          name: "",
          slug: "",
          category: "",
        }
      : null
  );
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdd) {
      getSubCategory(id).then((data) => {
        if (!isAdd) {
          setFormState(data.data);
          setImageURL(data.data.image);
        }
      });
    }
  }, []);

  useEffect(() => {
    getAllCategories().then((data) => {
      const temp = data.data.map((value) => {
        return { name: value.name, id: value._id };
      });
      setCategories(temp);
    });
  }, []);

  function handleFileUpload(e) {
    setImageURL(URL.createObjectURL(e.target.files[0]));
    setFormState({ ...formState, image: e.target.files[0] });
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      if (isAdd) {
        await addSubCategory(formData);
      } else {
        if (typeof formState.image === "string") {
          formData.append("image", formState.image);
        }
        await updateSubCategory(id, formData);
      }
      navigate("/admin/subCategories");
    } catch (error) {
      console.log(error.message);
    }
  }

  if (!formState) return null;

  return (
    <div>
      <TitleAdmin title={(isAdd ? "Add" : "Update") + " Sub-Category"} />
      <Paper
        variant="outlined"
        component={"form"}
        className="mt-8 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <Paper variant="outlined" className="h-[350px] overflow-hidden">
            <img src={imageURL} alt="" className="object-cover w-full h-full" />
          </Paper>
          <MyFileUpload
            onChange={handleFileUpload}
            btnTxt="Upload Category Image"
            name="image"
          />
        </div>
        <div className="flex flex-col gap-2">
          <TextField
            id="name"
            label="Name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="slug"
            label="Slug"
            name="slug"
            value={formState.slug}
            variant="outlined"
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              label="Category"
              name="category"
              value={formState.category}
              onChange={handleChange}
            >
              {categories.map((value) => {
                return <MenuItem value={value.id}>{value.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default AddUpdateSubCategory;
