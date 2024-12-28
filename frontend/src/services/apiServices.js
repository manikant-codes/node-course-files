import { BASE_URL } from "../consts";

// Categories

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

// End Categories

// Sub-Categories

async function getAllSubCategories() {
  const response = await fetch(`${BASE_URL}/subCategories`);
  const data = await response.json();
  return data;
}

async function getSubCategoryById(id) {
  try {
    const response = await fetch(`${BASE_URL}/subCategories/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

async function addSubCategory(body) {
  try {
    const response = await fetch(`${BASE_URL}/subCategories`, {
      body,
      method: "POST"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

async function updateSubCategory(id, body) {
  try {
    const response = await fetch(`${BASE_URL}/subCategories/${id}`, {
      body,
      method: "PATCH"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

async function deleteSubCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/subCategories/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

// End Sub-Categories

// Products

async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
}

async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

async function addProduct(body) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      body,
      method: "POST"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

async function updateProduct(id, body) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      body,
      method: "PATCH"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

// End Products

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
