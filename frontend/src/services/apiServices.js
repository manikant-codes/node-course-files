const BASE_URL = "http://localhost:5000";

// Categories

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

async function addCategory(body) {
  const response = await fetch("http://localhost:5000/categories", {
    method: "POST",
    body: body,
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = await response.json();
  return data;
}

async function updateCategory(id, body) {
  const response = await fetch(`http://localhost:5000/categories/${id}`, {
    method: "PATCH",
    body: body
  });
  const data = await response.json();
  return data;
}

async function deleteCategory(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  return data;
}

// End Categories

// SubCategories

async function getAllSubCategories() {
  const response = await fetch(`${BASE_URL}/subCategories`);
  const data = await response.json();
  return data;
}

async function getAllSubCategoriesByCategory(id) {
  const response = await fetch(`${BASE_URL}/subCategories/category/${id}`);
  const data = await response.json();
  return data;
}

async function getSubCategory(id) {
  const response = await fetch(`${BASE_URL}/subCategories/${id}`);
  const data = await response.json();
  return data;
}

async function addSubCategory(body) {
  const response = await fetch(`${BASE_URL}/subCategories`, {
    method: "POST",
    body: body
  });
  const data = await response.json();
  return data;
}

async function updateSubCategory(id, body) {
  const response = await fetch(`${BASE_URL}/subCategories/${id}`, {
    method: "PATCH",
    body: body
  });
  const data = await response.json();
  return data;
}

async function deleteSubCategory(id) {
  const response = await fetch(`${BASE_URL}/subCategories/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  return data;
}

// End SubCategories

// Products
async function getAllProducts(filters = {}) {
  let url = `${BASE_URL}/products?`;

  let queryParams = [];

  if (filters.category) {
    queryParams.push(`category=${filters.category}`);
  }

  if (filters.subCategory) {
    queryParams.push(`subCategory=${filters.subCategory}`);
  }

  if (filters.trending) {
    queryParams.push(`trending=${filters.trending}`);
  }

  if (queryParams.length) {
    queryParams = queryParams.join("&");
  }

  url += queryParams;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();
  return data;
}

async function getProductBySlug(slug) {
  const response = await fetch(`${BASE_URL}/products/single/${slug}`);
  const data = await response.json();
  return data;
}

async function addProduct(body) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: body
  });
  const data = await response.json();
  return data;
}

async function updateProduct(id, body) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    body: body
  });
  const data = await response.json();
  return data;
}

async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  return data;
}
// End Products

// Pages

async function getAllPages() {
  const response = await fetch(`${BASE_URL}/pages`);
  const data = await response.json();
  return data;
}

async function getPage(id) {
  const response = await fetch(`${BASE_URL}/pages/${id}`);
  const data = await response.json();
  return data;
}

async function getPageBySlug(slug) {
  const response = await fetch(`${BASE_URL}/pages/single/${slug}`);
  const data = await response.json();
  return data;
}

async function addPage(body) {
  const response = await fetch(`${BASE_URL}/pages`, {
    method: "POST",
    body: body
  });
  const data = await response.json();
  return data;
}

async function updatePage(id, body) {
  const response = await fetch(`${BASE_URL}/pages/${id}`, {
    method: "PATCH",
    body: body
  });
  const data = await response.json();
  return data;
}

async function deletePage(id) {
  const response = await fetch(`${BASE_URL}/pages/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  return data;
}

// End Page

// Users

export async function signUp(body) {
  const response = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    body: body
  });
  const data = await response.json();
  return data;
}

export async function signIn(body) {
  const response = await fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    body: body
  });
  const data = await response.json();
  return data;
}

export async function signOut() {
  const response = await fetch(`${BASE_URL}/users/signout`);
  const data = await response.json();
  return data;
}

export async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data;
}

export async function getUser(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  const data = await response.json();
  return data;
}

export async function updateUser(id, body) {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    body: body
  });
  const data = await response.json();
  return data;
}

export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  return data;
}

// End Users

export {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllSubCategories,
  getAllSubCategoriesByCategory,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllProducts,
  getProduct,
  getProductBySlug,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllPages,
  getPage,
  getPageBySlug,
  addPage,
  updatePage,
  deletePage
};
