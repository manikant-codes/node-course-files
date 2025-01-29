import { BASE_URL } from "../consts";
import { getAllApiServices } from "../helpers/apiServicesHelper";
import { HiExclamation } from "react-icons/hi";

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

// Auth

export async function register(data) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function login(data) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return await response.json();
}

export async function getUser() {
  const response = await fetch(`${BASE_URL}/auth/getUser`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return await response.json();
}
export async function getAdmin() {
  const response = await fetch(`${BASE_URL}/auth/getAdmin`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return await response.json();
}

export async function createOrder(data) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return await response.json();
}

export async function updateOrderStatus(id, data) {
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return await response.json();
}

export async function getAllOrders(data) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return await response.json();
}
