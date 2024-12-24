import { BASE_URL } from "../consts";

async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  const data = await response.json();
  return data;
}

async function getCategoryById(id) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

async function addCategory(body) {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      body,
      method: "POST"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

async function updateCategory(id, body) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      body,
      method: "PATCH"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

async function deleteCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
};
