const fs = require("fs");
const path = require("path");

// const students = [
//   {
//     roll: 1,
//     name: "Student 1",
//     city: "City 1",
//     address: "Address 1",
//     phone: "1234567890",
//     marksMath: 85,
//     marksPhysics: 90,
//     marksChemistry: 88,
//   },
//   {
//     roll: 2,
//     name: "Student 2",
//     city: "City 2",
//     address: "Address 2",
//     phone: "0987654321",
//     marksMath: 78,
//     marksPhysics: 82,
//     marksChemistry: 75,
//   },
//   {
//     roll: 3,
//     name: "Student 3",
//     city: "City 3",
//     address: "Address 3",
//     phone: "3333333333",
//     marksMath: 92,
//     marksPhysics: 95,
//     marksChemistry: 90,
//   },
//   {
//     roll: 4,
//     name: "Student 4",
//     city: "City 4",
//     address: "Address 4",
//     phone: "4444444444",
//     marksMath: 80,
//     marksPhysics: 88,
//     marksChemistry: 85,
//   },
//   {
//     roll: 5,
//     name: "Student 5",
//     city: "City 5",
//     address: "Address 5",
//     phone: "5555555555",
//     marksMath: 75,
//     marksPhysics: 78,
//     marksChemistry: 72,
//   },
//   {
//     roll: 6,
//     name: "Student 6",
//     city: "City 6",
//     address: "Address 6",
//     phone: "6666666666",
//     marksMath: 90,
//     marksPhysics: 92,
//     marksChemistry: 89,
//   },
//   {
//     roll: 7,
//     name: "Student 7",
//     city: "City 7",
//     address: "Address 7",
//     phone: "7777777777",
//     marksMath: 82,
//     marksPhysics: 85,
//     marksChemistry: 80,
//   },
//   {
//     roll: 8,
//     name: "Student 8",
//     city: "City 8",
//     address: "Address 8",
//     phone: "8888888888",
//     marksMath: 78,
//     marksPhysics: 80,
//     marksChemistry: 75,
//   },
//   {
//     roll: 9,
//     name: "Student 9",
//     city: "City 9",
//     address: "Address 9",
//     phone: "9999999999",
//     marksMath: 95,
//     marksPhysics: 98,
//     marksChemistry: 92,
//   },
//   {
//     roll: 10,
//     name: "Student 10",
//     city: "City 10",
//     address: "Address 10",
//     phone: "1010101010",
//     marksMath: 88,
//     marksPhysics: 90,
//     marksChemistry: 85,
//   },
// ];

// const filePath = path.join(__dirname, "folderOne", "folderTwo", "info.txt");

// const filePathNew = path.join(
//   __dirname,
//   "folderOne",
//   "folderTwo",
//   "changed-file-name.txt"
// );

// console.log("Log 1");

// fs.writeFileSync(filePath, "Hello world 1!");

// fs.writeFile(filePath, "manikant,10,45,56,89", (err) => {
//   console.log("myerr", err);
//   console.log("Write complete!");
// });

// const data = fs.readFileSync(filePath);
// console.log("data", data.toString());

// fs.readFile(filePath, "utf8", (err, data) => {
//   if (err) {
//     return console.log("Error: ", err);
//   }
//   console.log("data", data);
// });

// console.log("Log 2");

// fs.unlink(filePath, (err) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("File deleted successfully!");
// });

// fs.rename(filePath, filePathNew, (err) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("File renamed successfully!");
// });

// const filePath = path.join(__dirname, "folderOne", "folderTwo", "info.csv");

// let txt = "";
// txt += Object.keys(students[0]).toString() + "\n";
// for (let i = 0; i < students.length; i++) {
//   txt += Object.values(students[i]).toString() + "\n";
// }

// fs.writeFile(filePath, txt, (err) => {
//   if (err) {
//     return console.log("Error: ", err);
//   }
//   console.log("Task completed!");
// });
