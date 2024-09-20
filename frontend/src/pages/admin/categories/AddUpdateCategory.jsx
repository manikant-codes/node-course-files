import SendIcon from "@mui/icons-material/Send";
import { Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import MyFileUpload from "../../../components/common/MyFileUpload";
import { addCategory } from "../../../services/apiServices";

function AddUpdateCategory() {
  const { id } = useParams();
  const isAdd = id === "add";
  const [imageURL, setImageURL] = useState("");
  const [formState, setFormState] = useState(
    isAdd
      ? {
          image: null,
          name: "",
          slug: "",
        }
      : null
  );

  function handleFileUpload(e) {
    setImageURL(URL.createObjectURL(e.target.files[0]));
    setFormState({ ...formState, image: e.target.files[0] });
  }

  function handleChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(Array.from(formData.entries()));
    await addCategory(formData);
  }

  return (
    <div>
      <TitleAdmin title={(isAdd ? "Add" : "Update") + " Category"} />
      <Paper
        variant="outlined"
        component={"form"}
        className="mt-8 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <Paper variant="outlined" className="h-[350px] overflow-hidden">
            <img src={imageURL} alt="" className="object-cover w-full h-full" />
          </Paper>
          <MyFileUpload
            onChange={handleFileUpload}
            btnTxt="Upload Category Image"
            name="image"
          />
        </div>
        <div className="flex flex-col gap-2">
          <TextField
            id="name"
            label="Name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="slug"
            label="Slug"
            name="slug"
            value={formState.slug}
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default AddUpdateCategory;
