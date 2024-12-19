import React, { useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyFileUpload from "../../../components/admin/common/form/MyFileUpload";

const initialState = { name: "", slug: "", image: "" };

function CategoriesForm() {
  const [formState, setFormState] = useState(initialState);
  const [imageURL, setImageURL] = useState("");

  function handleChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      slug: e.target.value.toLowerCase().replaceAll(" ", "-")
    });
  }

  function handleImageUpload(e) {
    const tempURL = URL.createObjectURL(e.target.files[0]);
    setImageURL(tempURL);

    setFormState({
      ...formState,
      image: e.target.files[0]
    });
  }

  return (
    <div>
      <AdminPageTitle title="Add Updated Category" />
      <div>
        <form className="grid grid-cols-[1fr_2fr] gap-4">
          <MyFileUpload
            name="image"
            onChange={handleImageUpload}
            url={imageURL}
          />
          <div className="flex flex-col gap-4">
            <MyTextInput
              name="name"
              label="Category name"
              value={formState.name}
              onChange={handleChange}
              required={true}
            />
            <MyTextInput
              name="slug"
              label="Category Slug"
              value={formState.slug}
              disabled={true}
            />
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoriesForm;
