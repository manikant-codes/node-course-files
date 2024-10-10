import SendIcon from "@mui/icons-material/Send";
import {
  Button,
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
import MultipleFileUpload from "../../../components/admin/common/MultipleFileUpload";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import {
  addProduct,
  getAllCategories,
  getAllSubCategories,
  getProduct,
  updateProduct
} from "../../../services/apiServices";

function AddUpdateProduct() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [imagesURL, setImagesURL] = useState([]);
  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          desc: "",
          images: null,
          category: "",
          subCategory: "",
          price: "",
          deliveryCharges: "",
          discountPercentage: "",
          taxPercentage: "",
          colors: "",
          sizes: "",
          isTrending: false
        }
      : null
  );
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  console.log("imagesURL", imagesURL);
  console.log("formState", formState);

  useEffect(() => {
    if (!isAdd) {
      getProduct(id).then((data) => {
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
    getAllSubCategories().then((data) => {
      const temp = data.data.map((value) => {
        return { name: value.name, id: value._id };
      });

      setSubCategories(temp);
    });
  }, []);

  function handleChange(e) {
    console.log("asd asd", e.target.name, e.target.checked);
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-")
      });
    } else if (e.target.name === "isTrending") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.checked
      });
    } else {
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
      } else {
        formData.append(key, formState[key]);
      }
    }

    console.log(Array.from(formData.entries()));

    try {
      if (isAdd) {
        await addProduct(formData);
      } else {
        await updateProduct(id, formData);
      }
      navigate("/admin/products");
    } catch (error) {
      console.log(error.message);
    }
  }

  if (!formState) return null;

  return (
    <div>
      <TitleAdmin title={(isAdd ? "Add" : "Update") + " Product"} />
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
        </div>
        <div>
          <TextField
            id="desc"
            label="Description"
            name="desc"
            value={formState.desc}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
          <FormControl fullWidth>
            <InputLabel id="sub-category-label">Sub-Category</InputLabel>
            <Select
              labelId="sub-category-label"
              id="subCategory"
              label="Sub-Category"
              name="subCategory"
              value={formState.subCategory}
              onChange={handleChange}
            >
              {subCategories.map((value) => {
                return <MenuItem value={value.id}>{value.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <TextField
            id="price"
            label="Price"
            name="price"
            value={formState.price}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="quantity"
            label="Quantity"
            name="quantity"
            value={formState.quantity}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <TextField
            id="deliveryCharges"
            label="Delivery Charges"
            name="deliveryCharges"
            value={formState.deliveryCharges}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="discountPercentage"
            label="Discount Percentage"
            name="discountPercentage"
            value={formState.discountPercentage}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="taxPercentage"
            label="Tax Percentage"
            name="taxPercentage"
            value={formState.taxPercentage}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                name="isTrending"
                checked={formState.isTrending}
                onChange={handleChange}
              />
            }
            label="Is Trending"
          />
        </div>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Paper>
    </div>
  );
}

export default AddUpdateProduct;
