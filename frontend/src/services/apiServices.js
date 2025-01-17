import { BASE_URL } from "../consts";
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

export async function getAllSubCategoriesByCategorySlug(categorySlug) {
  const response = await fetch(
    `${BASE_URL}/subCategories/category/slug/${categorySlug}`
  );
  return await response.json();
}

export async function getAllSubCategoriesByCategoryId(categoryId) {
  const response = await fetch(
    `${BASE_URL}/subCategories/category/${categoryId}`
  );
  return await response.json();
}

export const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = getAllApiServices("product", "products");

export const { getAllPages, getPageById, addPage, updatePage, deletePage } =
  getAllApiServices("page", "pages");
