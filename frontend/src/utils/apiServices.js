const { capitalizeFirstLetter } = require("./stringUtils");

export function generateAPIServices(entityPlural) {
  entityPlural = capitalizeFirstLetter(entityPlural);
  return {
    [`getAll${entityPlural}`]: async function () {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${entityPlural.toLowerCase()}`
      );
      const data = await response.json();
      return data;
    },
    [`get${entityPlural}`]: async function (id) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${entityPlural.toLowerCase()}/${id}`
      );
      const data = await response.json();
      return data;
    },
    [`add${entityPlural}`]: async function (body) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${entityPlural.toLowerCase()}`,
        {
          method: "POST",
          body: body
        }
      );
      const data = await response.json();
      return data;
    },
    [`update${entityPlural}`]: async function (id, body) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${entityPlural.toLowerCase()}/${id}`,
        {
          method: "PATCH",
          body: body
        }
      );
      const data = await response.json();
      return data;
    },
    [`delete${entityPlural}`]: async function (id) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${entityPlural.toLowerCase()}/${id}`,
        {
          method: "DELETE"
        }
      );
      const data = await response.json();
      return data;
    }
  };
}
