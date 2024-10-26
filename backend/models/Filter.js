const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
});

const filterSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, required: true },
  slug: { type: String, minLength: 2, unique: true, required: true },
  options: {
    type: [optionSchema],
    validate: {
      validator: (options) => {
        if (Array.isArray(options) && options.length !== 0) {
          return true;
        }
        return false;
      },
      message: "At least one option is required!"
    }
  }
});

const Filter = mongoose.model("Filter", filterSchema);

module.exports = Filter;
