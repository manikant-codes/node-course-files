import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MyMultipleFilesInput from "../../../components/admin/common/form/MyMutipleFilesInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextArea from "../../../components/admin/common/form/MyTextArea";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyAlert from "../../../components/common/MyAlert";

function MyForm({
  initialFormState,
  initialImageURLsState,
  imageField,
  getDataById,
  addData,
  updateData,
  navURL
}) {
  const { id } = useParams();
  const isAdd = id === "add";

  const [formDataLoading, setFormDataLoading] = useState(isAdd ? false : true);
  const [formData, setFormData] = useState(initialFormState);
  const [formDataError, setFormDataError] = useState("");

  //   const [imageURLs, setImageURLs] = useState(initialImageURLsState);

  //   const [categoriesLoading, setCategoriesLoading] = useState(true);
  //   const [categoriesOptions, setCategoriesOptions] = useState([]);
  //   const [categoriesError, setCategoriesError] = useState([]);

  //   const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
  //   const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  //   const [subCategoriesError, setSubCategoriesError] = useState([]);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     fetchCategories();
  //   }, []);

  //   useEffect(() => {
  //     fetchSubCategories();
  //   }, []);

  useEffect(() => {
    if (!isAdd) {
      fetchFormData();
    }
  }, [id]);

  //   async function fetchCategories() {
  //     try {
  //       const result = await getAllCategories();

  //       if (!result.success) {
  //         toast("Failed to fetch categories.", { type: "error" });
  //         setCategoriesError("Failed to fetch categories.");
  //         return;
  //       }

  //       const transformedCategories = result.data.map((category) => {
  //         return { value: category._id, text: category.name };
  //       });

  //       setCategoriesOptions(transformedCategories);
  //     } catch (error) {
  //       toast("Failed to fetch categories.", { type: "error" });
  //       setCategoriesError("Failed to fetch categories.");
  //     } finally {
  //       setCategoriesLoading(false);
  //     }
  //   }

  //   async function fetchSubCategories() {
  //     try {
  //       const result = await getAllSubCategories();

  //       if (!result.success) {
  //         toast("Failed to fetch sub-categories.", { type: "error" });
  //         setCategoriesError("Failed to fetch sub-categories.");
  //         return;
  //       }

  //       const transformedSubCategories = result.data.map((subCategory) => {
  //         return { value: subCategory._id, text: subCategory.name };
  //       });

  //       setSubCategoriesOptions(transformedSubCategories);
  //     } catch (error) {
  //       toast("Failed to fetch sub-categories.", { type: "error" });
  //       setSubCategoriesError("Failed to fetch sub-categories.");
  //     } finally {
  //       setSubCategoriesLoading(false);
  //     }
  //   }

  async function fetchFormData() {
    try {
      const result = await getDataById(id);

      if (!result.success) {
        toast("Failed to fetch form data.", { type: "error" });
        setFormDataError("Failed to fetch form data.");
        return;
      }

      setFormData(result.data);
      setImageURLs(result.data[imageField]);
    } catch (error) {
      toast("Failed to fetch form data.", { type: "error" });
      setFormDataError("Failed to fetch form data.");
    } finally {
      setFormDataLoading(false);
    }
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replace(/\s+/g, "-")
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  }

  //   function handleFileUpload(e) {
  //     const files = e.target.files;
  //     setFormData({ ...formData, images: files });

  //     const temp = [];
  //     for (const file of files) {
  //       temp.push(URL.createObjectURL(file));
  //     }
  //     setImageURLs(temp);
  //   }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData();
      for (const key in formData) {
        if (key === "images") {
          for (const image of formData[key]) {
            formData.append("images", image);
          }
        } else {
          formData.append(key, formData[key]);
        }
      }

      let result;
      if (isAdd) {
        result = await addData(formData);
      } else {
        result = await updateData(id, formData);
      }

      if (!result.success) {
        return toast(`Failed to ${isAdd ? "add" : "update"} data.`, {
          type: "error"
        });
      }

      toast(`Data ${isAdd ? "added" : "updated"} successfully.`, {
        type: "success"
      });
      navigate(navURL);
    } catch (error) {
      toast(`Failed to ${isAdd ? "add" : "update"} data.`, {
        type: "error"
      });
    }
  }

  if (formDataLoading) {
    return <MyAlert icon={HiArrowPath} msg="Loading..." />;
  }

  if (formDataError) {
    return (
      <MyAlert
        color="failure"
        icon={HiMiniExclamationTriangle}
        msg={formDataError}
      />
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {/* images Upload */}
        <MyMultipleFilesInput
          name="images"
          label="Product Images"
          onChange={handleFileUpload}
          urls={imageURLs}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* name Input */}
          <MyTextInput
            name="name"
            lable="Name"
            value={formData.name}
            onChange={handleChange}
            required={true}
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

        {/* desc TextArea */}
        <MyTextArea
          name="desc"
          label="Description"
          value={formData.desc}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* category Select */}
          <MySelect
            name="category"
            label="Select A Category"
            value={formData.category}
            onChange={handleChange}
            options={categoriesOptions}
          />
          {/* subCategory Select */}
          <MySelect
            name="subCategory"
            label="Select A Sub-Category"
            value={formData.subCategory}
            onChange={handleChange}
            options={subCategoriesOptions}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* price Input */}
          <MyTextInput
            name="price"
            lable="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required={true}
          />
          {/* quantity Input */}
          <MyTextInput
            name="quantity"
            lable="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* discountPercentage Input */}
          <MyTextInput
            name="discountPercentage"
            lable="Discount (%)"
            type="number"
            value={formData.discountPercentage}
            onChange={handleChange}
            required={true}
          />
          {/* taxPercentage Input */}
          <MyTextInput
            name="taxPercentage"
            lable="Tax (%)"
            type="number"
            value={formData.taxPercentage}
            onChange={handleChange}
            required={true}
          />
          {/* shippingFee Input */}
          <MyTextInput
            name="shippingFee"
            lable="Shipping Fee"
            type="number"
            value={formData.shippingFee}
            onChange={handleChange}
            required={true}
          />
        </div>

        {/* colors Multi Select */}
        {/* sizes Multi Select */}

        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default MyForm;
