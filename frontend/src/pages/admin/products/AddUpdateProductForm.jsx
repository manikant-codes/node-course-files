import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  FormControl,
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
  getAllCategories,
  getAllSubCategories,
  getProduct,
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

function AddUpdateProductForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const navigate = useNavigate();
  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          desc: "",
          images: [],
          price: "",
          discountPercentage: "",
          taxPercentage: "",
          shippingFee: "",
          category: "",
          subCategory: "",
          qty: "",
        }
      : null
  );
  const [imagesURL, setImagesURL] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (!isAdd) {
      getProduct(id).then((data) => {
        setFormState(data.data);
        // setImagesURL(data.data.image);
      });
    }
  }, []);

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
        setSubCategories(
          result.data.map((value) => {
            return {
              value: value._id,
              name: value.name,
              category: value.category._id,
            };
          })
        );
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }, []);

  function handleChange(e) {}

  async function handleSubmit(e) {
    e.preventDefault();
  }

  if (!formState) return null;

  return (
    <div>
      <AdminPageTitle text={(isAdd ? "Add" : "Update") + " Product"} />
      <Paper className="p-4 mt-8 gap-4 grid grid-cols-1" variant="outlined">
        <Paper variant="outlined" className="overflow-hidden w-full h-[300px]">
          {/* <img src={imageURL} alt="" className="w-full h-full object-contain" /> */}
        </Paper>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Category Images
          <VisuallyHiddenInput
            type="file"
            multiple={true}
            name="images"
            onChange={handleChange}
          />
        </Button>
        <Paper variant="outlined" className="overflow-hidden w-full p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="name"
                label="Product Name"
                variant="outlined"
                name="name"
                value={formState.name}
                onChange={handleChange}
              />
              <TextField
                id="slug"
                disabled
                label="Product Slug"
                variant="outlined"
                name="slug"
                value={formState.slug}
              />
            </div>
            <TextField
              id="desc"
              label="Product Description"
              name="desc"
              multiline
              maxRows={4}
              variant="outlined"
              value={formState.desc}
            />
            <div className="grid grid-cols-2 gap-4">
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
                  {categories?.map((category) => {
                    return (
                      <MenuItem key={category.value} value={category.value}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="price"
                label="Product Price"
                name="price"
                variant="outlined"
                value={formState.price}
              />
              <TextField
                id="qty"
                label="Quantity"
                name="qty"
                variant="outlined"
                value={formState.qty}
                type="number"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <TextField
                id="discountPercentage"
                label="Discount Percentage"
                name="discountPercentage"
                variant="outlined"
                value={formState.discountPercentage}
                type="number"
              />
              <TextField
                id="taxPercentage"
                label="Tax Percentage"
                name="taxPercentage"
                variant="outlined"
                value={formState.taxPercentage}
                type="number"
              />
              <TextField
                id="shippingFee"
                label="Shipping Fee"
                name="shippingFee"
                variant="outlined"
                value={formState.shippingFee}
                type="number"
              />
            </div>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </form>
        </Paper>
      </Paper>
    </div>
  );
}

export default AddUpdateProductForm;
