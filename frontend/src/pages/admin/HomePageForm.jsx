import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { toast } from "react-toastify";
import AdminPageTitle from "../../components/admin/common/AdminPageTitle";
import MyMultipleFileUpload from "../../components/admin/common/form/MyMultipleFileUpload";
import MyMultiSelect from "../../components/admin/common/form/MyMultiSelect";
import MessageBox from "../../components/common/MessageBox";
import {
  addHomePage,
  getAllHomePages,
  getAllSubCategories,
  updateHomePage
} from "../../services/apiServices";

const initialState = {
  images: null,
  subCategories: []
};

function HomePageForm() {
  const [isAdd, setIsAdd] = useState(true);
  const [formStateLoading, setFormStateLoading] = useState(true);
  const [formState, setFormState] = useState(initialState);
  const [formStateError, setFormStateError] = useState("");
  const [imagesURLs, setImagesURLs] = useState([""]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [categoriesError, setCategoriesError] = useState("");
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [subCategoriesError, setSubCategoriesError] = useState("");

  useEffect(() => {
    fetchSubCategories();
  }, []);

  useEffect(() => {
    fetchPage();
  }, []);

  async function fetchSubCategories() {
    try {
      const result = await getAllSubCategories();

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
      const result = await getAllHomePages();

      if (!result.success) {
        toast("Failed to fetch home page.", { type: "error" });
        setFormStateError("Failed to fetch home page.");
        return;
      }

      if (result.data?.name) {
        setIsAdd(false);
        setFormState(result.data);
        setImagesURLs(result.data.images);
      }
    } catch (error) {
      toast("Failed to fetch home page.", { type: "error" });
      setFormStateError("Failed to fetch home page.");
      console.log(error);
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
        }
      }

      let result;

      if (isAdd) {
        result = await addHomePage(formData);
      } else {
        result = await updateHomePage("", formData);
      }

      if (!result.success) {
        return toast(`Failed to ${isAdd ? "add" : "update"} home page.`, {
          type: "error"
        });
      }

      toast(`Home page ${isAdd ? "added" : "updated"} successfully.`, {
        type: "success"
      });
    } catch (error) {
      console.log("error", error);
      toast(`Failed to ${isAdd ? "add" : "update"} home page.`, {
        type: "error"
      });
    }
  }

  function setSelectedSubCategories(updatedSubCategories) {
    setFormState({ ...formState, subCategories: updatedSubCategories });
  }

  if (formStateLoading || subCategoriesLoading) {
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );
  }

  if (formStateError || subCategoriesError) {
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
      <AdminPageTitle title={`Home Page`} />
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <MyMultipleFileUpload
            urls={imagesURLs}
            name="images"
            onChange={handleFileUpload}
          />
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

export default HomePageForm;
