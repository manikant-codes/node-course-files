const tableOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tableTwo = [];
const tableThree = [];

// for (const value of tableOne) {
//   if (value % 2 !== 0) {
//     tableTwo.push(value * 2);
//   }
// }

// for (const value of tableOne) {
//   if (value % 2 !== 0) {
//     tableThree.push(value * 3);
//   }
// }

function loop(logic) {
  for (const value of tableOne) {
    if (value % 2 === 0) {
      logic(value);
    }
  }
}

loop((value) => {
  tableTwo.push(value * 2);
});
loop((value) => {
  tableThree.push(value * 3);
});

console.log("tableTwo", tableTwo);
console.log("tableThree", tableThree);
