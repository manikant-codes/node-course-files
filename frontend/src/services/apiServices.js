// Categories

import { BASE_URL } from "../consts";

async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  return await response.json();
}

function getCategoryById() {}

async function addCategory(body) {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    body: body
  });
  return await response.json();
}

function updateCategory() {}

async function deleteCategory(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE"
  });
  return response.json();
}

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
};

// End Categories
