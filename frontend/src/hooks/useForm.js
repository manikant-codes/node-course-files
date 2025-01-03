import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useForm(initialData, initialUrls, imageField, getDataById) {
  const { id } = useParams();
  const isAdd = id === "add";

  const [loading, setLoading] = useState(isAdd ? false : true);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState("");

  const [urls, setUrls] = useState(initialUrls);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdd) {
      fetchData();
    }
  }, [id]);

  async function fetchData() {
    try {
      const result = await getDataById(id);

      console.log(result);

      if (!result.success) {
        toast("Failed to fetch form data.", { type: "error" });
        setError("Failed to fetch form data.");
        return;
      }

      setData(result.data);
      setUrls(result.data[imageField]);
    } catch (error) {
      toast("Failed to fetch form data.", { type: "error" });
      setError("Failed to fetch form data.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    if (e.target.name === "name") {
      setData({
        ...data,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replace(/\s+/g, "-")
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    }
  }

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

  return {
    loading,
    data,
    setData,
    error,
    urls,
    setUrls,
    handleChange,
    handleSubmit
  };
}
