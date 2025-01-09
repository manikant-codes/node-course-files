import * as Yup from "yup";

const imageSchema = Yup.mixed()
  .required("At least one image is required.")
  .test("fileSize", "Image size must be less than 2MB.", (value) => {
    if (!value || !value.images) return false;
    for (const image of value.images) {
      if (image.size > 2000000) {
        return false;
      }
      return true;
    }
  })
  .test("fileType", "Unsupported file format.", (value) => {
    if (!value || !value.images) return false;
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
  });

export default imageSchema;
