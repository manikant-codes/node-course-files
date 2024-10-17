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
import MultiSelect from "../../../components/admin/common/MultiSelect";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import {
  addPage,
  getAllCategories,
  getAllSubCategories,
  getPage,
  updatePage
} from "../../../services/apiServices";

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
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  // Fix This
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const navigate = useNavigate();

  console.log("formState", formState);
  console.log("selectedSubCategories", selectedSubCategories);

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
      const modifiedCategories = data.data.map((value) => {
        return { id: value._id, name: value.name };
      });
      setCategories(modifiedCategories);
    });
  }, []);

  useEffect(() => {
    if (formState?.name) {
      getAllSubCategories(selectedCategoryId).then((data) => {
        const temp = [];
        const selectedSubCategoriesTemp = [];

        for (const subCategory of data.data) {
          if (subCategory.category.slug === formState.slug) {
            temp.push({ name: subCategory.name, id: subCategory._id });
          }

          if (formState.subCategories.includes(subCategory._id)) {
            selectedSubCategoriesTemp.push({
              id: subCategory._id,
              name: subCategory.name
            });
          }
        }

        setSubCategories(temp);
        setSelectedSubCategories(selectedSubCategoriesTemp);
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

  if (!formState) return null;
  if (!isAdd && !selectedSubCategories) return null;

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
              onChange={(e) => {
                handleChange(e);
                // console.log("categories", categories);
                // console.log("e.target.value", e.target.value);
                const foundCategory = categories.find((category) => {
                  return category.name === e.target.value;
                });
                // console.log("foundCategory", foundCategory);
                setSelectedCategoryId(foundCategory.id);
              }}
            >
              {categories.map((value) => {
                return (
                  <MenuItem key={value.id} value={value.name}>
                    {value.name}
                  </MenuItem>
                );
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
          <MultiSelect
            options={subCategories}
            formState={formState}
            setFormState={setFormState}
            label="Sub-Categories"
            fieldName="subCategories"
            selected={selectedSubCategories}
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
