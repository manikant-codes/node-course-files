const EventEmitter = require("events");

class PizzaShop extends EventEmitter {
  constructor() {
    super();
    this.orderNumber = 0;
  }

  order(size, topping) {
    this.orderNumber += 1;
    this.emit("order", size, topping);
  }

  displayOrderNumber() {
    console.log("Order: ", this.orderNumber);
  }
}

module.exports = PizzaShop;
