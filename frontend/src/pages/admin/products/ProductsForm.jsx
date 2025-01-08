import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyMultipleFilesInput from "../../../components/admin/common/form/MyMutipleFilesInput";
import MySelect from "../../../components/admin/common/form/MySelect";
import MyTextArea from "../../../components/admin/common/form/MyTextArea";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyAlert from "../../../components/common/MyAlert";
import { useForm } from "../../../hooks/useForm";
import {
  addProduct,
  getAllCategories,
  getAllSubCategories,
  getProductById,
  updateProduct
} from "../../../services/apiServices";
import MyMultiSelect from "../../../components/admin/common/form/MyMultiSelect";
import { COLORS, SIZES } from "../../../consts";

const initialState = {
  name: "",
  slug: "",
  desc: "",
  images: null,
  category: "",
  subCategory: "",
  price: "",
  quantity: "",
  discountPercentage: "",
  taxPercentage: "",
  shippingFee: "",
  colors: [],
  sizes: []
};

function ProductsForm() {
  // const { id } = useParams();
  // const isAdd = id === "add";

  // const [formStateLoading, setFormStateLoading] = useState(
  //   isAdd ? false : true
  // );
  // const [formState, setFormState] = useState(initialState);
  // const [formStateError, setFormStateError] = useState("");

  // const [imageURLs, setImageURLs] = useState([""]);

  function getFormData(formData) {
    const body = new FormData();
    for (const key in formData) {
      if (key === "images") {
        for (const image of formData[key]) {
          body.append("images", image);
        }
      } else if (key === "sizes") {
        for (const size of formData[key]) {
          body.append("sizes", size);
        }
      } else if (key === "colors") {
        for (const size of formData[key]) {
          body.append("colors", size);
        }
      } else {
        body.append(key, formData[key]);
      }
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
    getProductById,
    getFormData,
    addProduct,
    updateProduct,
    "/admin/products"
  );

  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [categoriesError, setCategoriesError] = useState([]);

  const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [subCategoriesError, setSubCategoriesError] = useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  // useEffect(() => {
  //   if (!isAdd) {
  //     fetchProduct();
  //   }
  // }, [id]);

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

  // async function fetchProduct() {
  //   try {
  //     const result = await getProductById(id);

  //     if (!result.success) {
  //       toast("Failed to fetch product.", { type: "error" });
  //       setFormStateError("Failed to fetch product.");
  //       return;
  //     }

  //     setFormState(result.data);
  //     setImageURLs(result.data.images);
  //   } catch (error) {
  //     toast("Failed to fetch product.", { type: "error" });
  //     setFormStateError("Failed to fetch product.");
  //   } finally {
  //     setFormStateLoading(false);
  //   }
  // }

  // function handleChange(e) {
  //   if (e.target.name === "name") {
  //     setFormState({
  //       ...formState,
  //       [e.target.name]: e.target.value,
  //       slug: e.target.value.toLowerCase().replace(/\s+/g, "-")
  //     });
  //   } else {
  //     setFormState({
  //       ...formState,
  //       [e.target.name]: e.target.value
  //     });
  //   }
  // }

  function handleFileUpload(e) {
    const files = e.target.files;
    setFormData({ ...formData, images: files });

    const temp = [];
    for (const file of files) {
      temp.push(URL.createObjectURL(file));
    }
    setImageUrls(temp);
  }

  // async function handleSubmit(e) {
  //   try {
  //     e.preventDefault();

  //     const formData = new FormData();
  //     for (const key in formState) {
  //       if (key === "images") {
  //         for (const image of formState[key]) {
  //           formData.append("images", image);
  //         }
  //       } else {
  //         formData.append(key, formState[key]);
  //       }
  //     }

  //     let result;
  //     if (isAdd) {
  //       result = await addProduct(formData);
  //     } else {
  //       result = await updateProduct(id, formData);
  //     }

  //     if (!result.success) {
  //       return toast(`Failed to ${isAdd ? "add" : "update"} product.`, {
  //         type: "error"
  //       });
  //     }

  //     toast(`Product ${isAdd ? "added" : "updated"} successfully.`, {
  //       type: "success"
  //     });
  //     navigate("/admin/products");
  //   } catch (error) {
  //     toast(`Failed to ${isAdd ? "add" : "update"} product.`, {
  //       type: "error"
  //     });
  //   }
  // }

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
      <AdminPageTitle title="Add Update Product" />
      <div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* images Upload */}
          <MyMultipleFilesInput
            name="images"
            label="Product Images"
            onChange={handleFileUpload}
            urls={imageUrls}
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

          <div className="grid grid-cols-2 gap-4">
            {/* colors Multi Select */}
            <MyMultiSelect
              initialOptions={COLORS}
              selectedOptions={formData.colors}
              setSelectedOptions={(colors) => {
                setFormData({
                  ...formData,
                  colors: colors
                });
              }}
            />

            {/* sizes Multi Select */}
            <MyMultiSelect
              initialOptions={SIZES}
              selectedOptions={formData.sizes}
              setSelectedOptions={(sizes) => {
                setFormData({
                  ...formData,
                  sizes: sizes
                });
              }}
            />
          </div>

          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;
