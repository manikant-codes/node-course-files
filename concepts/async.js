// --------------------------------------------------
// Callback
// --------------------------------------------------

// function vicky(kaam) {
//   console.log("Vicky");
//   kaam();
// }

// vicky(function () {
//   console.log("Kaam");
// });

// const arr = [1, 2, 3, 4, 5];

// const temp2 = [];
// const temp3 = [];
// const temp4 = [];

// for (let i = 0; i < 3; i++) {
//   temp2.push(arr[i] * 2);
// }
// for (let i = 0; i < 3; i++) {
//   temp3.push(arr[i] * 3);
// }
// for (let i = 0; i < 3; i++) {
//   temp4.push(arr[i] * 4);
// }

// const arr = [1, 2, 3, 4, 5];

// function looper(logic) {
//   const tempArr = [];
//   for (let i = 0; i < 3; i++) {
//     tempArr.push(logic(arr[i], i, arr));
//   }
//   return tempArr;
// }

// const multiplesOf2 = looper(function (value, index, array) {
//   return value * 2;
// });

// const multiplesOf3 = looper(function (value, index, array) {
//   return value * 3;
// });

// const multiplesOf4 = looper(function (value, index, array) {
//   return value * 4;
// });

// console.log(multiplesOf2, multiplesOf3, multiplesOf4);

// --------------------------------------------------
// Async
// --------------------------------------------------

// setTimeout(function () {
//   console.log("Callback!");
// }, 3000);

// --------------------------------------------------
// Promise
// --------------------------------------------------

let myPromise = new Promise(function (myResolve, myReject) {
  // "Producing Code" (May take some time.)
  let randomNumber = undefined;

  setTimeout(function () {
    randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber) {
      myResolve(randomNumber); // When Successful
    } else {
      myReject("Random number not generated!"); // When Error
    }
  }, 3000);
});

myPromise
  .then(function (randomNumber) {
    console.log("randomNumber", randomNumber);
  })
  .catch(function (err) {
    console.log("err", err);
  });
