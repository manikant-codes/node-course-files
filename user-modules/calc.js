require("./fruitA");

const add = function (n1, n2) {
  return n1 + n2;
};

const subtract = function (n1, n2) {
  return n1 - n2;
};

const multiply = function (n1, n2) {
  return n1 * n2;
};

const divide = function (n1, n2) {
  return n1 / n2;
};

const impValue = 10;

// module.exports.add = function (n1, n2) {
//   return n1 + n2;
// };

// module.exports.subtract = function (n1, n2) {
//   return n1 - n2;
// };

// module.exports.multiply = function (n1, n2) {
//   return n1 * n2;
// };

// module.exports.divide = function (n1, n2) {
//   return n1 / n2;
// };

// exports.add = function (n1, n2) {
//   return n1 + n2;
// };

// exports.subtract = function (n1, n2) {
//   return n1 - n2;
// };

// exports.multiply = function (n1, n2) {
//   return n1 * n2;
// };

// exports.divide = function (n1, n2) {
//   return n1 / n2;
// };

// exports = { add, subtract, multiply, divide };
// module.exports = impValue;

// export { add, multiply, subtract, divide };

module.exports = { add, subtract, multiply, divide };
