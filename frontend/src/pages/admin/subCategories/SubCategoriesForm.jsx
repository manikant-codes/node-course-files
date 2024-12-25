import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyFileUpload from "../../../components/admin/common/form/MyFileUpload";
import MySelect from "../../../components/admin/common/form/MySelect";
import {
  addSubCategory,
  getAllCategories
} from "../../../services/apiServices";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = { name: "", slug: "", image: null, category: "" };

function SubCategoriesForm() {
  const [formState, setFormState] = useState(initialState);
  const [imageURL, setImageURL] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((result) => {
      const temp = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });

      // Default first option.
      temp.unshift({ value: "", text: "Select A Category" });

      setCategories(temp);
    });
  }, []);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    const tempURL = URL.createObjectURL(file);
    setImageURL(tempURL);
    setFormState({ ...formState, image: file });
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        name: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-")
      });
    } else {
      setFormState({
        ...formState,
        category: e.target.value
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("image", formState.image);
    formData.append("category", formState.category);

    const result = await addSubCategory(formData);

    if (!result.success) {
      return toast("Failed to add sub-category.", { type: "error" });
    }

    toast("Sub-category added successfully.", { type: "success" });

    navigate("/admin/subCategories");
  }

  return (
    <div>
      <AdminPageTitle title="Add Update SubCategory" />
      <div>
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <MyFileUpload
            name="image"
            url={imageURL}
            onChange={handleFileUpload}
          />
          <MyTextInput
            name="name"
            label="Sub-Category Name"
            value={formState.name}
            onChange={handleChange}
            required={true}
          />
          <MyTextInput
            name="slug"
            label="Sub-Category Slug"
            value={formState.slug}
            disabled={true}
          />
          <MySelect
            name="category"
            label="Select A Category"
            options={categories}
            value={formState.category}
            onChange={handleChange}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default SubCategoriesForm;
