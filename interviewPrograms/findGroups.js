const arr = [
  1,
  true,
  "Str A",
  2,
  { name: "Asd" },
  [1, 2],
  function A() {
    console.log("Function A");
  },
  false,
  { age: 15 },
  [45, "Hello"],
  function B() {
    console.log("Function B");
  },
  "Str C",
  123456n,
];

// 1 Group values of similar datatype in an array.

const types = [];

const final = [];

function getType(value) {
  let str = value.constructor.toString().split(" ")[1];
  str = str.slice(0, str.length - 2);
  return str;
}

for (let i = 0; i < arr.length; i++) {
  const type = getType(arr[i]);
  types.push(type);
}

const typeSet = Array.from(new Set(types));

for (let i = 0; i < typeSet.length; i++) {
  const temp = [];
  for (let j = 0; j < arr.length; j++) {
    const type = getType(arr[j]);
    if (type === typeSet[i]) {
      if (type === "BigInt" || type === "Function") {
        temp.push("");
      } else {
        temp.push(arr[j]);
      }
    }
  }
  final.push(temp);
}

console.log(JSON.stringify(final));
