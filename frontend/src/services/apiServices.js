// Categories

import { BASE_URL } from "../consts";

async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  return await response.json();
}

async function getCategoryById(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`);
  return await response.json();
}

async function addCategory(body) {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    body: body
  });
  return await response.json();
}

async function updateCategory(id, body) {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PATCH",
    body
  });
  return response.json();
}

async function deleteCategory(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE"
  });
  return response.json();
}

// End Categories

// Sub-Categories

async function getAllSubCategories() {
  const response = await fetch(`${BASE_URL}/subCategories`);
  return await response.json();
}

async function addSubCategory(body) {
  const response = await fetch(`${BASE_URL}/subCategories`, {
    method: "POST",
    body: body
  });
  return await response.json();
}

async function deleteSubCategory(id) {
  const response = await fetch(`${BASE_URL}/subCategories/${id}`, {
    method: "DELETE"
  });
  return response.json();
}

// End Sub-Categories

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllSubCategories,
  addSubCategory,
  deleteSubCategory
};
