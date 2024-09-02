async function getAllTodos() {
  //   fetch("http://localhost:5000/todos")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("data", data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });

  const response = await fetch("http://localhost:5000/todos");
  const data = await response.json();
  return data;
}

async function getSingleTodo(id) {
  try {
    const response = await fetch(`http://localhost:5000/todos/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

async function addTodo(data) {
  const response = await fetch("http://localhost:5000/todos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

async function updateTodo(id, data) {
  const response = await fetch(`http://localhost:5000/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  return result;
}

async function deleteTodo(id) {
  const response = await fetch(`http://localhost:5000/todos/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

export { getAllTodos, getSingleTodo, addTodo, updateTodo, deleteTodo };
