import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyAlert from "../../../components/common/MyAlert";
import {
  addSubCategory,
  getAllCategories,
  getSubCategoryById,
  updateSubCategory
} from "../../../services/apiServices";

const initialState = {
  name: "",
  slug: "",
  image: null,
  category: ""
};

function SubCategoriesForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [formStateLoading, setFormStateLoading] = useState(
    isAdd ? false : true
  );
  const [formState, setFormState] = useState(initialState);
  const [formStateError, setFormStateError] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const navigate = useNavigate();

  async function fetchAllCategories() {
    try {
      const result = await getAllCategories();

      if (!result.success) {
        toast("Failed to get categories.", { type: "error" });
        return;
      }

      const temp = result.data.map((category) => {
        return { value: category._id, text: category.name };
      });

      setCategoryOptions(temp);
    } catch (error) {
      toast("Failed to get categories.", { type: "error" });
    }
  }

  async function fetchSubCategory() {
    try {
      const result = await getSubCategoryById(id);

      if (!result.success) {
        toast("Failed to fetch sub-categoory.", { type: "error" });
        setFormStateError("Failed to fetch sub-categoory.");
        return;
      }

      setFormState(result.data);
      setImageURL(result.data.image);
    } catch (error) {
      toast("Failed to fetch sub-categoory.", { type: "error" });
      setFormStateError("Failed to fetch sub-categoory.");
    } finally {
      setFormStateLoading(false);
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (!isAdd) {
      fetchSubCategory();
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

      let result;

      if (isAdd) {
        result = await addSubCategory(formData);
      } else {
        result = await updateSubCategory(id, formData);
      }

      if (!result.success) {
        return toast(`Failed to ${isAdd ? "add" : "update"} sub-category.`, {
          type: "error"
        });
      }

      toast(`Sub-category ${isAdd ? "added" : "updated"} successfully.`, {
        type: "success"
      });
      navigate("/admin/subCategories");
    } catch (error) {
      toast(`Failed to ${isAdd ? "add" : "update"} sub-category.`, {
        type: "error"
      });
    }
  }

  if (formStateLoading) {
    return <MyAlert icon={HiArrowPath} msg="Loading..." />;
  }

  if (formStateError) {
    return (
      <MyAlert
        color="failure"
        icon={HiMiniExclamationTriangle}
        msg={formStateError}
      />
    );
  }

  return (
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
  );
}

export default SubCategoriesForm;
