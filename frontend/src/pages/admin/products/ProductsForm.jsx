import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyMultipleFileUpload from "../../../components/admin/common/form/MyMultipleFileUpload";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextarea from "../../../components/admin/common/form/MyTextarea";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import {
  addProduct,
  getAllCategories,
  getAllSubCategories
} from "../../../services/apiServices";
import MyMultiSelect from "../../../components/admin/common/form/MyMultiSelect";

const initialState = {
  name: "",
  slug: "",
  images: null,
  desc: "",
  category: "",
  subCategory: "",
  price: "",
  discountPercentage: "",
  taxPercentage: "",
  shippingFee: "",
  qty: "",
  sizes: null,
  colors: null
};

function ProductsForm() {
  const [formState, setFormState] = useState(initialState);
  const [imagesURLs, setImagesURLs] = useState([""]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const navigate = useNavigate();

  async function fetchCategories() {
    try {
      const result = await getAllCategories();
      const temp = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });
      temp.unshift({ value: "", text: "Select A Category" });
      setCategoriesOptions(temp);
    } catch (error) {
      toast("Failed to fetch categories.");
    }
  }

  async function fetchSubCategories() {
    try {
      const result = await getAllSubCategories();
      const temp = result.data.map((subCategory) => {
        return { value: subCategory._id, text: subCategory.name };
      });
      temp.unshift({ value: "", text: "Select A Sub-Category" });
      setSubCategoriesOptions(temp);
    } catch (error) {
      toast("Failed to fetch sub-categories.");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  function handleFileUpload(e) {
    const files = e.target.files;
    setFormState({ ...formState, images: files });

    const urls = [];
    for (const file of files) {
      const tempURL = URL.createObjectURL(file);
      urls.push(tempURL);
    }
    setImagesURLs(urls);
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        name: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-")
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
    console.log(formState);

    const formData = new FormData();

    for (const key in formState) {
      if (key === "images") {
        for (const image of formState[key]) {
          formData.append("images", image);
        }
      } else {
        formData.append(key, formState[key]);
      }
    }

    try {
      const result = await addProduct(formData);
      if (!result.success) {
        return toast("Failed to add product.", { type: "error" });
      }

      toast("Product added successfully.", { type: "success" });
      navigate("/admin/products");
    } catch (error) {
      toast("Failed to add product.", { type: "error" });
    }

    console.log(Array.from(formData.entries()));
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Product" />
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Multi File Upload Here */}
          <MyMultipleFileUpload
            urls={imagesURLs}
            name="images"
            onChange={handleFileUpload}
          />
          <div className="grid grid-cols-2 gap-4">
            <MyTextInput
              name="name"
              label="Product Name"
              value={formState.name}
              onChange={handleChange}
            />
            <MyTextInput
              name="slug"
              label="Product Slug"
              value={formState.slug}
              disabled={true}
            />
          </div>
          <MyTextarea
            name="desc"
            label="Product Description"
            required
            value={formState.desc}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <MySelect
              name="category"
              label="Product Category"
              value={formState.category}
              onChange={handleChange}
              options={categoriesOptions}
            />
            <MySelect
              name="subCategory"
              label="Product Sub-Category"
              value={formState.subCategory}
              onChange={handleChange}
              options={subCategoriesOptions}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MyTextInput
              name="price"
              label="Product Price"
              type="number"
              value={formState.price}
              onChange={handleChange}
            />
            <MyTextInput
              name="qty"
              label="Product Qantity"
              type="number"
              value={formState.qty}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <MyTextInput
              name="discountPercentage"
              label="Product Discount %"
              type="number"
              value={formState.discountPercentage}
              onChange={handleChange}
            />
            <MyTextInput
              name="taxPercentage"
              label="Product Tax %"
              type="number"
              value={formState.taxPercentage}
              onChange={handleChange}
            />
            <MyTextInput
              name="shippingFee"
              label="Product Shipping Fee"
              type="number"
              value={formState.shippingFee}
              onChange={handleChange}
            />
          </div>

          {/* Sizes Multi Select Here */}
          <MyMultiSelect />
          {/* Colors Multi Select Here */}

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;
