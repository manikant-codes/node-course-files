import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useForm({
  initialState,
  getDataById,
  setOtherStates,
  getFormData,
  updateFormState,
  addData,
  updateData,
  navURL
}) {
  const { id } = useParams();
  const isAdd = id === "add";

  const [formStateLoading, setFormStateLoading] = useState(
    isAdd ? false : true
  );
  const [formState, setFormState] = useState(initialState);
  const [formStateError, setFormStateError] = useState("");

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
          setFormStateError("Failed to fetch form data.");
          console.log(result.msg);
          return;
        }

        setFormState(result.data);

        if (setOtherStates) {
          setOtherStates(result.data);
        }
      } catch (error) {
        toast("Failed to fetch form data.", { type: "error" });
        setFormStateError("Failed to fetch form data.");
        console.log(error.message);
      } finally {
        setFormStateLoading(false);
      }
    },
    [id]
  );

  function handleChange(e) {
    updateFormState(e, formState, setFormState);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = getFormData(formState);

      let result;

      if (isAdd) {
        result = await addData(formData);
      } else {
        result = await updateData(id, formData);
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
  }

  return {
    isAdd,
    formStateLoading,
    formStateError,
    formState,
    setFormState,
    handleChange,
    handleSubmit
  };
}
