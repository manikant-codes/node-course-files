import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useForm(
  initialFormData,
  initialImageUrls,
  imageField,
  getDataById,
  getBody,
  addData,
  updateData,
  navURL
) {
  const { id } = useParams();
  const isAdd = id === "add";
  const [loading, setLoading] = useState(isAdd ? false : true);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [imageUrls, setImageUrls] = useState(initialImageUrls);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdd) {
      fetchData();
    }
  }, [id]);

  const fetchData = useCallback(
    async function () {
      try {
        const result = await getDataById(id);

        if (!result.success) {
          toast("Failed to fetch form data.", { type: "error" });
          setError("Failed to fetch form data.");
          console.log(result.msg);
          return;
        }

        setFormData(result.data);
        setImageUrls(result.data[imageField]);
      } catch (error) {
        toast("Failed to fetch form data.", { type: "error" });
        setError("Failed to fetch form data.");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  const handleChange = useCallback(
    function (e) {
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
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async function (e) {
      try {
        e.preventDefault();

        const body = getBody(formData);

        let result;

        if (isAdd) {
          result = await addData(body);
        } else {
          result = await updateData(id, body);
        }

        if (!result.success) {
          toast(`Failed to ${isAdd ? "add" : "update"} data.`, {
            type: "error"
          });
          console.log(result.msg);
          return;
        }

        toast(`Data ${isAdd ? "added" : "updated"} successfully.`, {
          type: "success"
        });

        navigate(navURL);
      } catch (error) {
        toast(`Failed to ${isAdd ? "add" : "update"} data.`, {
          type: "error"
        });
        console.log(error.message);
      }
    },
    [formData, isAdd, id, addData, updateData, navURL]
  );

  return {
    loading,
    error,
    formData,
    setFormData,
    imageUrls,
    setImageUrls,
    handleChange,
    handleSubmit
  };
}
