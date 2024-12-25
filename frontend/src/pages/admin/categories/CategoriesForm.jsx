import React, { useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { addCategory } from "../../../services/apiServices";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CategoriesForm() {
  const [imageURL, setImageURL] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    slug: "",
    image: null
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormState({
      ...formState,
      name: e.target.value,
      slug: e.target.value.toLowerCase().replaceAll(" ", "-")
    });
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    setFormState({ ...formState, image: file });

    const tempURL = URL.createObjectURL(file);
    setImageURL(tempURL);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("image", formState.image);

    const result = await addCategory(formData);

    if (!result.success) {
      return toast("Failed to add category.", { type: "error" });
    }

    toast("Category added successfully.", { type: "success" });
    navigate("/admin/categories");
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Category" />
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <MyFileInput
          name="image"
          label="Upload Category Image"
          url={imageURL}
          onChange={handleFileUpload}
        />
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
      </form>
    </div>
  );
}

export default CategoriesForm;
