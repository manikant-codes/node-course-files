const EventEmitter = require("events");

class PizzaShop extends EventEmitter {
  constructor(numberOfOrders) {
    super();
    this.numberOfOrders = numberOfOrders;
  }

  orderPizza(pizzaType, pizzaSize) {
    this.numberOfOrders++;
    this.emit("pizza-ordered", pizzaType, pizzaSize);
  }

  orderDrink(drinkType, drinkSize) {
    this.numberOfOrders++;
    this.emit("drink-ordered", drinkType, drinkSize);
  }

  listenForOrders(order, callback) {
    if (order === "pizza-ordered") {
      return this.on("pizza-ordered", callback);
    }
    if (order === "drink-ordered") {
      return this.on("drink-ordered", callback);
    }
  }
}

module.exports = PizzaShop;
