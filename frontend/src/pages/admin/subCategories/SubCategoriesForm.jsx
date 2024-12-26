import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileUpload from "../../../components/admin/common/form/MyFileUpload";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import {
  addSubCategory,
  getAllCategories,
  getSubCategoryById,
  updateSubCategory
} from "../../../services/apiServices";

const initialState = { name: "", slug: "", image: null, category: "" };

function SubCategoriesForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [imageURL, setImageURL] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const isAdd = id === "add";

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

  useEffect(() => {
    if (!isAdd) {
      getSubCategoryById(id).then((result) => {
        setFormState(result.data);
        setImageURL(result.data.image);
      });
    }
  }, [id]);

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
    try {
      e.preventDefault();

      setLoading(true);

      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("slug", formState.slug);
      formData.append("image", formState.image);
      formData.append("category", formState.category);

      let result;

      if (isAdd) {
        result = await addSubCategory(formData);
      } else {
        result = await updateSubCategory(id, formData);
      }

      if (!result.success) {
        return toast(`Failed to ${isAdd ? "add" : "updated"} sub-category.`, {
          type: "error"
        });
      }

      toast(`Sub-category ${isAdd ? "added" : "updated"} successfully.`, {
        type: "success"
      });

      setLoading(false);
      navigate("/admin/subCategories");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div>
      <AdminPageTitle title={`${isAdd ? "Add" : "Update"} SubCategory`} />
      <div>
        <form
          className="grid grid-cols-[1fr_2fr] gap-4"
          onSubmit={handleSubmit}
        >
          <MyFileUpload
            name="image"
            url={imageURL}
            onChange={handleFileUpload}
          />
          <div className="grid grid-cols-1 gap-4">
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
            <Button type="submit" isProcessing={loading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubCategoriesForm;
