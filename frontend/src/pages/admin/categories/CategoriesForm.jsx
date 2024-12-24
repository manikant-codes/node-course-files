import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileUpload from "../../../components/admin/common/form/MyFileUpload";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import {
  addCategory,
  getCategoryById,
  updateCategory
} from "../../../services/apiServices";

const initialState = { name: "", slug: "", image: "" };

function CategoriesForm() {
  const [formState, setFormState] = useState(initialState);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const isAdd = id === "add";

  useEffect(() => {
    if (!isAdd) {
      getCategoryById(id)
        .then((result) => {
          if (!result.success) {
            toast("Failed to get category data.", { type: "error" });
          }
          setFormState(result.data);
          setImageURL(result.data.image);
        })
        .catch((error) => {
          toast("Failed to get category data.", { type: "error" });
        });
    }
  }, [id]);

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

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    // formData.append("name", formState.name);
    // formData.append("slug", formState.slug);
    // formData.append("image", formState.image);
    // OR
    for (const key in formState) {
      formData.append(key, formState[key]);
    }

    let data;

    if (isAdd) {
      data = await addCategory(formData);
    } else {
      data = await updateCategory(id, formData);
    }

    if (data.success) {
      toast(`Category ${isAdd ? "added" : "updated"} successfully.`, {
        type: "success"
      });
      navigate("/admin/categories");
    } else {
      toast("Failed to add category.", { type: "error" });
    }
  }

  return (
    <div>
      <AdminPageTitle title={isAdd ? "Add Category" : "Update Category"} />
      <div>
        <form
          className="grid grid-cols-[1fr_2fr] gap-4"
          onSubmit={handleSubmit}
        >
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
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoriesForm;
