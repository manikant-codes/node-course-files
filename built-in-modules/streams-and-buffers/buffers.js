const buffer = new Buffer.from("Hello");

buffer.write("How are you?");

console.log(buffer);
console.log(buffer.toJSON());
console.log(buffer.toString());
