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
  bestFriend: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  hobbies: [String],
  //   address: {
  //     street: String,
  //     city: String,
  //   },
  address: AddressSchema,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (value) => {
        return value % 2 === 0;
      },
      message: (props) => {
        return props.value + " is not an even number.";
      },
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
