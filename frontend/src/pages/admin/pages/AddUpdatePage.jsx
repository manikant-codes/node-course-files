import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MultipleFileUpload from "../../../components/admin/common/MultipleFileUpload";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import {
  addPage,
  getAllCategories,
  getAllSubCategories,
  getPage,
  updatePage
} from "../../../services/apiServices";
import MultiSelect from "../../../components/admin/common/MultiSelect";

function AddUpdatePage() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          images: [],
          subCategories: []
        }
      : null
  );
  const [imagesURL, setImagesURL] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdd) {
      getPage(id).then((data) => {
        setFormState(data.data);
        setImagesURL(data.data.images);
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

  useEffect(() => {
    if (formState?.name) {
      getAllSubCategories().then((data) => {
        const temp = [];
        for (const subCategory of data.data) {
          if (subCategory.category.slug === formState.slug) {
            temp.push({ name: subCategory.name, id: subCategory._id });
          }
        }

        setSubCategories(temp);
      });
    }
  }, [formState?.name]);

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-")
      });
    } else {
      // May need to change this.
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (const key in formState) {
      if (key === "images") {
        for (const value of formState.images) {
          formData.append("images", value);
        }
      } else if (key === "subCategories") {
        for (const value of formState.subCategories) {
          formData.append("subCategories", value.id);
        }
      } else {
        formData.append(key, formState[key]);
      }
    }

    console.log(Array.from(formData.entries()));
    console.log(addPage);

    try {
      if (isAdd) {
        await addPage(formData);
      } else {
        await updatePage(id, formData);
      }
      navigate("/admin/pages");
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log("formState", formState);

  if (!formState) return null;

  return (
    <div>
      <TitleAdmin title={(isAdd ? "Add" : "Update") + " Page"} />
      <Paper
        variant="outlined"
        component={"form"}
        className="mt-8 p-4 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <MultipleFileUpload
          imagesURL={imagesURL}
          setImagesURL={setImagesURL}
          formState={formState}
          setFormState={setFormState}
          name="images"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormControl fullWidth>
            <InputLabel id="name-label">Name</InputLabel>
            <Select
              labelId="name-label"
              id="name"
              label="Name"
              name="name"
              value={formState.name}
              onChange={handleChange}
            >
              {categories.map((value) => {
                return <MenuItem value={value.name}>{value.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextField
            id="slug"
            label="Slug"
            name="slug"
            value={formState.slug}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* <FormControl fullWidth>
            <InputLabel id="sub-category-label">Sub-Category</InputLabel>
            <Select
              labelId="sub-category-label"
              id="subCategory"
              label="Sub-Category"
              name="subCategory"
              value={formState.subCategories}
              onChange={handleChange}
              disabled={!formState.name}
            >
              {subCategories.map((value) => {
                return <MenuItem value={value.id}>{value.name}</MenuItem>;
              })}
            </Select>
          </FormControl> */}
          <MultiSelect
            options={subCategories}
            formState={formState}
            setFormState={setFormState}
            label="Sub-Categories"
            fieldName="subCategories"
          />
        </div>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Paper>
    </div>
  );
}

export default AddUpdatePage;
