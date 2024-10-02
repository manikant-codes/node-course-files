// Categories
async function getAllCategories() {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`);
  const data = await response.json();
  return data;
}

async function getCategory(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/categories/${id}`
  );
  const data = await response.json();
  return data;
}

async function addCategory(body) {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`, {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
}

async function updateCategory(id, body) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/categories/${id}`,
    {
      method: "PATCH",
      body: body,
    }
  );
  const data = await response.json();
  return data;
}

async function deleteCategory(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/categories/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
}

// Sub-Categories
async function getAllSubCategories() {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/subCategories`
  );
  const data = await response.json();
  return data;
}

async function getSubCategory(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/subCategories/${id}`
  );
  const data = await response.json();
  return data;
}

async function addSubCategory(body) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/subCategories`,
    {
      method: "POST",
      body: body,
    }
  );
  const data = await response.json();
  return data;
}

async function updateSubCategory(id, body) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/subCategories/${id}`,
    {
      method: "PATCH",
      body: body,
    }
  );
  const data = await response.json();
  return data;
}

async function deleteSubCategory(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/subCategories/${id}`,
    {
      method: "DELETE",
    }
  );
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
