const checkIfEmptyArray = (field) => {
  if (!field) {
    return false;
  }

  if (field && !Array.isArray(field)) {
    return false;
  }

  if (field && Array.isArray(field) && !field.length) {
    return false;
  }

  return true;
};

module.exports = { checkIfEmptyArray };
