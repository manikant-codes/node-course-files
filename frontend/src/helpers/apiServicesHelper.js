import { BASE_URL } from "../consts";

export function getAllApiServices(entitySingularName, entityPluralName) {
  async function getAllDocuments() {
    const response = await fetch(`${BASE_URL}/${entityPluralName}`);
    const data = await response.json();
    return data;
  }

  async function getDocumentById(id) {
    const response = await fetch(`${BASE_URL}/${entityPluralName}/${id}`);
    const data = await response.json();
    return data;
  }

  async function addDocument(body) {
    const response = await fetch(`${BASE_URL}/${entityPluralName}`, {
      body,
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    return data;
  }

  async function updateDocument(id, body) {
    const response = await fetch(`${BASE_URL}/${entityPluralName}/${id}`, {
      body,
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    return data;
  }

  async function deleteDocument(id) {
    const response = await fetch(`${BASE_URL}/${entityPluralName}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    return data;
  }

  const capPluralName =
    entityPluralName[0].toUpperCase() + entityPluralName.slice(1);
  const capSingularName =
    entitySingularName[0].toUpperCase() + entitySingularName.slice(1);

  return {
    [`getAll${capPluralName}`]: getAllDocuments,
    [`get${capSingularName}ById`]: getDocumentById,
    [`add${capSingularName}`]: addDocument,
    [`update${capSingularName}`]: updateDocument,
    [`delete${capSingularName}`]: deleteDocument
  };
}
