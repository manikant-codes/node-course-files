// Categories

export async function getAllCategories() {
  const response = await fetch("http://localhost:5000/categories");
  return await response.json();
}

export async function getCategoryById(id) {
  const response = await fetch(`http://localhost:5000/categories/${id}`);
  return await response.json();
}

export async function addCategory(body) {
  const response = await fetch("http://localhost:5000/categories", {
    method: "POST",
    body
  });
  return await response.json();
}

export async function updateCategory(id, body) {
  const response = await fetch(`http://localhost:5000/categories/${id}`, {
    method: "PATCH",
    body
  });
  return await response.json();
}

export async function deleteCategory(id) {
  const response = await fetch(`http://localhost:5000/categories/${id}`, {
    method: "DELETE"
  });
  return await response.json();
}

// SubCategories

export async function getAllSubCategories() {
  const response = await fetch("http://localhost:5000/subCategories");
  return await response.json();
}

export async function addSubCategory(body) {
  const response = await fetch("http://localhost:5000/subCategories", {
    method: "POST",
    body
  });
  return await response.json();
}

export async function deleteSubCategory(id) {
  const response = await fetch(`http://localhost:5000/subCategories/${id}`, {
    method: "DELETE"
  });
  return await response.json();
}
