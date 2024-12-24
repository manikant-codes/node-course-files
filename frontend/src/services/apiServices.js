// Categories

import { BASE_URL } from "../consts";

async function getAllCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

function getCategoryById() {}

async function addCategory(body) {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      body: body
    });
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

function updateCategory() {}

function deleteCategory() {}

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
};

// End Categories
