// ES6 Named Import
// --------------------------------------------------
// import { add } from "./calc.js";

// ES6 Default Import
// --------------------------------------------------
// import exponentiate from "./calc.js";

// CommonJS Import
// --------------------------------------------------
const { add, subtract, multiply, divide } = require("./calc");

console.log("sum", add(2, 3));
console.log("difference", subtract(2, 3));
console.log("product", multiply(2, 3));
console.log("quotient", divide(2, 3));
