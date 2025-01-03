import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MessageBox from "../../../components/common/MessageBox";

function CommonForm({
  initialState,
  urlsInitialState,
  imageField,
  getDataById
}) {
  const { id } = useParams();
  const isAdd = id === "add";

  const [formDataLoading, setFormDataLoading] = useState(isAdd ? false : true);
  const [formData, setFormData] = useState(initialState);
  const [formDataError, setFormDataError] = useState("");

  const [urls, setUrls] = useState(urlsInitialState);

  // const [categoriesLoading, setCategoriesLoading] = useState(true);
  // const [categoriesOptions, setCategoriesOptions] = useState([]);
  // const [categoriesError, setCategoriesError] = useState("");

  // const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
  // const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  // const [subCategoriesError, setSubCategoriesError] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // useEffect(() => {
  //   fetchSubCategories();
  // }, []);

  useEffect(() => {
    if (!isAdd) {
      fetchFormData();
    }
  }, [id]);

  // async function fetchCategories() {
  //   try {
  //     const result = await getAllCategories();

  //     if (!result.success) {
  //       toast("Failed to fetch categories.", { type: "error" });
  //       setCategoriesError("Failed to fetch categories.");
  //       return;
  //     }

  //     const temp = result.data.map((category) => {
  //       return { value: category.name, text: category.name };
  //     });
  //     temp.unshift({ value: "", text: "Select A Category" });

  //     setCategoriesOptions(temp);
  //   } catch (error) {
  //     toast("Failed to fetch categories.", { type: "error" });
  //     setCategoriesError("Failed to fetch categories.");
  //   } finally {
  //     setCategoriesLoading(false);
  //   }
  // }

  // async function fetchSubCategories() {
  //   try {
  //     const result = await getAllSubCategories();

  //     if (!result.success) {
  //       toast("Failed to fetch sub-categories.", { type: "error" });
  //       setSubCategoriesError("Failed to fetch sub-categories.");
  //       return;
  //     }

  //     const temp = result.data.map((subCategory) => {
  //       return { value: subCategory._id, text: subCategory.name };
  //     });
  //     temp.unshift({ value: "", text: "Select A Sub-Category" });

  //     setSubCategoriesOptions(temp);
  //   } catch (error) {
  //     toast("Failed to fetch sub-categories.", { type: "error" });
  //     setSubCategoriesError("Failed to fetch sub-categories.");
  //   } finally {
  //     setSubCategoriesLoading(false);
  //   }
  // }

  async function fetchFormData() {
    try {
      const result = await getDataById(id);

      if (!result.success) {
        toast("Failed to fetch form data.", { type: "error" });
        setFormDataError("Failed to fetch form data.");
        return;
      }

      setFormData(result.data);
      setUrls(result.data[imageField]);
    } catch (error) {
      toast("Failed to fetch form data.", { type: "error" });
      setFormDataError("Failed to fetch form data.");
    } finally {
      setFormDataLoading(false);
    }
  }

  // function handleFileUpload(e) {
  //   const files = e.target.files;
  //   setFormData({ ...formData, images: files });

  //   const urls = [];
  //   for (const file of files) {
  //     const tempURL = URL.createObjectURL(file);
  //     urls.push(tempURL);
  //   }
  //   setUrls(urls);
  // }

  // function handleChange(e) {
  //   if (e.target.name === "name") {
  //     setFormData({
  //       ...formData,
  //       name: e.target.value,
  //       slug: e.target.value.toLowerCase().replaceAll(" ", "-")
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value
  //     });
  //   }
  // }

  // async function handleSubmit(e) {
  //   try {
  //     e.preventDefault();

  //     const formData = new FormData();

  //     for (const key in formData) {
  //       if (key === "images") {
  //         for (const image of formData[key]) {
  //           formData.append("images", image);
  //         }
  //       } else if (key === "subCategories") {
  //         for (const subCategory of formData[key]) {
  //           formData.append("subCategories", subCategory);
  //         }
  //       } else {
  //         formData.append(key, formData[key]);
  //       }
  //     }

  //     let result;

  //     if (isAdd) {
  //       result = await addPage(formData);
  //     } else {
  //       result = await updatePage(id, formData);
  //     }

  //     if (!result.success) {
  //       return toast(`Failed to ${isAdd ? "add" : "update"} page.`, {
  //         type: "error"
  //       });
  //     }

  //     toast(`Page ${isAdd ? "added" : "updated"} successfully.`, {
  //       type: "success"
  //     });
  //     navigate("/admin/pages");
  //   } catch (error) {
  //     console.log("error", error);
  //     toast("Failed to add page.", { type: "error" });
  //   }
  // }

  // function setSelectedSubCategories(updatedSubCategories) {
  //   setFormData({ ...formData, subCategories: updatedSubCategories });
  // }

  if (formDataLoading) {
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );
  }

  if (formDataError) {
    return (
      <MessageBox icon={HiExclamation} message={formDataError} status="error" />
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <MyMultipleFileUpload
          urls={urls}
          name="images"
          onChange={handleFileUpload}
        />
        <div className="grid grid-cols-2 gap-4">
          <MySelect
            name="name"
            label="Page Name"
            value={formData.name}
            onChange={handleChange}
            options={categoriesOptions}
          />
          <MyTextInput
            name="slug"
            label="Product Slug"
            value={formData.slug}
            disabled={true}
          />
        </div>
        <MyMultiSelect
          name="subCategories"
          selected={formData.subCategories}
          setSelected={setSelectedSubCategories}
          initialOptions={subCategoriesOptions}
        /> */}
        {fields}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CommonForm;
