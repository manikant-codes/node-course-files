import * as React from "react";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function MyFileUpload({
  multiple = false,
  onChange,
  name,
  btnTxt = "Upload Files",
}) {
  if (multiple) {
    return (
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<AddCircleOutlineIcon className="!h-10 !w-10" />}
        fullWidth
        className="h-[150px]"
      >
        <VisuallyHiddenInput
          name={name}
          type="file"
          onChange={onChange}
          multiple={multiple}
        />
      </Button>
    );
  }
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      fullWidth
    >
      {btnTxt}
      <VisuallyHiddenInput
        name={name}
        type="file"
        onChange={onChange}
        multiple={multiple}
      />
    </Button>
  );
}

export default MyFileUpload;
