// ES6 Modules
// --------------------------------------------------
// import { add } from "./calc.js"; // Named Import for Named Exports
// import add from "./calc.js"; // Default Import for Default Export

// CommonJS Modules
// --------------------------------------------------
const { add, subtract } = require("./calc");

const sum = add(4, 5);
const difference = subtract(10, 5);

console.log("sum", sum);
console.log("difference", difference);
