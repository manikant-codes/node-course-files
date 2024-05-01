// 1. mongosh - to start the mongo shell
// w. show dbs - to see the list of databases
// 3. use <db-name> - to switch to a database or create a new one
// 4. show collections - to see the list of collections in a database
// (collections are tables equivalent of a sql database)
// 5. db.dropDatabase() - to drop the current database
// 6. cls - to clear terminal()
// 7. exit - to exit from mongo shell
// 8. db - gives you the current database that you are in
// // Inserting
// 9. db.<collection>.insertOne(<document>) - to insert a document in collection
// (documents are records equivalent of a sql database)
// E.g.: db.users.insertOne({name : "Manikant"})
// E.g.: db.users.insertOne({name : "Rituraj", address: {city: "Surat"})
// 10. db.<collection>.find() - to get all documents from a collection
// E.g.: db.users.find()
// 11. db.<collection>.insertMany(<[documents]>) - to insert multiple documents in a collection
// E.g.: db.users.insertMany([{name: "John"}, {name: "Jenny"}, {name: "Jacob"}])
// // Querying
// 12. db.<collection>.find().limit(2) - to get only two documents from a collection
// 12. db.<collection>.find().sort({name: 1/-1}).limit(2) - to get only two documents from a collection and sort them by name in ascending or descending order.
// 13. db.<collection>.find().sort({name: 1/-1, age: 1/-1}).limit(2) - to get only two documents from a collection and sort them by name in ascending or descending order and if two people have same names then sort them by age in ascending or descending order.
// 14. db.<collection>.find().skip(2) - to get documents from a collection by skipping first two documents.
// 15. db.<collection>.find({name: "Manikant"}) - to get a document from the collection where name is "Manikant".
// 16. db.<collection>.find({name: "Manikant"}, {name: 1, _id: 0}) - to get a document from the collection where name is "Manikant" and in that document get only name field omit the id field.
// 17. db.<collection>.find({name: "Manikant"}, {_id: 0}) - to get all the fields except _id.
// 18. db.<collection>.find({name: {$ne: "Manikant" }}) - to get all the documents where name is not equal to "Manikant".
// 19. db.<collection>.find({age: {$gt: 13 }}) - to get all the documents where age is greater than 13.
// ($eq, $ne, $gt, $gte, $lt, $lte, $in)
// 20. db.<collection>.find({name: {$in: ["John", "Jane"] }})
// 20. db.<collection>.find({name: {$nin: ["John", "Jane"] }})

// 21. db.<collection>.find({age: {$exists: false }})
// 22. db.users.find({age: {$get: 20, $lte: 40}, name: "Manikant"})
// 23. db.users.find({$and: [{age: 10}, {name: "John"}]})
// 24. db.users.find({$or: [{age: {$lte: 20}, {city: "surat"}]})
// 25. db.users.find({age: {$not: {$lte: 10}}});
// 26. db.users.updateOne({age: 10}, {$set:{age: 11}})
// 27. db.users.updateOne({age: 10}, {$inc:{age: 1}})
// 28. db.users.updateOne({age: 10}, {$rename:{age: "yearsOld"}})
// 29. db.users.updateOne({age: 10}, {$unset:{age: ""}})
// (Removes a fieldfrom the document.)
// 30. db.users.updateOne({age: 10}, {$push:{hobbies: "Running"}})
// (Push an item to an array.)
// 31. db.users.updateOne({age: 10}, {$pull:{hobbies: "Running"}})
// (Remove an item from an array.)
// 32. db.users.updateMany({age: 10}, {$set: {age: 11}})
// 33. db.users.replaceOne({age: 10}, {age: 11})
// 34. db.users.deleteOne({age: 10})
// 35. db.users.deleteMay({age: {$exists: false}})

// Model:

// Mongoose mein model ek aisa concept hai jo aapko MongoDB ke saath interact karne ke liye madad karta hai. Iska matlab hai ki aap model ka use karke documents ko create, read, update, aur delete kar sakte hain. Model ek class hota hai jo aapke data ko represent karta hai. Har model ke instances ko document kehte hain.

// Model ka use karke aap:

// Documents ko create kar sakte hain.
// Database se documents ko retrieve kar sakte hain.
// Documents ko update kar sakte hain.
// Documents ko delete kar sakte hain.

// Jaise ki aap ek car model ke blueprint se actual cars create karte hain, waise hi Mongoose model se MongoDB mein documents create hote hain. Model aapke data ko query karne, update karne, aur remove karne mein madad karta hai. 🚗
