const EventEmitter = require("events");
// const PizzaShop = require("./pizzaShop");

// const pizzaShop = new PizzaShop(0);

// pizzaShop.on("pizza-ordered", (pizzaType, pizzaSize) => {
//   if (pizzaSize === "large") {
//     console.log("Free Coldrink");
//   }
//   console.log("Preparing ", pizzaType, " pizza!");
// });

// pizzaShop.listenForOrders("pizza-ordered", (pizzaType, pizzaSize) => {
//   if (pizzaSize === "large") {
//     console.log("Free Coldrink");
//   }
//   console.log("Preparing ", pizzaType, " pizza!");
// });

// pizzaShop.listenForOrders("drink-ordered", (drinkType, drinkSize) => {
//   console.log(`Preparing ${drinkSize} ${drinkType} drink!`);
// });

// pizzaShop.orderPizza("Onion", "large");
// pizzaShop.orderDrink("Sprite", "large");

// console.log(pizzaShop.numberOfOrders);

const event = new EventEmitter();

const listenerA = () => {
  console.log("Listener A");
};

const listenerB = () => {
  console.log("Listener B");
};

const listenerC = () => {
  console.log("Listener C");
};

event.addListener("my-event", listenerB);
event.on("my-event", listenerA);

event.emit("my-event");
event.emit("my-event");

// event.removeAllListeners("my-event");

// event.removeListener("my-event", listenerA);
// event.removeListener("my-event", listenerB);
// event.removeListener("my-event", listenerC);

console.log(event.listeners("my-event"));
console.log(event.eventNames());
console.log(event.listenerCount("my-event"));
