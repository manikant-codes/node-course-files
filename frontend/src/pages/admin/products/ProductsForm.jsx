import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextArea from "../../../components/admin/common/form/MyTextArea";
import MyMultipleFilesInput from "../../../components/admin/common/form/MyMutipleFilesInput";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import {
  getAllCategories,
  getAllSubCategories
} from "../../../services/apiServices";

const initialState = {
  name: "",
  slug: "",
  desc: "",
  images: null,
  category: "",
  subCategory: "",
  price: "",
  quantity: "",
  discountPercentage: "",
  taxPercentage: "",
  shippingFee: "",
  colors: [],
  sizes: []
};

function ProductsForm() {
  const [formStateLoading, setFormStateLoading] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [formStateError, setFormStateError] = useState("");

  const [imageURLs, setImageURLs] = useState([""]);

  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [categoriesError, setCategoriesError] = useState([]);

  const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [subCategoriesError, setSubCategoriesError] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  async function fetchCategories() {
    try {
      const result = await getAllCategories();

      if (!result.success) {
        toast("Failed to fetch categories.", { type: "error" });
        setCategoriesError("Failed to fetch categories.");
        return;
      }

      const transformedCategories = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });

      setCategoriesOptions(transformedCategories);
    } catch (error) {
      toast("Failed to fetch categories.", { type: "error" });
      setCategoriesError("Failed to fetch categories.");
    } finally {
      setCategoriesLoading(false);
    }
  }

  async function fetchSubCategories() {
    try {
      const result = await getAllSubCategories();

      if (!result.success) {
        toast("Failed to fetch sub-categories.", { type: "error" });
        setCategoriesError("Failed to fetch sub-categories.");
        return;
      }

      const transformedSubCategories = result.data.map((subCategory) => {
        return { value: subCategory._id, text: subCategory.name };
      });

      setSubCategoriesOptions(transformedSubCategories);
    } catch (error) {
      toast("Failed to fetch sub-categories.", { type: "error" });
      setSubCategoriesError("Failed to fetch sub-categories.");
    } finally {
      setSubCategoriesLoading(false);
    }
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replace(/\s+/g, "-")
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });
    }
  }

  function handleFileUpload(e) {
    const files = e.target.files;
    setFormState({ ...formState, images: files });

    const temp = [];
    for (const file of files) {
      temp.push(URL.createObjectURL(file));
    }
    setImageURLs(temp);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("formState", formState);
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Product" />
      <div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* images Upload */}
          <MyMultipleFilesInput
            name="images"
            label="Product Images"
            onChange={handleFileUpload}
            urls={imageURLs}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* name Input */}
            <MyTextInput
              name="name"
              lable="Name"
              value={formState.name}
              onChange={handleChange}
              required={true}
            />
            {/* slug Input */}
            <MyTextInput
              name="slug"
              lable="Slug"
              value={formState.slug}
              disabled={true}
              required={true}
            />
          </div>

          {/* desc TextArea */}
          <MyTextArea
            name="desc"
            label="Description"
            value={formState.desc}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* category Select */}
            <MySelect
              name="category"
              label="Select A Category"
              value={formState.category}
              onChange={handleChange}
              options={categoriesOptions}
            />
            {/* subCategory Select */}
            <MySelect
              name="subCategory"
              label="Select A Sub-Category"
              value={formState.subCategory}
              onChange={handleChange}
              options={subCategoriesOptions}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* price Input */}
            <MyTextInput
              name="price"
              lable="Price"
              type="number"
              value={formState.price}
              onChange={handleChange}
              required={true}
            />
            {/* quantity Input */}
            <MyTextInput
              name="quantity"
              lable="Quantity"
              type="number"
              value={formState.quantity}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* discountPercentage Input */}
            <MyTextInput
              name="discountPercentage"
              lable="Discount (%)"
              type="number"
              value={formState.discountPercentage}
              onChange={handleChange}
              required={true}
            />
            {/* taxPercentage Input */}
            <MyTextInput
              name="taxPercentage"
              lable="Tax (%)"
              type="number"
              value={formState.taxPercentage}
              onChange={handleChange}
              required={true}
            />
            {/* shippingFee Input */}
            <MyTextInput
              name="shippingFee"
              lable="Shipping Fee"
              type="number"
              value={formState.shippingFee}
              onChange={handleChange}
              required={true}
            />
          </div>

          {/* colors Multi Select */}
          {/* sizes Multi Select */}

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;
