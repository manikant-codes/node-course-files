import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileUpload from "../../../components/admin/common/MyFileUpload";
import TransferList from "../../../components/admin/common/TransferList";
import {
  getAllCategories,
  getAllSubCategories,
} from "../../../services/apiServices";

function renderList(list) {
  console.log("list", list);
  return (
    <div className="flex flex-col">
      {list.map((value) => {
        return <FormControlLabel control={<Checkbox />} label={value.name} />;
      })}
    </div>
  );
}

function AddUpdatePageForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const navigate = useNavigate();

  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          title: "",
          subCategories: [],
          images: [],
        }
      : null
  );

  const [imagesURL, setImagesURL] = useState([]);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);

  useEffect(() => {
    getAllCategories()
      .then((result) => {
        setCategories(
          result.data.map((value) => {
            return { value: value._id, name: value.name };
          })
        );
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
    getAllSubCategories()
      .then((result) => {
        const { data } = result;
        const temp = data.map((value) => {
          return {
            value: value._id,
            name: value.name,
            category: value.categoryId._id,
          };
        });
        setSubCategories(temp);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }, []);

  console.log("subCategories", subCategories);

  function handleImagesUpload(e) {
    const tempURLs = [];
    for (const file of e.target.files) {
      tempURLs.push(URL.createObjectURL(file));
    }
    setImagesURL([...imagesURL, ...tempURLs]);
    setFormState({
      ...formState,
      images: [...formState.images, ...Array.from(e.target.files)],
    });
  }

  function handleImagesRemove(index) {
    const newImagesURL = [...imagesURL];
    newImagesURL.splice(index, 1);
    const newImages = [...formState.images];
    newImages.splice(index, 1);

    setImagesURL(newImagesURL);
    setFormState({
      ...formState,
      images: newImages,
    });
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
    const formData = new FormData();
    for (const key in formState) {
      if (Array.isArray(formState[key])) {
        for (const value of formState[key]) {
          formData.append(key, value);
        }
      } else {
        formData.append(key, formState[key]);
      }
    }
    console.log(Array.from(formData.entries()));
    try {
      //   if (isAdd) {
      //     await addProduct(formData);
      //     alert("Product added!");
      //     navigate("/admin/products");
      //   } else {
      //     await updateProduct(id, formData);
      //     alert("Product updated!");
      //     navigate("/admin/products");
      //   }
    } catch (error) {
      alert(error.message);
    }
  }

  if (!formState || !categories || !setCategories) return null;

  return (
    <div>
      <AdminPageTitle text={(isAdd ? "Add" : "Update") + " Page"} />
      <Paper
        component={"form"}
        className="p-4 mt-8 gap-4 grid grid-cols-1"
        variant="outlined"
        onSubmit={handleSubmit}
      >
        <MyFileUpload
          imagesURL={imagesURL}
          setImagesURL={setImagesURL}
          formState={formState}
          setFormState={setFormState}
        />

        {/* Remaining Form Fields */}
        <Paper
          variant="outlined"
          className="flex flex-col gap-4 overflow-hidden w-full p-4"
        >
          <div className="grid grid-cols-2 gap-4">
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
                {categories?.map((category) => {
                  return (
                    <MenuItem key={category.value} value={category.value}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="slug"
              label="Product Slug"
              variant="outlined"
              name="slug"
              value={formState.slug}
            />
          </div>
          <TextField
            id="title"
            label="Section Title"
            name="title"
            variant="outlined"
            onChange={handleChange}
            value={formState.title}
          />
          {/* <div className="grid grid-cols-2 gap-4">
            <FormControl fullWidth>
              <InputLabel id="subCategory-label">Sub Category</InputLabel>
              <Select
                disabled={!formState.category}
                labelId="subCategory-label"
                id="subCategory"
                label="Sub Category"
                name="subCategory"
                value={formState.subCategory}
                onChange={handleChange}
              >
                {subCategories
                  ?.filter((subCategory) => {
                    return subCategory.category === formState.category;
                  })
                  .map((subCategory) => {
                    return (
                      <MenuItem
                        key={subCategory.value}
                        value={subCategory.value}
                      >
                        {subCategory.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div> */}
          <TransferList
            listLeft={subCategories}
            listRight={formState.subCategories}
            renderList={renderList}
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Paper>
      </Paper>
    </div>
  );
}

export default AddUpdatePageForm;
