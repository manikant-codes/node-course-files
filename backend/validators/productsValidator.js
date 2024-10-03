const minLengthOneValidator = (value) => {
  if (!value) {
    return false;
  }

  if (value && !Array.isArray(value)) {
    return false;
  }

  if (value && Array.isArray(value) && !value.length) {
    return false;
  }

  return true;
};

module.exports = { minLengthOneValidator };
