import { apiServicesGenerator } from "../helpers/apiServicesHelper";

const BASE_URL = "http://localhost:5000";

// Categories

export const {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
} = apiServicesGenerator("categories", "category", {
  getAll: false,
  getSingle: false,
  add: true,
  update: true,
  delete: true
});

// End Categories

// SubCategories

export const {
  getAllSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
} = apiServicesGenerator("subCategories", "subCategory", {
  getAll: false,
  getSingle: false,
  add: true,
  update: true,
  delete: true
});

export async function getAllSubCategoriesByCategory(id) {
  const response = await fetch(`${BASE_URL}/subCategories/category/${id}`);
  const data = await response.json();
  return data;
}

// End SubCategories

// Products
export async function getAllProducts(filters = {}) {
  let url = `${BASE_URL}/products?`;

  let queryParams = [];

  if (filters.category) {
    queryParams.push(`category=${filters.category}`);
  }

  if (filters.subCategory) {
    queryParams.push(`subCategory=${filters.subCategory}`);
  }

  if (filters.trending) {
    queryParams.push(`trending=${filters.trending}`);
  }

  if (queryParams.length) {
    queryParams = queryParams.join("&");
  }

  url += queryParams;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductBySlug(slug) {
  const response = await fetch(`${BASE_URL}/products/single/${slug}`);
  const data = await response.json();
  return data;
}

export const { getProduct, addProduct, updateProduct, deleteProduct } =
  apiServicesGenerator("products", "product", {
    getSingle: false,
    add: true,
    update: true,
    delete: true
  });

// End Products

// Pages

export const { getAllPages, getPage, addPage, updatePage, deletePage } =
  apiServicesGenerator("pages", "page", {
    getAll: false,
    getSingle: false,
    add: true,
    update: true,
    delete: true
  });

export async function getPageBySlug(slug) {
  const response = await fetch(`${BASE_URL}/pages/single/${slug}`);
  const data = await response.json();
  return data;
}

// End Page

// Users

export async function checkUser() {
  const response = await fetch(`${BASE_URL}/users/checkUser`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = await response.json();
  return data;
}

export async function signUp(body) {
  const response = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    body: body
  });
  const data = await response.json();
  return data;
}

export async function signIn(body) {
  const response = await fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    body: body
  });
  const data = await response.json();
  return data;
}

export async function signOut() {
  const response = await fetch(`${BASE_URL}/users/signout`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = await response.json();
  return data;
}

export const { getAllUsers, getUser, addUser, updateUser, deleteUser } =
  apiServicesGenerator("users", "user", {
    getAll: true,
    getSingle: true,
    update: true,
    delete: true
  });

// End Users
