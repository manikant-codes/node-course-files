export async function getAllUsers() {
  try {
    const response = await fetch("http://localhost:5000/users");
    const data = response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export function getSingleUser(id) {
  return fetch(`http://localhost:5000/users/${id}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error.message);
    });
}
export function addUser(body) {
  return fetch("http://localhost:5000/users", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
}
export function updateUser(id, body) {
  return fetch(`http://localhost:5000/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
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
