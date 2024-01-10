const EventEmitter = require("events");
const PizzaShop = require("./pizzaShop");

const pizzaShop = new PizzaShop(0);

// pizzaShop.on("pizza-ordered", (pizzaType, pizzaSize) => {
//   if (pizzaSize === "large") {
//     console.log("Free Coldrink");
//   }
//   console.log("Preparing ", pizzaType, " pizza!");
// });

pizzaShop.listenForOrders("pizza-ordered", (pizzaType, pizzaSize) => {
  if (pizzaSize === "large") {
    console.log("Free Coldrink");
  }
  console.log("Preparing ", pizzaType, " pizza!");
});

pizzaShop.listenForOrders("drink-ordered", (drinkType, drinkSize) => {
  console.log(`Preparing ${drinkSize} ${drinkType} drink!`);
});

pizzaShop.orderPizza("Onion", "large");
pizzaShop.orderDrink("Sprite", "large");

console.log(pizzaShop.numberOfOrders);

// const event = new EventEmitter();

// let numberOfOrders = 0;

// event.on("pizza-ordered", (pizzaType, pizzaSize) => {
//   numberOfOrders++;
//   if (pizzaSize === "large") {
//     console.log("Free Cold-Drink!");
//   }
//   console.log(pizzaType, "Pizza Ordered! ", numberOfOrders);
// });

// event.emit("pizza-ordered", "Mushroom", "large");
// event.emit("pizza-ordered", "Pineapple", "small");
