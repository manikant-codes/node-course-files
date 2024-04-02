const obj1 = {
  msg: "Hello",
};

const num = 10;

let obj2 = obj1;
obj2 = {
  msg: "Bye",
};

obj2.msg = "Evening";

console.log("obj1.msg", obj1.msg);
console.log("obj2.msg", obj2.msg);
