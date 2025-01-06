import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyMultipleFileUpload from "../../../components/admin/common/form/MyMultipleFileUpload";
import MyMultiSelect from "../../../components/admin/common/form/MyMultiSelect";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MessageBox from "../../../components/common/MessageBox";
import {
  addPage,
  getAllCategories,
  getAllSubCategoriesByCategorySlug,
  getPageById,
  updatePage
} from "../../../services/apiServices";

const initialState = {
  name: "",
  slug: "",
  images: null,
  subCategories: []
};

function PagesForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [formStateLoading, setFormStateLoading] = useState(
    isAdd ? false : true
  );
  const [formState, setFormState] = useState(initialState);
  const [formStateError, setFormStateError] = useState("");
  const [imagesURLs, setImagesURLs] = useState([""]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [categoriesError, setCategoriesError] = useState("");
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [subCategoriesError, setSubCategoriesError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formState.slug) {
      fetchSubCategoriesByCategorySlug();
    }
  }, [formState.slug]);

  useEffect(() => {
    if (!isAdd) {
      fetchPage();
    }
  }, [id]);

  async function fetchCategories() {
    try {
      const result = await getAllCategories();

      if (!result.success) {
        toast("Failed to fetch categories.", { type: "error" });
        setCategoriesError("Failed to fetch categories.");
        return;
      }

      const temp = result.data.map((category) => {
        return { value: category.name, text: category.name };
      });
      temp.unshift({ value: "", text: "Select A Category" });

      setCategoriesOptions(temp);
    } catch (error) {
      toast("Failed to fetch categories.", { type: "error" });
      setCategoriesError("Failed to fetch categories.");
    } finally {
      setCategoriesLoading(false);
    }
  }

  async function fetchSubCategoriesByCategorySlug() {
    try {
      const result = await getAllSubCategoriesByCategorySlug(formState.slug);

      if (!result.success) {
        toast("Failed to fetch sub-categories.", { type: "error" });
        setSubCategoriesError("Failed to fetch sub-categories.");
        return;
      }

      const temp = result.data.map((subCategory) => {
        return { value: subCategory._id, text: subCategory.name };
      });
      temp.unshift({ value: "", text: "Select A Sub-Category" });

      setSubCategoriesOptions(temp);
    } catch (error) {
      toast("Failed to fetch sub-categories.", { type: "error" });
      setSubCategoriesError("Failed to fetch sub-categories.");
    } finally {
      setSubCategoriesLoading(false);
    }
  }

  async function fetchPage() {
    try {
      const result = await getPageById(id);

      if (!result.success) {
        toast("Failed to fetch page.", { type: "error" });
        setFormStateError("Failed to fetch page.");
        return;
      }

      setFormState(result.data);
      setImagesURLs(result.data.images);
    } catch (error) {
      toast("Failed to fetch page.", { type: "error" });
      setFormStateError("Failed to fetch page.");
    } finally {
      setFormStateLoading(false);
    }
  }

  function handleFileUpload(e) {
    const files = e.target.files;
    setFormState({ ...formState, images: files });

    const urls = [];
    for (const file of files) {
      const tempURL = URL.createObjectURL(file);
      urls.push(tempURL);
    }
    setImagesURLs(urls);
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        name: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
        subCategories: []
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData();

      for (const key in formState) {
        if (key === "images") {
          for (const image of formState[key]) {
            formData.append("images", image);
          }
        } else if (key === "subCategories") {
          for (const subCategory of formState[key]) {
            formData.append("subCategories", subCategory);
          }
        } else {
          formData.append(key, formState[key]);
        }
      }

      let result;

      if (isAdd) {
        result = await addPage(formData);
      } else {
        result = await updatePage(id, formData);
      }

      if (!result.success) {
        return toast(`Failed to ${isAdd ? "add" : "update"} page.`, {
          type: "error"
        });
      }

      toast(`Page ${isAdd ? "added" : "updated"} successfully.`, {
        type: "success"
      });
      navigate("/admin/pages");
    } catch (error) {
      console.log("error", error);
      toast("Failed to add page.", { type: "error" });
    }
  }

  function setSelectedSubCategories(updatedSubCategories) {
    setFormState({ ...formState, subCategories: updatedSubCategories });
  }

  if (formStateLoading || subCategoriesLoading || categoriesLoading) {
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );
  }

  if (formStateError || subCategoriesError || categoriesError) {
    return (
      <MessageBox
        icon={HiExclamation}
        message={formStateError}
        status="error"
      />
    );
  }

  return (
    <div>
      <AdminPageTitle title={`${isAdd ? "Add" : "Update"} Page`} />
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <MyMultipleFileUpload
            urls={imagesURLs}
            name="images"
            onChange={handleFileUpload}
          />
          <div className="grid grid-cols-2 gap-4">
            <MySelect
              name="name"
              label="Page Name"
              value={formState.name}
              onChange={handleChange}
              options={categoriesOptions}
            />
            <MyTextInput
              name="slug"
              label="Product Slug"
              value={formState.slug}
              disabled={true}
            />
          </div>
          <MyMultiSelect
            name="subCategories"
            selected={formState.subCategories}
            setSelected={setSelectedSubCategories}
            initialOptions={subCategoriesOptions}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default PagesForm;
