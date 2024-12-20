const mongoose = require("mongoose");

// model ek object hota hai jisme database ke collection ke saath kam karne ke liye functions hote hai. In functions ka use karke ham db ke us collection me insert, update, delete, etc karwa sakte hai.

// schema yane rules and regulation jise db me document insert karte waqt follow kiya jaeega.

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 100,
    unique: true,
    requried: true
  },
  desc: { type: String, minLength: 10, maxLength: 1000 },
  price: { type: Number, min: 0, required: true },
  tax: { type: Number, min: 0, max: 100, default: 0 }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
