const BASE_URL = "http://localhost:5000";

export function apiServicesGenerator(pluralName, singularName, tokenFields) {
  const capPluralName = pluralName[0].toUpperCase() + pluralName.slice(1);
  const capSingularName = singularName[0].toUpperCase() + singularName.slice(1);

  return {
    [`getAll${capPluralName}`]: async function () {
      const response = await fetch(`${BASE_URL}/${pluralName}`, {
        headers: {
          authorization: tokenFields.getAll
            ? `Bearer ${localStorage.getItem("token")}`
            : ""
        }
      });
      const data = await response.json();
      return data;
    },
    [`get${capSingularName}`]: async function (id) {
      const response = await fetch(`${BASE_URL}/${pluralName}/${id}`, {
        headers: {
          authorization: tokenFields.getSingle
            ? `Bearer ${localStorage.getItem("token")}`
            : ""
        }
      });
      const data = await response.json();
      return data;
    },
    [`add${capSingularName}`]: async function (body) {
      const response = await fetch(`${BASE_URL}/${pluralName}`, {
        method: "POST",
        body: body,
        headers: {
          authorization: tokenFields.add
            ? `Bearer ${localStorage.getItem("token")}`
            : ""
        }
      });
      const data = await response.json();
      return data;
    },
    [`update${capSingularName}`]: async function (id, body) {
      const response = await fetch(`${BASE_URL}/${pluralName}/${id}`, {
        method: "PATCH",
        body: body,
        headers: {
          authorization: tokenFields.update
            ? `Bearer ${localStorage.getItem("token")}`
            : ""
        }
      });
      const data = await response.json();
      return data;
    },
    [`delete${capSingularName}`]: async function (id) {
      const response = await fetch(`${BASE_URL}/${pluralName}/${id}`, {
        method: "DELETE",
        headers: {
          authorization: tokenFields.delete
            ? `Bearer ${localStorage.getItem("token")}`
            : ""
        }
      });
      const data = await response.json();
      return data;
    }
  };
}
