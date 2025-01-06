import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import {
  addPage,
  getAllCategories,
  getAllSubCategories,
  getPageById,
  updatePage
} from "../../../services/apiServices";
import MyAlert from "../../../components/common/MyAlert";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import { useForm } from "../../../hooks/useForm";
import MyMultipleFilesInput from "../../../components/admin/common/form/MyMutipleFilesInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import { Button } from "flowbite-react";

const initialState = {
  name: "",
  slug: "",
  images: null,
  subCategories: []
};

function PagesForm() {
  function getBody(formData) {
    const body = new FormData();
    body.append("name", formData.name);
    body.append("slug", formData.slug);
    body.append("subCategories", formData.subCategories);

    for (const image of formData.images) {
      body.append("images", image);
    }

    return body;
  }

  const {
    loading,
    error,
    formData,
    setFormData,
    imageUrls,
    setImageUrls,
    handleChange,
    handleSubmit
  } = useForm(
    initialState,
    [""],
    "images",
    getPageById,
    getBody,
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
    fetchSubCategories();
  }, []);

  async function fetchCategories() {
    try {
      const result = await getAllCategories();

      if (!result.success) {
        toast("Failed to fetch categories.", { type: "error" });
        setCategoriesError("Failed to fetch categories.");
        return;
      }

      const transformedCategories = result.data.map((category) => {
        return { value: category._id, text: category.name };
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
      const result = await getAllSubCategories();

      if (!result.success) {
        toast("Failed to fetch sub-categories.", { type: "error" });
        setSubCategoriesError("Failed to fetch sub-categories.");
        return;
      }

      const transformedSubCategories = result.data.map((subCategory) => {
        return { value: subCategory._id, text: subCategory.name };
      });

      setSubCategoriesOptions(transformedSubCategories);
    } catch (error) {
      toast("Failed to fetch sub-categories.", { type: "error" });
      setSubCategoriesError("Failed to fetch sub-categories.");
    } finally {
      setSubCategoriesLoading(false);
    }
  }

  function handleFileUpload(e) {
    const files = e.target.files;
    setFormData({ ...formData, images: files });

    const temp = [];
    for (const file of files) {
      temp.push(URL.createObjectURL(file));
    }
    setImageUrls(temp);
  }

  if (loading) {
    return <MyAlert icon={HiArrowPath} msg="Loading..." />;
  }

  if (error) {
    return (
      <MyAlert color="failure" icon={HiMiniExclamationTriangle} msg={error} />
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
              value={formData.name}
              onChange={handleChange}
              options={categoriesOptions}
            />

            {/* slug Input */}
            <MyTextInput
              name="slug"
              lable="Slug"
              value={formData.slug}
              disabled={true}
              required={true}
            />
          </div>

          {/* subCategories Multi Select */}

          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PagesForm;
