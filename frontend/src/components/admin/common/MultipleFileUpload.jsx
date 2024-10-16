import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Paper } from "@mui/material";
import React from "react";
import MyFileUpload from "../../common/MyFileUpload";

function MultipleFileUpload({
  imagesURL,
  setImagesURL,
  formState,
  setFormState,
  name
}) {
  function handleFileUpload(e) {
    const tempImagesURL = [...imagesURL];
    for (const file of e.target.files) {
      tempImagesURL.push(URL.createObjectURL(file));
    }
    setImagesURL(tempImagesURL);

    const tempImages = [...formState[name], ...Array.from(e.target.files)];
    setFormState({ ...formState, [name]: tempImages });
  }

  function handleFileDelete(e, index) {
    const tempImagesURL = [...imagesURL];
    tempImagesURL.splice(index, 1);
    setImagesURL(tempImagesURL);

    const tempImages = [...formState[name]];
    tempImages.splice(index, 1);
    setFormState({ ...formState, [name]: tempImages });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {imagesURL.map((url, index) => {
        return (
          <Paper
            key={index}
            variant="outlined"
            className="h-[150px] overflow-hidden relative"
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
            <IconButton
              onClick={(e) => {
                handleFileDelete(e, index);
              }}
              color="error"
              className="!absolute !top-0 !right-0"
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        );
      })}
      <MyFileUpload onChange={handleFileUpload} name={name} multiple={true} />
    </div>
  );
}

export default MultipleFileUpload;
