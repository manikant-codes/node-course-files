const { capitalizeFirstLetter } = require("./stringUtils");

export function generateAPIServices(entityPlural, entitySingular) {
  entityPlural = capitalizeFirstLetter(entityPlural);
  entitySingular = capitalizeFirstLetter(entitySingular);
  return {
    [`getAll${entityPlural}`]: async function () {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${entityPlural.toLowerCase()}`
      );
      const data = await response.json();
      return data;
    },
    [`get${entitySingular}`]: async function (id) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${entityPlural.toLowerCase()}/${id}`
      );
      const data = await response.json();
      return data;
    },
    [`add${entitySingular}`]: async function (body) {
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
    [`update${entitySingular}`]: async function (id, body) {
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
    [`delete${entitySingular}`]: async function (id) {
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
