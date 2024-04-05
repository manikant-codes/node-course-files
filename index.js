const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.emit("order-pizza", "large", "corn");

emitter.on("order-pizza", (size, topping) => {
  console.log(`Making a ${size} pizza with ${topping} toppings!`);
  if (size === "large" || size === "extra-large") {
    console.log("Free pepsi!");
  }
});

emitter.emit("order-pizza", "small", "capsicum");
