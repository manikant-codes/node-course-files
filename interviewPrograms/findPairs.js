const arr = [1, 2, 3, 1, 45, 65, 7, 65, 7, 1, 56, 1, 3];

const objPairCount = {};

for (let i = 0; i < arr.length; i++) {
  let matDhundho = false;
  for (let k = 0; k < i; k++) {
    if (arr[k] === arr[i]) {
      matDhundho = true;
    }
  }
  if (!matDhundho) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        if (objPairCount[arr[i]] && objPairCount[arr[i]].count) {
          objPairCount[arr[i]].count++;
        } else {
          objPairCount[arr[i]] = { count: 1, pair: 0 };
        }
        objPairCount[arr[i]].pair = Math.floor(objPairCount[arr[i]].count / 2);
      }
    }
  }
}

console.log(objPairCount);
