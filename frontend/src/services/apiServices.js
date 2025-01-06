export async function getAllCategories() {
  const response = await fetch("http://localhost:5000/categories");
  return await response.json();
}

export async function addCategory(body) {
  const response = await fetch("http://localhost:5000/categories", {
    method: "POST",
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
