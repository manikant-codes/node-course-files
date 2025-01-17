import { Button } from "flowbite-react";
import React, { useState } from "react";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyAlert from "../../../components/common/MyAlert";
import { useForm } from "../../../hooks/useForm";
import {
  addCategory,
  getCategoryById,
  updateCategory
} from "../../../services/apiServices";

const initialState = {
  name: "",
  slug: "",
  image: null
};

function CategoriesForm() {
  const [imageUrl, setImageUrl] = useState("");

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
    getDataById: getCategoryById,
    getFormData,
    updateFormState,
    addData: addCategory,
    updateData: updateCategory,
    navURL: "/admin/categories"
  });

  if (formStateLoading) {
    return <MyAlert icon={HiArrowPath} msg="Loading..." />;
  }

  if (formStateError) {
    return (
      <MyAlert
        color="failure"
        icon={HiMiniExclamationTriangle}
        msg={formStateError}
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
        label="Upload Category Image"
        url={imageUrl}
        onChange={handleChange}
      />
      <div className="flex flex-col gap-4">
        <MyTextInput
          name="name"
          lable="Category Name"
          value={formState.name}
          onChange={handleChange}
          required={true}
        />
        <MyTextInput
          name="slug"
          lable="Category Slug"
          value={formState.slug}
          disabled={true}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default CategoriesForm;
