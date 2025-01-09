import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyMultipleFilesInput from "../../../components/admin/common/form/MyMutipleFilesInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyAlert from "../../../components/common/MyAlert";
import { useForm } from "../../../hooks/useForm";
import {
  addPage,
  getAllCategories,
  getAllSubCategoriesByCategorySlug,
  getPageById,
  updatePage
} from "../../../services/apiServices";
import MyMultiSelect from "../../../components/admin/common/form/MyMultiSelect";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  slug: "",
  images: null,
  subCategories: []
};

function PagesForm() {
  function getFormData(formState) {
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("slug", formState.slug);

    for (const subCategory of formState.subCategories) {
      formData.append("subCategories", subCategory);
    }

    for (const image of formState.images) {
      formData.append("images", image);
    }

    return formData;
  }

  const {
    formStateLoading,
    formStateError,
    formState,
    setFormState,
    imageUrls,
    setImageUrls,
    handleChange,
    handleSubmit
  } = useForm(
    initialState,
    [""],
    "images",
    getPageById,
    getFormData,
    addPage,
    updatePage,
    "/admin/pages"
  );

  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [categoriesError, setCategoriesError] = useState("");

  const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [subCategoriesError, setSubCategoriesError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formState.name) {
      fetchSubCategories();
    }
  }, [formState.slug]);

  async function fetchCategories() {
    try {
      const result = await getAllCategories();

      if (!result.success) {
        toast("Failed to fetch categories.", { type: "error" });
        setCategoriesError("Failed to fetch categories.");
        return;
      }

      const transformedCategories = result.data.map((category) => {
        return { value: category.slug, text: category.name };
      });

      setCategoriesOptions(transformedCategories);
    } catch (error) {
      toast("Failed to fetch categories.", { type: "error" });
      setCategoriesError("Failed to fetch categories.");
    } finally {
      setCategoriesLoading(false);
    }
  }

  async function fetchSubCategories() {
    try {
      const result = await getAllSubCategoriesByCategorySlug(formState.slug);

      if (!result.success) {
        toast("Failed to fetch sub-categories.", { type: "error" });
        setSubCategoriesError("Failed to fetch sub-categories.");
        console.log(result.msg);
        return;
      }

      const transformedSubCategories = result.data.map((subCategory) => {
        return { value: subCategory._id, text: subCategory.name };
      });

      transformedSubCategories.unshift({
        value: "",
        text: "Select A Sub-Category"
      });

      setSubCategoriesOptions(transformedSubCategories);
    } catch (error) {
      toast("Failed to fetch sub-categories.", { type: "error" });
      setSubCategoriesError("Failed to fetch sub-categories.");
      console.log(error.message);
    } finally {
      setSubCategoriesLoading(false);
    }
  }

  function handleFileUpload(e) {
    const files = e.target.files;
    setFormState({ ...formState, images: files });

    const temp = [];
    for (const file of files) {
      temp.push(URL.createObjectURL(file));
    }
    setImageUrls(temp);
  }

  if (formStateLoading || categoriesLoading || subCategoriesLoading) {
    return <MyAlert icon={HiArrowPath} msg="Loading..." />;
  }

  if (formStateError || categoriesError || subCategoriesError) {
    return (
      <MyAlert
        color="failure"
        icon={HiMiniExclamationTriangle}
        msg={formStateError}
      />
    );
  }

  return (
    <div>
      <AdminPageTitle title="Add Update Page" />
      <div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* images Upload */}
          <MyMultipleFilesInput
            name="images"
            label="Pages Images"
            onChange={handleFileUpload}
            urls={imageUrls}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* name Select */}
            <MySelect
              name="name"
              label="Select A Page"
              value={formState.name}
              onChange={handleChange}
              options={categoriesOptions}
            />

            {/* slug Input */}
            <MyTextInput
              name="slug"
              lable="Slug"
              value={formState.slug}
              disabled={true}
              required={true}
            />
          </div>

          {/* subCategories Multi Select */}
          <MyMultiSelect
            name="subCategories"
            label="Sub-Categories"
            initialOptions={subCategoriesOptions}
            selectedOptions={formState.subCategories}
            setSelectedOptions={(subCategories) => {
              setFormState({ ...formState, subCategories });
            }}
          />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PagesForm;
