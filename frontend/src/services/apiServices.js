import { getAllApiServices } from "../helpers/apiServicesHelper";

// Categories

export const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
} = getAllApiServices("category", "categories");

// End Categories

// Sub-Categories

export const {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
} = getAllApiServices("subCategory", "subCategories");

// End Sub-Categories

// Products

export const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = getAllApiServices("product", "products");

// End Products

// Pages

export const { getAllPages, getPageById, addPage, updatePage, deletePage } =
  getAllApiServices("page", "pages");

// End Pages
