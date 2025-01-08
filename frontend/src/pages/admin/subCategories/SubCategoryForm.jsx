import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import {
  addSubCategory,
  getAllCategories
} from "../../../services/apiServices";
import { useFetch } from "../../../hooks/useFetch";
import StatusMessage from "../../../components/common/StatusMessage";

const initialState = {
  name: "",
  slug: "",
  image: null,
  category: ""
};

function SubCategoryForm() {
  const [formState, setFormState] = useState(initialState);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  function modifyData(data) {
    data.unshift({ _id: "", name: "Select A Category" });
    return data;
  }

  const {
    loading,
    data: categories,
    error
  } = useFetch([], getAllCategories, modifyData);

  // const [categories, setCategories] = useState([]);

  // async function fetchAllCategories() {
  //   try {
  //     const result = await getAllCategories();

  //     if (!result.success) {
  //       alert("Failed to fetch categories.");
  //       console.log("Error: ", result.message);
  //     }

  //     result.data.unshift({ _id: "", name: "Select A Category" });
  //     setCategories(result.data);
  //   } catch (error) {
  //     alert("Failed to fetch categories.");
  //     console.log("Error: ", error.message);
  //   }
  // }

  // useEffect(() => {
  //   fetchAllCategories();
  // }, []);

  function handleUpload(e) {
    const file = e.target.files[0];
    setFormState({ ...formState, image: file });

    const tempUrl = URL.createObjectURL(file);
    setImageUrl(tempUrl);
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-")
      });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("slug", formState.slug);
      formData.append("image", formState.image);
      formData.append("category", formState.category);

      const result = await addSubCategory(formData);

      if (!result.success) {
        alert("Failed to add sub-category.");
        console.log("Error: ", result.message);
      }

      alert("Sub-category added successfully.");
      navigate("/admin/subCategories");
    } catch (error) {
      alert("Failed to add sub-category.");
      console.log("Error: ", error.message);
    }
  }

  if (loading) {
    return (
      <>
        <AdminPageTitle title={`${true ? "Update" : "Add"} Category`} />
        <StatusMessage type="loading" message="Loading form data..." />
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminPageTitle title={`${true ? "Update" : "Add"} Category`} />
        <StatusMessage type="error" message={error} />
      </>
    );
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Sub-Category" />
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
              <Label htmlFor="image" value="Upload Sub-Category Image" />
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
              <Label htmlFor="name" value="Sub-Category Name" />
            </div>
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Enter sub-category name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* slug */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="slug" value="Sub-Category Slug" />
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

          {/* category */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Select Category" />
            </div>
            <Select
              id="category"
              name="category"
              value={formState.category}
              onChange={handleChange}
              required
            >
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </Select>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default SubCategoryForm;
