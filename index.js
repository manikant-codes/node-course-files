const { add, subtract, multiply, divide } = require("./calc");

const sum = add(2, 3);
const difference = subtract(2, 3);
const product = multiply(2, 3);
const quotient = divide(2, 3);

console.log("sum", sum);
console.log("difference", difference);
console.log("product", product);
console.log("quotient", quotient);

console.log("Hello World!");
