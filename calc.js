// ES6 Modules
// --------------------------------------------------

// Named Export
// --------------------------------------------------

// Way 1
// --------------------------------------------------
// export function add(a, b) {
//   return a + b;
// }

// export function subtract(a, b) {
//   return a - b;
// }

// Way 2
// --------------------------------------------------
// function add(a, b) {
//   return a + b;
// }

// function subtract(a, b) {
//   return a - b;
// }

// export { add, subtract };

// Default Export
// --------------------------------------------------

// Way 1
// --------------------------------------------------
// export default function add(a, b) {
//   return a + b;
// }

// Way 2
// --------------------------------------------------
// function add(a, b) {
//   return a + b;
// }

// export default add;

// CommonJS Modules
// --------------------------------------------------

// const module = {
//   exports: { add, subtract }
// };

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a + b;
}

module.exports = add;
module.exports = subtract;

module.exports = { add, subtract };
