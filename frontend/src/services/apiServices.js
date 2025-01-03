export async function addCategory(body) {
  const response = await fetch("http://localhost:5000/categories", {
    method: "POST",
    body
  });
  return await response.json();
}
