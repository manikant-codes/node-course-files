class CakeShop extends EventEmitter {
  constructor(numberOfCakes, cash) {
    super();
    this.numberOfCakes = numberOfCakes;
    this.cash = cash;
  }

  order() {
    if (this.numberOfCakes > 0) {
      this.numberOfCakes--;
      this.cash += 50;
      this.emit("order", this.numberOfCakes, this.cash);
    }
  }

  restock(number) {
    const total = number * 30;
    if (this.cash > total) {
      this.numberOfCakes += number;
      this.cash -= total;
      this.emit("restock", this.numberOfCakes, this.cash);
    }
  }
}

const cakeShop = new CakeShop(5, 1000);

cakeShop.on("order", (numberOfCakes, cash) => {
  console.log("Number of Cakes: ", numberOfCakes);
  console.log("Cash: ", cash);
});

cakeShop.on("restock", (numberOfCakes, cash) => {
  console.log("Number of Cakes: ", numberOfCakes);
  console.log("Cash: ", cash);
});

cakeShop.order();
cakeShop.order();
cakeShop.order();
cakeShop.order();
cakeShop.order();
cakeShop.restock(5);
