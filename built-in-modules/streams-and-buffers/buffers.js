const buffer = new Buffer.from("Hello");
// const buffer = Buffer.alloc(10);

buffer.write("Universe");

console.log("buffer", buffer);
console.log("buffer", buffer.toJSON());
console.log("buffer", buffer.toString());
