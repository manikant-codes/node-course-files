// Categories
async function getAllCategories() {
  const response = await fetch("http://localhost:5000/categories");
  const data = await response.json();
  return data;
}

async function getCategory(id) {
  const response = await fetch(`http://localhost:5000/categories/${id}`);
  const data = await response.json();
  return data;
}

async function addCategory(body) {
  const response = await fetch("http://localhost:5000/categories", {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
}

async function updateCategory(id, body) {
  const response = await fetch(`http://localhost:5000/categories/${id}`, {
    method: "PATCH",
    body: body,
  });
  const data = await response.json();
  return data;
}

async function deleteCategory(id) {
  const response = await fetch(`http://localhost:5000/categories/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

// Sub-Categories
async function getAllSubCategories() {
  const response = await fetch("http://localhost:5000/subCategories");
  const data = await response.json();
  return data;
}

async function getSubCategory(id) {
  const response = await fetch(`http://localhost:5000/subCategories/${id}`);
  const data = await response.json();
  return data;
}

async function addSubCategory(body) {
  const response = await fetch("http://localhost:5000/subCategories", {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
}

async function updateSubCategory(id, body) {
  const response = await fetch(`http://localhost:5000/subCategories/${id}`, {
    method: "PATCH",
    body: body,
  });
  const data = await response.json();
  return data;
}

async function deleteSubCategory(id) {
  const response = await fetch(`http://localhost:5000/subCategories/${id}`, {
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
  getAllSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
