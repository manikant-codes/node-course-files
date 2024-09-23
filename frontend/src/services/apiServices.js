async function getAllCategories() {
  const response = await fetch("http://localhost:5000/categories");
  const data = await response.json();
  return data;
}

async function getCategory() {}

async function addCategory(body) {
  const response = await fetch("http://localhost:5000/categories", {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
}

async function updateCategory() {}

async function deleteCategory(id) {
  const response = await fetch(`http://localhost:5000/categories/${id}`, {
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
