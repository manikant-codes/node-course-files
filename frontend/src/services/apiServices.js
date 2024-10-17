import { generateAPIServices } from "../utils/apiServices";

// Categories
async function getAllCategories() {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`);
  const data = await response.json();
  return data;
}

async function getCategory(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/categories/${id}`
  );
  const data = await response.json();
  return data;
}

async function addCategory(body) {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`, {
    method: "POST",
    body: body
  });
  const data = await response.json();
  return data;
}

async function updateCategory(id, body) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/categories/${id}`,
    {
      method: "PATCH",
      body: body
    }
  );
  const data = await response.json();
  return data;
}

async function deleteCategory(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/categories/${id}`,
    {
      method: "DELETE"
    }
  );
  const data = await response.json();
  return data;
}

// Sub-Categories
async function getAllSubCategories(categoryId) {
  let url = `${process.env.REACT_APP_BASE_URL}/subCategories`;
  if (categoryId) {
    url += `?category=${categoryId}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getSubCategory(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/subCategories/${id}`
  );
  const data = await response.json();
  return data;
}

async function addSubCategory(body) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/subCategories`,
    {
      method: "POST",
      body: body
    }
  );
  const data = await response.json();
  return data;
}

async function updateSubCategory(id, body) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/subCategories/${id}`,
    {
      method: "PATCH",
      body: body
    }
  );
  const data = await response.json();
  return data;
}

async function deleteSubCategory(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/subCategories/${id}`,
    {
      method: "DELETE"
    }
  );
  const data = await response.json();
  return data;
}

// Products
async function getAllProducts() {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`);
  const data = await response.json();
  return data;
}

async function getProduct(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/products/${id}`
  );
  const data = await response.json();
  return data;
}

async function addProduct(body) {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
    method: "POST",
    body: body
  });
  const data = await response.json();
  return data;
}

async function updateProduct(id, body) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/products/${id}`,
    {
      method: "PATCH",
      body: body
    }
  );
  const data = await response.json();
  return data;
}

async function deleteProduct(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/products/${id}`,
    {
      method: "DELETE"
    }
  );
  const data = await response.json();
  return data;
}

// Pages
export const { getAllPages, getPage, addPage, updatePage, deletePage } =
  generateAPIServices("pages", "page");

export async function getPageBySlug(slug) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/pages/slug/${slug}`
  );
  const data = await response.json();
  return data;
}

export {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
