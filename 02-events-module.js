const EventEmitter = require("events");

const emmitter = new EventEmitter();

let numberOfCakes = 5;
let cash = 1000;

emmitter.on("empty", () => {
  emmitter.emit("cake-restock", 5);
});

emmitter.on("cake-ordered", (number) => {
  if (numberOfCakes > 0) {
    cash += 50;
    numberOfCakes--;
    console.log("Cash: ", cash);
    console.log("Number of Cakes: ", numberOfCakes);
  } else {
    emmitter.emit("empty");
  }
});

emmitter.on("cake-restock", (number) => {
  const total = number * 30;
  if (cash >= total) {
    cash -= total;
    numberOfCakes += number;
    console.log("Cash: ", cash);
    console.log("Number of Cakes: ", numberOfCakes);
  }
});

emmitter.emit("cake-ordered");
emmitter.emit("cake-ordered");
emmitter.emit("cake-ordered");
emmitter.emit("cake-ordered");
emmitter.emit("cake-ordered");
emmitter.emit("cake-ordered");
