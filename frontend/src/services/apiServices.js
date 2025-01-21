import { BASE_URL } from "../consts";
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

export async function getAllSubCategoriesByCategorySlug(slug) {
  const response = await fetch(
    `${BASE_URL}/subCategories/category/slug/${slug}`
  );
  const data = await response.json();
  return data;
}

export async function getAllSubCategoriesByCategoryId(id) {
  const response = await fetch(`${BASE_URL}/subCategories/category/${id}`);
  const data = await response.json();
  return data;
}

// End Sub-Categories

// Products

export const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = getAllApiServices("product", "products");

export async function getAllProductsBySubCategorySlug(slug) {
  const response = await fetch(`${BASE_URL}/products/subCategory/${slug}`);
  const data = await response.json();
  return data;
}

export async function getProductBySlug(slug) {
  const response = await fetch(`${BASE_URL}/products/slug/${slug}`);
  const data = await response.json();
  return data;
}

// End Products

// Pages

export const { getAllPages, getPageById, addPage, updatePage, deletePage } =
  getAllApiServices("page", "pages");

export async function getPageBySlug(slug) {
  const response = await fetch(`${BASE_URL}/pages/slug/${slug}`);
  const data = await response.json();
  return data;
}

export const { getAllHomePages, addHomePage, updateHomePage } =
  getAllApiServices("homePage", "homePages");

// End Pages
