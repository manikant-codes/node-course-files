import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
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
  const [formState, setFormState] = useState(initialState);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCategory();
  }, []);

  const isAdd = id === "add";

  async function fetchCategory() {
    try {
      if (!isAdd) {
        const result = await getCategoryById(id);
        setFormState(result.data);
        setImageURL(result.data.image);
      }
    } catch (error) {
      toast("Failed to fetch category data.", { type: "error" });
    }
  }

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
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("slug", formState.slug);
      formData.append("image", formState.image);

      let result;

      if (isAdd) {
        result = await addCategory(formData);
      } else {
        result = await updateCategory(id, formData);
      }

      if (!result.success) {
        return toast(`Failed to ${isAdd ? "add" : "update"} category.`, {
          type: "error"
        });
      }

      toast(`Category ${isAdd ? "added" : "updated"} successfully.`, {
        type: "success"
      });
      navigate("/admin/categories");
    } catch (error) {
      return toast(`Failed to ${isAdd ? "add" : "update"} category.`, {
        type: "error"
      });
    }
  }

  return (
    <div>
      <AdminPageTitle title={`${isAdd ? "Add" : "Update"} Category`} />
      <form
        onSubmit={handleSubmit}
        className="mt-4 grid grid-cols-[1fr_2fr] gap-4"
      >
        <MyFileInput
          name="image"
          label="Upload Category Image"
          url={imageURL}
          onChange={handleFileUpload}
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
    </div>
  );
}

export default CategoriesForm;
