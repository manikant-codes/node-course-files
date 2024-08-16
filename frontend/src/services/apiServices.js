export async function getAllUsers() {
  try {
    const response = await fetch("http://localhost:5000/users");
    const data = response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}
