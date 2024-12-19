import * as Yup from "yup";

const checkIfEmptyArray = (array) => Array.isArray(array) && array.length > 0;

const pageValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  slug: Yup.string()
    .min(2, "Slug must be at least 2 characters")
    .required("Slug is required"),
  subCategories: Yup.array()
    .of(Yup.string().matches(/^[0-9a-fA-F]{24}$/, "Invalid sub-category ID"))
    .test(
      "not-empty",
      "At least one sub-category is required",
      checkIfEmptyArray
    )
    .required("Sub-categories are required")
});
export default pageValidationSchema;
