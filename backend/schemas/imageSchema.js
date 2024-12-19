import * as Yup from "yup";

const imageSchema = Yup.mixed()
  .required("At least one image is required.")
  .test("fileSize", "Image size must be less than 2MB.", (value) => {
    return value && value.images && value.images.size <= 2097152;
  })
  .test("fileType", "Unsupported file format.", (value) => {
    return (
      value &&
      value.images &&
      ["image/jpeg", "image/png", "image/gif"].includes(value.images.mimetype)
    );
  });

export default imageSchema;
