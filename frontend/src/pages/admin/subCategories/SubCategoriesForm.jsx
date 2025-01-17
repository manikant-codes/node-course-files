import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import { toast } from "react-toastify";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyAlert from "../../../components/common/MyAlert";
import { useForm } from "../../../hooks/useForm";
import {
  addSubCategory,
  getAllCategories,
  getSubCategoryById,
  updateSubCategory
} from "../../../services/apiServices";

const initialState = {
  name: "",
  slug: "",
  image: null,
  category: ""
};

function SubCategoriesForm() {
  const [imageUrl, setImageUrl] = useState("");

  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryError, setCategoryError] = useState("");

  function setOtherStates(data) {
    setImageUrl(data.image);
  }

  function getFormData(formData) {
    const body = new FormData();

    for (const key in formData) {
      body.append(key, formData[key]);
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
    } else if (e.target.name === "image") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.files[0]
      });

      const tempUrl = URL.createObjectURL(e.target.files[0]);

      setImageUrl(tempUrl);
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
    getDataById: getSubCategoryById,
    getFormData,
    updateFormState,
    addData: addSubCategory,
    updateData: updateSubCategory,
    navURL: "/admin/subCategories"
  });

  async function fetchAllCategories() {
    try {
      const result = await getAllCategories();

      if (!result.success) {
        setCategoryError("Failed to get categories.");
        toast("Failed to get categories.", { type: "error" });
        return;
      }

      const temp = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });

      setCategoryOptions(temp);
    } catch (error) {
      toast("Failed to get categories.", { type: "error" });
      setCategoryError("Failed to get categories.");
    } finally {
      setCategoryLoading(false);
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  if (formStateLoading || categoryLoading) {
    return <MyAlert icon={HiArrowPath} msg="Loading..." />;
  }

  if (formStateError || categoryError) {
    return (
      <MyAlert
        color="failure"
        icon={HiMiniExclamationTriangle}
        msg={formStateError || categoryError}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 grid grid-cols-[1fr_2fr] gap-4"
    >
      <MyFileInput
        name="image"
        label="Upload Sub-Category Image"
        url={imageUrl}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-4">
        <MyTextInput
          name="name"
          lable="Sub-Category Name"
          value={formState.name}
          onChange={handleChange}
          required={true}
        />
        <MyTextInput
          name="slug"
          lable="Sub-Category Slug"
          value={formState.slug}
          disabled={true}
        />
        <MySelect
          name="category"
          label="Select A Category"
          value={formState.category}
          onChange={handleChange}
          options={categoryOptions}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default SubCategoriesForm;
