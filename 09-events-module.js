const events = require("events");
const emitter = new events.EventEmitter();

let orderCount = 0;

emitter.on("pizza-ordered", () => {
  orderCount++;
  console.log("Order Count", orderCount);
});

emitter.emit("pizza-ordered");
emitter.emit("pizza-ordered");
emitter.emit("pizza-ordered");
