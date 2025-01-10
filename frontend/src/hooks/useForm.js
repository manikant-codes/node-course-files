import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useForm(
  initialState,
  getDataById,
  addData,
  updateData,
  setOtherStates,
  getUpdatedFormState,
  getFormData,
  navURL
) {
  const { id } = useParams();
  const isUpdate = id !== "add";
  const [formStateLoading, setFormStateLoading] = useState(
    isUpdate ? true : false
  );
  const [formState, setFormState] = useState(initialState);
  const [formStateError, setFormStateError] = useState("");
  const navigate = useNavigate();

  async function fetchFormData() {
    try {
      const result = await getDataById(id);
      if (!result.success) {
        setFormStateError("Failed to fetch form data.");
        return;
      }

      setFormState(result.data);

      if (setOtherStates) {
        setOtherStates(result.data);
      }
    } catch (error) {
      setFormStateError("Failed to fetch form data.");
    } finally {
      setFormStateLoading(false);
    }
  }

  useEffect(() => {
    if (isUpdate) {
      fetchFormData();
    }
  }, [id]);

  function handleChange(e) {
    const formStateCopy = { ...formState };
    const updatedFormState = getUpdatedFormState(e, formStateCopy);
    setFormState(updatedFormState);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = getFormData();

      let result;

      if (isUpdate) {
        result = await updateData(id, formData);
      } else {
        result = await addData(formData);
      }

      if (!result.success) {
        toast(`Failed to ${isUpdate ? "update" : "add"} data.`, {
          type: "error"
        });
        return;
      }

      toast(`Data ${isUpdate ? "updated" : "added"} successfully.`, {
        type: "success"
      });
      navigate(navURL);
    } catch (error) {
      toast(`Failed to ${isUpdate ? "update" : "add"} data.`, {
        type: "error"
      });
    }
  }

  return {
    isUpdate,
    formState,
    formStateLoading,
    formStateError,
    handleChange,
    handleSubmit
  };
}
