// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// emitter.on("pizza-ordered", (size, topping) => {
//   console.log(`Baking a ${size} size pizza with ${topping} toppings.`);
// });

// emitter.on("pizza-ordered", (size, topping) => {
//   if (size === "large") {
//     console.log("Free pepsi.");
//   }
//   console.log(`Baking a ${size} size pizza with ${topping} toppings.`);
// });

// emitter.emit("pizza-ordered");

const PizzaShop = require("./pizza-shop");

const pizzaShop = new PizzaShop();

pizzaShop.on("order", (size, topping) => {
  console.log(`Baking a ${size} size pizza with ${topping} toppings.`);
});

pizzaShop.order("large", "pineapple");
pizzaShop.displayOrderNumber();
