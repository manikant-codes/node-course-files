import * as Yup from "yup";

const imageSchema = Yup.mixed()
  .required("At least one image is required.")
  .test("fileSize", "Image size must be less than 2MB.", (value) => {
    if (!value || !value.images) return false;
    if (Array.isArray(value.images)) {
      for (const image of value.images) {
        if (image.size > 2000000) {
          return false;
        }
        return true;
      }
    } else {
      if (value.images.size > 2000000) {
        return false;
      }
      return true;
    }
  })
  .test("fileType", "Unsupported file format.", (value) => {
    if (!value || !value.images) return false;
    if (Array.isArray(value.images)) {
      for (const image of value.images) {
        if (
          ["image/jpeg", "image/webp", "image/png", "image/gif"].includes(
            image.mimetype
          )
        ) {
          return true;
        }
        return false;
      }
    } else {
      if (
        ["image/jpeg", "image/webp", "image/png", "image/gif"].includes(
          value.images.mimetype
        )
      ) {
        return true;
      }
      return false;
    }
  });

export default imageSchema;
