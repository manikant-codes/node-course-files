import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import { toast } from "react-toastify";
import {
  addSubCategory,
  getAllCategories
} from "../../../services/apiServices";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  slug: "",
  image: null,
  category: ""
};

function SubCategoriesForm() {
  const [formState, setFormState] = useState(initialState);
  const [imageURL, setImageURL] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const navigate = useNavigate();

  async function fetchAllCategories() {
    try {
      const result = await getAllCategories();
      const temp = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });
      setCategoryOptions(temp);
    } catch (error) {
      toast("Failed to get categories.", { type: "error" });
    }
  }

  useEffect(() => {
    fetchAllCategories();
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
        [e.target.name]: e.target.value,
        slug: e.target.value.replaceAll(" ", "-").toLowerCase()
      });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData();
      for (const key in formState) {
        formData.append(key, formState[key]);
      }

      const result = await addSubCategory(formData);

      if (!result.success) {
        return toast("Failed to add sub-category.", { type: "error" });
      }

      toast("Sub-category added successfully.", { type: "success" });
      navigate("/admin/subCategories");
    } catch (error) {
      toast("Failed to add sub-category.", { type: "error" });
    }
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Sub-Category" />
      <form
        onSubmit={handleSubmit}
        className="mt-4 grid grid-cols-[1fr_2fr] gap-4"
      >
        <MyFileInput
          name="image"
          label="Upload Sub-Category Image"
          url={imageURL}
          onChange={handleFileUpload}
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
    </div>
  );
}

export default SubCategoriesForm;
