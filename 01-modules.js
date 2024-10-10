// --------------------------------------------------
// ES6 Modules
// --------------------------------------------------

// --------------------------------------------------
// Exporting
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

// --------------------------------------------------
// CommonJS Modules
// --------------------------------------------------

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a + b;
}

// Way 1 (Single Value)
// --------------------------------------------------

module.exports = add;

// Way 2 (Multiple Values)
// --------------------------------------------------

module.exports = { add, subtract };

// --------------------------------------------------
// Importing
// --------------------------------------------------

// ES6 Modules
// --------------------------------------------------
// import { add } from "./calc.js"; // Named Import for Named Exports
// import add from "./calc.js"; // Default Import for Default Export

// CommonJS Modules
// --------------------------------------------------
const { add, subtract } = require("./01-modules");

const sum = add(4, 5);
const difference = subtract(10, 5);

console.log("sum", sum);
console.log("difference", difference);
