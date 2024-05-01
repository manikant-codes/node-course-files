const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const UserSchema = new mongoose.Schema({
  name: { type: String, minLength: 10, maxLength: 100 },
  email: { type: String, required: true, lowercase: true, uppercase: true },
  createdAt: { type: Date, default: () => Date.now(), immutabele: true }, // immutable wont give error just wont change
  updatedAt: Date,
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  //   address: {
  //     street: String,
  //     city: String,
  //   },
  address: AddressSchema,
  age: { type: Number, min: 1, max: 100 },
});

module.exports = mongoose.model("User", UserSchema);
