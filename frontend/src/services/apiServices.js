const BASE_URL = "http://localhost:5000";

async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  const data = await response.json();
  return data;
}

async function getCategory(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`);
  const data = await response.json();
  return data;
}

async function addCategory() {}

async function updateCategory() {}

async function deleteCategory(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

export {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
