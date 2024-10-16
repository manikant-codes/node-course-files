// --------------------------------------------------
// ES6 Modules
// --------------------------------------------------

// Named Export - Way 1
// --------------------------------------------------

// export function add(a, b) {
//   return a + b;
// }

// export function subtract(a, b) {
//   return a - b;
// }

// export function multiply(a, b) {
//   return a * b;
// }

// export function division(a, b) {
//   return a / b;
// }

// Named Export - Way 2
// --------------------------------------------------

// function add(a, b) {
//   return a + b;
// }

// function subtract(a, b) {
//   return a - b;
// }

// function multiply(a, b) {
//   return a * b;
// }

// function divide(a, b) {
//   return a / b;
// }

// export { add, subtract, multiply, divide };

// Default Export - Way 1
// --------------------------------------------------

// export default function exponentiate(a, b) {
//   return a ** b;
// }

// Default Export - Way 1
// --------------------------------------------------

// function exponentiate(a, b) {
//   return a ** b;
// }

// export default exponentiate;

// --------------------------------------------------
// CommonJS Modules
// --------------------------------------------------

// const module = {
//   exports: add
// };

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// module.exports = add;
module.exports = { add, subtract, multiply, divide };
