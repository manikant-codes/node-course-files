import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileUpload from "../../../components/admin/common/form/MyFileUpload";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import { addCategory, updateCategory } from "../../../services/apiServices";

function CommonForm({
  initialState,
  getDataById,
  imageField,
  imageState,
  setImageState,
  addData,
  updateData,
  navURL
}) {
  //   const [formState, setFormState] = useState(initialState);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const navigate = useNavigate();
  //   const { id } = useParams();

  //   const isAdd = id === "add";

  //   useEffect(() => {
  //     if (!isAdd) {
  //       getDataById(id)
  //         .then((result) => {
  //           if (!result.success) {
  //             return toast("Failed to get data.", { type: "error" });
  //           }

  //           setFormState(result.data);

  //           if (imageField) {
  //             setImageState(result.data[imageField]);
  //           }
  //         })
  //         .catch((error) => {
  //           toast("Failed to get data.", { type: "error" });
  //         });
  //     }
  //   }, [id]);

  //   function handleChange(e) {
  //     setFormState({
  //       ...formState,
  //       [e.target.name]: e.target.value,
  //       slug: e.target.value.toLowerCase().replaceAll(" ", "-")
  //     });
  //   }

  //   function handleImageUpload(e) {
  //     const tempURL = URL.createObjectURL(e.target.files[0]);
  //     setImageURL(tempURL);

  //     setFormState({
  //       ...formState,
  //       image: e.target.files[0]
  //     });
  //   }

  //   async function handleSubmit(e) {
  //     try {
  //       e.preventDefault();

  //       setLoading(true);

  //       const formData = new FormData();
  //       for (const field in formData) {
  //         formData.append(field, formState[field]);
  //       }

  //       let data;

  //       if (isAdd) {
  //         data = await addData(formData);
  //       } else {
  //         data = await updateData(id, formData);
  //       }

  //       if (data.success) {
  //         setLoading(false);
  //         toast(`Data ${isAdd ? "added" : "updated"} successfully.`, {
  //           type: "success"
  //         });
  //         navigate(navURL);
  //       } else {
  //         setLoading(false);
  //         setError(data.msg);
  //         toast("Failed to add data.", { type: "error" });
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       setError(error.message);
  //     }
  //   }

  return (
    <div>
      <AdminPageTitle title={isAdd ? "Add Category" : "Update Category"} />
      {/* <div>
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
      </div> */}
    </div>
  );
}

export default CommonForm;
