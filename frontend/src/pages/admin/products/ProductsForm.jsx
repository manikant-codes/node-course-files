import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyMultiSelect from "../../../components/admin/common/form/MyMultiSelect";
import MyMultipleFilesInput from "../../../components/admin/common/form/MyMutipleFilesInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextArea from "../../../components/admin/common/form/MyTextArea";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyAlert from "../../../components/common/MyAlert";
import { COLORS, SIZES } from "../../../consts";
import { useForm } from "../../../hooks/useForm";
import {
  addProduct,
  getAllCategories,
  getAllSubCategories,
  getAllSubCategoriesByCategoryId,
  getProductById,
  updateProduct
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
  const [imageUrls, setImageUrls] = useState([""]);

  function setOtherStates(data) {
    setImageUrls(data.images);
  }

  function getFormData(formData) {
    const body = new FormData();

    for (const key in formData) {
      if (key === "images") {
        for (const image of formData[key]) {
          body.append("images", image);
        }
      } else if (key === "sizes") {
        for (const size of formData[key]) {
          body.append("sizes", size);
        }
      } else if (key === "colors") {
        for (const size of formData[key]) {
          body.append("colors", size);
        }
      } else {
        body.append(key, formData[key]);
      }
    }

    return body;
  }

  function updateFormState(e, formState, setFormState) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-")
      });
    } else if (e.target.name === "images") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.files
      });

      const tempUrls = [];
      for (const image of e.target.files) {
        tempUrls.push(URL.createObjectURL(image));
      }
      setImageUrls(tempUrls);
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });
    }
  }

  const {
    isAdd,
    formStateLoading,
    formStateError,
    formState,
    setFormState,
    handleChange,
    handleSubmit
  } = useForm({
    initialState,
    setOtherStates,
    getDataById: getProductById,
    getFormData,
    updateFormState,
    addData: addProduct,
    updateData: updateProduct,
    navURL: "/admin/products"
  });

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
    if (formState.category) {
      fetchSubCategoriesByCategoryId();
    }
  }, [formState.category]);

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

  async function fetchSubCategoriesByCategoryId() {
    try {
      const result = await getAllSubCategoriesByCategoryId(formState.category);

      if (!result.success) {
        toast("Failed to fetch sub-categories.", { type: "error" });
        setSubCategoriesError("Failed to fetch sub-categories.");
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

  function handleFileUpload(e) {
    const files = e.target.files;
    setFormState({ ...formState, images: files });

    const temp = [];
    for (const file of files) {
      temp.push(URL.createObjectURL(file));
    }
    setImageUrls(temp);
  }

  if (formStateLoading || categoriesLoading) {
    return <MyAlert icon={HiArrowPath} msg="Loading..." />;
  }

  if (formStateError || categoriesError) {
    return (
      <MyAlert
        color="failure"
        icon={HiMiniExclamationTriangle}
        msg={formStateError || categoriesError}
      />
    );
  }

  return (
    <div>
      <AdminPageTitle title={isAdd ? "Add Product" : "Update Product"} />
      <div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* images Upload */}
          <MyMultipleFilesInput
            name="images"
            label="Product Images"
            onChange={handleFileUpload}
            urls={imageUrls}
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

          <div className="grid grid-cols-2 gap-4">
            {/* colors Multi Select */}
            <MyMultiSelect
              initialOptions={COLORS}
              selectedOptions={formState.colors}
              setSelectedOptions={(colors) => {
                setFormState({
                  ...formState,
                  colors: colors
                });
              }}
            />

            {/* sizes Multi Select */}
            <MyMultiSelect
              initialOptions={SIZES}
              selectedOptions={formState.sizes}
              setSelectedOptions={(sizes) => {
                setFormState({
                  ...formState,
                  sizes: sizes
                });
              }}
            />
          </div>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;
