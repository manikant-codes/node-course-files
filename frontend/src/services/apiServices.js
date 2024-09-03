const BASE_URL = "http://localhost:5000";

async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  const data = await response.json();
  return data;
}

export { getAllCategories };
