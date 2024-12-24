import React, { useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { addCategory } from "../../../services/apiServices";

function CategoriesForm() {
  const [formState, setFormState] = useState({
    name: "",
    slug: "",
    image: null
  });

  function handleInputChage(e) {
    setFormState({
      ...formState,
      name: e.target.value,
      slug: e.target.value.toLowerCase().replaceAll(" ", "-")
    });
  }

  function handleFileUpload(e) {
    setFormState({ ...formState, image: e.target.files[0] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formState", formState);

    const formData = new FormData();

    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("image", formState.image);

    const result = await addCategory(formData);

    console.log("result", result);
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Category" />
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="image" value="Upload File" />
          </div>
          <FileInput id="image" name="image" onChange={handleFileUpload} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Category Name" />
          </div>
          <TextInput
            id="name"
            name="name"
            value={formState.name}
            onChange={handleInputChage}
            type="text"
            placeholder="Category Name"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="slug" value="Category Slug" />
          </div>
          <TextInput
            id="slug"
            name="slug"
            value={formState.slug}
            disabled
            type="text"
            placeholder="Category Slug"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CategoriesForm;
