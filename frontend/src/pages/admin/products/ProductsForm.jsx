import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyMultipleFileUpload from "../../../components/admin/common/form/MyMultipleFileUpload";
import MyMultiSelect from "../../../components/admin/common/form/MyMultiSelect";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextarea from "../../../components/admin/common/form/MyTextarea";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MessageBox from "../../../components/common/MessageBox";
import { COLORS, SIZES } from "../../../consts";
import {
  addProduct,
  getAllCategories,
  getAllSubCategoriesByCategoryId,
  getProductById,
  updateProduct
} from "../../../services/apiServices";

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
  sizes: [],
  colors: []
};

function ProductsForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [formStateLoading, setFormStateLoading] = useState(
    isAdd ? false : true
  );
  const [formState, setFormState] = useState(initialState);
  const [formStateError, setFormStateError] = useState("");
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
      toast("Failed to fetch categories.", { type: "error" });
    }
  }

  async function fetchSubCategoriesByCategoryId() {
    try {
      const result = await getAllSubCategoriesByCategoryId(formState.category);
      const temp = result.data.map((subCategory) => {
        return { value: subCategory._id, text: subCategory.name };
      });
      temp.unshift({ value: "", text: "Select A Sub-Category" });
      setSubCategoriesOptions(temp);
    } catch (error) {
      toast("Failed to fetch sub-categories.", { type: "error" });
    }
  }

  async function fetchProduct() {
    try {
      const result = await getProductById(id);

      if (!result.success) {
        toast("Failed to fetch prduct.", { type: "error" });
        setFormStateError("Failed to fetch product.");
        return;
      }

      setFormState(result.data);
      setImagesURLs(result.data.images);
    } catch (error) {
      toast("Failed to fetch product.", { type: "error" });
      setFormStateError("Failed to fetch product.");
    } finally {
      setFormStateLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formState.category) {
      fetchSubCategoriesByCategoryId();
    }
  }, [formState.category]);

  useEffect(() => {
    if (!isAdd) {
      fetchProduct();
    }
  }, [id]);

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
    } else if (e.target.name === "category") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        subCategory: ""
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

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

      console.log("formState", formState);
      console.log("formData", Array.from(formData.entries()));

      let result;

      if (isAdd) {
        result = await addProduct(formData);
      } else {
        result = await updateProduct(id, formData);
      }

      if (!result.success) {
        return toast(`Failed to ${isAdd ? "add" : "update"} product.`, {
          type: "error"
        });
      }

      toast(`Product ${isAdd ? "added" : "updated"} successfully.`, {
        type: "success"
      });
      navigate("/admin/products");
    } catch (error) {
      toast("Failed to add product.", { type: "error" });
    }
  }

  function setSelectedSizes(updatedSizes) {
    setFormState({ ...formState, sizes: updatedSizes });
  }

  function setSelectedColors(updatedColors) {
    setFormState({ ...formState, colors: updatedColors });
  }

  if (formStateLoading) {
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );
  }

  if (formStateError) {
    return (
      <MessageBox
        icon={HiExclamation}
        message={formStateError}
        status="error"
      />
    );
  }

  return (
    <div>
      <AdminPageTitle title={`${isAdd ? "Add" : "Update"} Product`} />
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

          <div className="grid grid-cols-2 gap-4">
            {/* Sizes Multi Select Here */}
            <MyMultiSelect
              name="sizes"
              selected={formState.sizes}
              setSelected={setSelectedSizes}
              initialOptions={SIZES}
            />

            {/* Colors Multi Select Here */}
            <MyMultiSelect
              name="colors"
              selected={formState.colors}
              setSelected={setSelectedColors}
              initialOptions={COLORS}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;
