let fruit = require("./user-modules/fruit");

const fruit1 = new fruit("Apple");
console.log(fruit1.getName());
fruit1.setName("Mango");
console.log(fruit1.getName());

const fruit2 = new fruit("Cherry");
console.log(fruit2.getName());
