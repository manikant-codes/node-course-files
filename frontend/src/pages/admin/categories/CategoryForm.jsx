import React, { useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { addCategory } from "../../../services/apiServices";
import { useNavigate } from "react-router-dom";

const initialState = {
  image: null,
  name: "",
  slug: ""
};

function CategoryForm() {
  const [formState, setFormState] = useState(initialState);
  const navigate = useNavigate();

  function handleUpload(e) {
    const file = e.target.files[0];
    setFormState({ ...formState, image: file });
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

      const result = await addCategory(formData);

      if (!result.success) {
        return alert("Failed to add category.");
      }

      alert("Category added successfully.");
      navigate("/admin/categories");
    } catch (error) {
      alert("Failed to add category.");
    }
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Category" />
      <div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* image */}
          <div>
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
