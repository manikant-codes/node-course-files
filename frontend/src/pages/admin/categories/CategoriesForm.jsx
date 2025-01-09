import { Button } from "flowbite-react";
import React from "react";
import { HiArrowPath, HiMiniExclamationTriangle } from "react-icons/hi2";
import MyFileInput from "../../../components/admin/common/form/MyFileInput";
import MyTextInput from "../../../components/admin/common/form/MyTextInput";
import MyAlert from "../../../components/common/MyAlert";
import { useForm } from "../../../hooks/useForm";
import {
  addCategory,
  getCategoryById,
  updateCategory
} from "../../../services/apiServices";

const initialState = {
  name: "",
  slug: "",
  image: null
};

function CategoriesForm() {
  // const { id } = useParams();
  // const isAdd = id === "add";
  // const [formStateLoading, setFormStateLoading] = useState(
  //   isAdd ? false : true
  // );
  // const [formState, setFormState] = useState(initialState);
  // const [formStateError, setFormStateError] = useState("");
  // const [imageURL, setImageURL] = useState("");
  // const navigate = useNavigate();

  function getBody(formData) {
    const body = new FormData();
    body.append("name", formData.name);
    body.append("slug", formData.slug);
    body.append("image", formData.image);
    return body;
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
    "",
    "image",
    getCategoryById,
    getBody,
    addCategory,
    updateCategory,
    "/admin/categories"
  );

  // async function fetchCategory() {
  //   try {
  //     const result = await getCategoryById(id);

  //     if (!result.success) {
  //       toast("Failed to fetch category.", { type: "error" });
  //       setFormStateError("Failed to fetch category.");
  //       return;
  //     }

  //     setFormState(result.data);
  //     setImageURL(result.data.image);
  //   } catch (error) {
  //     toast("Failed to fetch category.", { type: "error" });
  //     setFormStateError("Failed to fetch category.");
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
  //     name: e.target.value,
  //     slug: e.target.value.toLowerCase().replaceAll(" ", "-")
  //   });
  // }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    setFormState({ ...formState, image: file });

    const tempURL = URL.createObjectURL(file);
    setImageUrls(tempURL);
  }

  // async function handleSubmit(e) {
  //   try {
  //     e.preventDefault();

  //     const formData = new FormData();
  //     formData.append("name", formState.name);
  //     formData.append("slug", formState.slug);
  //     formData.append("image", formState.image);

  //     let result;

  //     if (isAdd) {
  //       result = await addCategory(formData);
  //     } else {
  //       result = await updateCategory(id, formData);
  //     }

  //     if (!result.success) {
  //       return toast(`Failed to ${isAdd ? "add" : "update"} category.`, {
  //         type: "error"
  //       });
  //     }

  //     toast(`Category ${isAdd ? "added" : "updated"} successfully.`, {
  //       type: "success"
  //     });
  //     navigate("/admin/categories");
  //   } catch (error) {
  //     return toast(`Failed to ${isAdd ? "add" : "update"} category.`, {
  //       type: "error"
  //     });
  //   }
  // }

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
        label="Upload Category Image"
        url={imageUrls}
        onChange={handleFileUpload}
      />
      <div className="flex flex-col gap-4">
        <MyTextInput
          name="name"
          lable="Category Name"
          value={formState.name}
          onChange={handleChange}
          required={true}
        />
        <MyTextInput
          name="slug"
          lable="Category Slug"
          value={formState.slug}
          disabled={true}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default CategoriesForm;
