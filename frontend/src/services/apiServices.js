import { getAllApiServices } from "../helpers/apiServicesHelper";

export const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
} = getAllApiServices("category", "categories");

export const {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
} = getAllApiServices("subCategory", "subCategories");

export const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = getAllApiServices("product", "products");

export const { getAllPages, getPageById, addPage, updatePage, deletePage } =
  getAllApiServices("page", "pages");
