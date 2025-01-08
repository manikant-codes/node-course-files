import { Button, FileInput, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import StatusMessage from "../../../components/common/StatusMessage";
import {
  addCategory,
  getCategoryById,
  updateCategory
} from "../../../services/apiServices";

const initialState = {
  image: null,
  name: "",
  slug: ""
};

function CategoryForm() {
  const { id } = useParams();
  const isUpdate = id !== "add";
  const [formStateLoading, setFormStateLoading] = useState(
    isUpdate ? true : false
  );
  const [formState, setFormState] = useState(initialState);
  const [formStateError, setFormStateError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdate) {
      fetchCategory();
    }
  }, []);

  async function fetchCategory() {
    try {
      const result = await getCategoryById(id);

      if (!result.success) {
        alert("Failed to fetch category.");
        setFormStateError("Failed to fetch category.");
        return;
      }

      setFormState({
        image: result.data.image,
        name: result.data.name,
        slug: result.data.slug
      });

      setImageUrl(result.data.image);
    } catch (error) {
      alert("Failed to fetch category.");
      setFormStateError("Failed to fetch category.");
    } finally {
      setFormStateLoading(false);
    }
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    setFormState({ ...formState, image: file });

    const tempUrl = URL.createObjectURL(file);
    setImageUrl(tempUrl);
  }

  function handleChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      slug: e.target.value.toLowerCase().replaceAll(" ", "-")
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("image", formState.image);
      formData.append("name", formState.name);
      formData.append("slug", formState.slug);

      let result;
      if (isUpdate) {
        result = await updateCategory(id, formData);
      } else {
        result = await addCategory(formData);
      }

      if (!result.success) {
        return alert(`Failed to ${isUpdate ? "update" : "add"} category.`);
      }

      alert(`Category ${isUpdate ? "updated" : "added"} successfully.`);
      navigate("/admin/categories");
    } catch (error) {
      alert(`Failed to ${isUpdate ? "update" : "add"} category.`);
    }
  }

  if (formStateLoading) {
    return (
      <>
        <AdminPageTitle title={`${isUpdate ? "Update" : "Add"} Category`} />
        <StatusMessage type="loading" message="Loading form data..." />
      </>
    );
  }

  if (formStateError) {
    return (
      <>
        <AdminPageTitle title={`${isUpdate ? "Update" : "Add"} Category`} />
        <StatusMessage type="error" message={formStateError} />
      </>
    );
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Category" />
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* image */}
          <div>
            <div className="w-[200px] h-[200px] mb-2 block rounded-lg overflow-hidden border">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="image" value="Upload Category Image" />
            </div>
            <FileInput
              id="image"
              name="image"
              helperText="SVG, PNG, JPG or GIF"
              onChange={handleUpload}
            />
          </div>

          {/* name */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Category Name" />
            </div>
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Enter category name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* slug */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="slug" value="Category Slug" />
            </div>
            <TextInput
              id="slug"
              name="slug"
              type="text"
              value={formState.slug}
              disabled
              required
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
