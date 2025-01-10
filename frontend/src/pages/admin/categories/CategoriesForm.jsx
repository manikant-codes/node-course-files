import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileUpload from "../../../components/admin/common/form/MyFileUpload";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MessageBox from "../../../components/common/MessageBox";
import {
  addCategory,
  getCategoryById,
  updateCategory
} from "../../../services/apiServices";
import useForm from "../../../hooks/useForm";

const initialState = { name: "", slug: "", image: "" };

function CategoriesForm() {
  const [imageURL, setImageURL] = useState("");
  const {
    isUpdate,
    formState,
    formStateLoading,
    formStateError,
    handleChange,
    handleSubmit
  } = useForm(
    initialState,
    getCategoryById,
    addCategory,
    updateCategory,
    setOtherStates,
    getUpdatedFormState,
    getFormData,
    "/admin/categories"
  );

  function setOtherStates(data) {
    setImageURL(data.image);
  }

  function getFormData() {
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("image", formState.image);
    return formData;
  }

  function getUpdatedFormState(e, formStateCopy) {
    if (e.target.name === "name") {
      formStateCopy[e.target.name] = e.target.value;
      formStateCopy["slug"] = e.target.value.toLowerCase().replaceAll(" ", "-");
    } else if (e.target.name === "image") {
      formStateCopy["image"] = e.target.files[0];
      const tempURL = URL.createObjectURL(e.target.files[0]);
      setImageURL(tempURL);
    }

    return formStateCopy;
  }

  // const { id } = useParams();
  // const isAdd = id === "add";
  // const [formStateLoading, setFormStateLoading] = useState(
  //   isAdd ? false : true
  // );
  // const [formState, setFormState] = useState(initialState);
  // const [formStateError, setFormStateError] = useState("");

  // async function fetchCategory() {
  //   try {
  //     const result = await getCategoryById(id);

  //     if (!result.success) {
  //       toast("Failed to fetch category data.", { type: "error" });
  //       setFormStateError("Failed to fetch category data.");
  //       return;
  //     }

  //     setFormState(result.data);
  //     setImageURL(result.data.image);
  //   } catch (error) {
  //     toast("Failed to fetch category data.", { type: "error" });
  //     setFormStateError("Failed to fetch category data.");
  //   } finally {
  //     setFormStateLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (!isAdd) {
  //     fetchCategory();
  //   }
  // }, [id]);

  // function handleChange(e) {
  //   setFormState({
  //     ...formState,
  //     [e.target.name]: e.target.value,
  //     slug: e.target.value.toLowerCase().replaceAll(" ", "-")
  //   });
  // }

  // function handleImageUpload(e) {
  //   const tempURL = URL.createObjectURL(e.target.files[0]);
  //   setImageURL(tempURL);

  //   setFormState({
  //     ...formState,
  //     image: e.target.files[0]
  //   });
  // }

  // async function handleSubmit(e) {
  //   try {
  //     e.preventDefault();

  //     setFormStateLoading(true);

  //     const formData = new FormData();
  //     formData.append("name", formState.name);
  //     formData.append("slug", formState.slug);
  //     formData.append("image", formState.image);

  //     let data;

  //     if (isAdd) {
  //       data = await addCategory(formData);
  //     } else {
  //       data = await updateCategory(id, formData);
  //     }

  //     if (data.success) {
  //       setFormStateLoading(false);
  //       toast(`Category ${isAdd ? "added" : "updated"} successfully.`, {
  //         type: "success"
  //       });
  //       navigate("/admin/categories");
  //     } else {
  //       setFormStateLoading(false);
  //       setFormStateError(data.msg);
  //       toast("Failed to add category.", { type: "error" });
  //     }
  //   } catch (error) {
  //     setFormStateLoading(false);
  //     setFormStateError(error.message);
  //   }
  // }

  if (formStateLoading) {
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );
  }

  if (formStateError) {
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
      <AdminPageTitle title={isUpdate ? "Update Category" : "Add Category"} />
      <div>
        <form
          className="grid grid-cols-[1fr_2fr] gap-4"
          onSubmit={handleSubmit}
        >
          <MyFileUpload name="image" onChange={handleChange} url={imageURL} />
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
